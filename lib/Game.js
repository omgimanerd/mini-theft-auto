/**
 * Game class on the server to manage the state of existing players and
 * and entities.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Hashmap = require('hashmap')

class Game {
  constructor() {
    this.clients = new Hashmap()
    this.players = new Hashmap()
  }

  get socketIds() {
    return this.clients.keys()
  }

  addNewPlayer(name, socket) {
    this.clients.set(socket.id, {
      socket
    })
    // TODO
    this.players.set(socket.id, null)
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

  updatePlayer(socketId, keyboardState) {
    // TODO
  }

  update() {
    for (const player of this.players.values()) {
      player.update()
    }
  }

  sendState() {
    for (const id of this.socketIds) {
      const currentClient = this.clients.get(id)
      const currentPlayer = this.players.get(id)
      currentClient.socket.emit('update', {
        self: currentPlayer,
        players: this.players.values().filter(player => {
          return player.id !== currentPlayer.id
        })
      })
    }
  }
}

module.exports = Game
