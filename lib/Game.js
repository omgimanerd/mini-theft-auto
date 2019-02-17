/**
 * Game class on the server to manage the state of existing players and
 * and entities.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Hashmap = require('hashmap')

const Player = require('./Player')

class Game {
  constructor() {
    this.clients = new Hashmap()
    this.players = new Hashmap()
    this.scrap = []
  }

  get socketIds() {
    return this.clients.keys()
  }

  addNewPlayer(socket, name) {
    this.clients.set(socket.id, { socket })
    this.players.set(socket.id, new Player(socket.id, name))
  }

  getPlayerNameBySocketId(socketId) {
    const player = this.players.get(socketId)
    return player ? player.name : null
  }

  removePlayer(socketId) {
    if (this.clients.has(socketId)) {
      this.clients.remove(socketId)
    }
    if (this.players.has(socketId)) {
      this.players.remove(socketId)
    }
  }

  updatePlayerOnInput(socketId, input) {
    const player = this.players.get(socketId)
    if (player) {
      player.updateOnInput(input)
    }
  }

  createScrap() {

  }

  update() {
    for (const player of this.players.values()) {
      player.update()
      for (const otherPlayer of this.players.values()) {
        if (player.socketId !== otherPlayer.socketId &&
            player.isCollidedWith(otherPlayer)) {
          player.onPlayerCollision(otherPlayer, this.createScrap)
        }
      }
      for (const scrap of this.scrap) {
        if (player.isCollidedWith(scrap) && scrap.collectable) {
          player.score++
          scrap.collected = true
        }
      }
    }
    this.scrap = this.scrap.filter(scrap => {
      scrap.update()
      return !scrap.collected
    })
  }

  sendState() {
    for (const socketId of this.socketIds) {
      const currentPlayer = this.players.get(socketId)
      const currentClient = this.clients.get(socketId)
      currentClient.socket.emit('update', {
        self: currentPlayer,
        players: this.players.values().filter(player => {
          return player.socketId !== currentPlayer.socketId
        }),
        scrap: this.scrap
      })
    }
  }
}

module.exports = Game
