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
  }

  get socketIds() {
    return this.clients.keys()
  }

  addNewPlayer(socket, name) {
    this.clients.set(socket.id, {
      socket
    })
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

  update() {
    for (const player of this.players.values()) {
      player.update()
    }
  }

  sendState() {
    for (const socketId of this.socketIds) {
      const currentPlayer = this.players.get(socketId)
      const currentClient = this.clients.get(socketId)
      currentClient.socket.emit('update', {
        self: currentPlayer,
        players: this.players.values().filter(player => {
          return player.socketId !== currentPlayer.socketId
        })
      })
    }
  }
}

module.exports = Game
