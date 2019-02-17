/**
 * Stores the state of the player on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Entity = require('./Entity')

class Player extends Entity {
  constructor(socketId, name) {
    super()
    this.socketId = socketId
    this.name = name
  }

  updateOnInput(input) {
    if (input.LEFT) {
      this.vx = -1
    } else if (input.UP) {
      this.vy = 1
    } else if (input.RIGHT) {
      this.vx = 1
    } else if (input.DOWN) {
      this.vy = -1
    }
  }

  update() {
    super.update()
  }
}

module.exports = Player
