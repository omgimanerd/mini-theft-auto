/**
 * Stores the state of the player on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Entity = require('./Entity')
const Util = require('./Util')

class Player extends Entity {
  constructor(socketId, name) {
    super()
    this.socketId = socketId
    this.name = name

    this.wheelOrientation = 0
  }

  updateOnInput(input) {
    if (input.LEFT) {
      this.wheelOrientation = -Math.PI / 5
    } else if (input.RIGHT) {
      this.wheelOrientation = Math.PI / 5
    } else {
      this.wheelOrientation = 0
    }

    let dOut = 0
    if (input.UP) {
      dOut = Util.normalizeAngle(this.orientation + this.wheelOrientation)
    } else if (input.DOWN) {
      dOut = Util.normalizeAngle(
        this.orientation + Math.PI - this.wheelOrientation)
    }
    this.ax = Math.sin(dOut) * 3
    this.ay = Math.cos(dOut) * 3
  }

  update() {
    super.update()
  }
}

module.exports = Player
