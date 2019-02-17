/**
 * Stores the state of the player on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const mag = require('vectors/mag')(2)

const Entity = require('./Entity')
const Util = require('./Util')

const MAX_SPEED = 100

class Player extends Entity {
  constructor(socketId, name) {
    super([100, 100])
    this.socketId = socketId
    this.name = name

    this.wheelOrientation = 0
  }

  updateOnInput(input) {
    const oDrag = 0.05
    // if (input.LEFT) {
    //   this.wheelOrientation -= 0.04
    // } else if (input.RIGHT) {
    //   this.wheelOrientation += 0.04
    // } else if (Math.abs(this.wheelOrientation) < oDrag) {
    //   this.wheelOrientation = 0
    // } else {
    //   this.wheelOrientation -= oDrag * Util.getSign(this.wheelOrientation)
    // }
    // this.wheelOrientation = Util.bound(
    //   this.wheelOrientation, -Math.PI / 6, Math.PI / 6)
    if (input.LEFT) {
      this.x -= 9
    } else if (input.RIGHT) {
      this.x += 9
    } else if (input.UP) {
      this.y -= 9
    } else if (input.DOWN) {
      this.y += 9
    }
  }

  update() {
    super.update()
    // this.orientation += this.wheelOrientation * (mag(this.velocity) / MAX_SPEED)
  }
}

module.exports = Player
