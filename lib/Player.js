/**
 * Stores the state of the player on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Entity = require('./Entity')

class Player extends Entity() {
  constructor(socketId, name) {
    super()
    this.socketId = socketId
    this.name = name
  }

  static generateNewPlayer(socketId, name) {
    return new Player(socketId, name)
  }

  updateOnInput(keyboardState) {

  }

  update() {
    super.update()
  }
}

module.exports = Player
