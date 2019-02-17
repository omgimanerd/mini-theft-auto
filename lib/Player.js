/**
 * Stores the state of the player on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const add = require('vectors/add')(2)
const copy = require('vectors/copy')(2)
const dot = require('vectors/dot')(2)
const mag = require('vectors/mag')(2)
const mult = require('vectors/mult')(2)
const norm = require('vectors/normalize')(2)

const Entity = require('./Entity')
const Util = require('./Util')

const MAX_SPEED = 200

class Player extends Entity {
  constructor(socketId, name) {
    super([100, 100])
    this.socketId = socketId
    this.name = name

    this.orientation = 0
    this.wheelOrientation = 0
    this.gas = 0
  }

  updateOnInput(input) {
    const oDrag = 0.004
    if (input.LEFT) {
      this.wheelOrientation -= 0.002
    } else if (input.RIGHT) {
      this.wheelOrientation += 0.002
    } else if (Math.abs(this.wheelOrientation) < oDrag) {
      this.wheelOrientation = 0
    } else {
      this.wheelOrientation -= oDrag * Util.getSign(this.wheelOrientation)
    }
    this.wheelOrientation = Util.bound(
      this.wheelOrientation, -Math.PI / 6, Math.PI / 6)

    if (input.UP) {
      this.gas = -1
    } else if (input.DOWN) {
      this.gas = 1
    } else {
      this.gas = 0
    }
  }

  update() {
    super.update()
    this.orientation += this.wheelOrientation * (mag(this.velocity) / MAX_SPEED)
    const velocityMag = mag(this.velocity)
    const forwardVector = [
      -Math.sin(this.orientation), Math.cos(this.orientation)
    ]
    const rightVector = [
      -Math.sin(this.orientation - Math.PI / 2),
      Math.cos(this.orientation - Math.PI / 2)
    ]
    const lateralVelocity = mult(rightVector, dot(this.velocity, rightVector))
    const lateralVelocityMag = mag(lateralVelocity)
    let lateralFriction = mult(lateralVelocity, -0.01)
    const lateralFrictionMag = mag(lateralFriction)
    if (lateralFrictionMag > lateralVelocityMag) {
      lateralFriction = mult(norm(lateralFriction), lateralVelocityMag)
    }
    const backwardsFriction = mult(
      copy(this.velocity), -4 * this.deltaTime)
    const backwardsFrictionMag = mag(backwardsFriction)
    if (backwardsFrictionMag > velocityMag) {
      this.velocity = [0, 0]
    }
    const friction = add(lateralFriction, backwardsFriction)
    const df = mult(friction, 1)
    add(this.velocity, df)

    const aMag = 60
    let velmag = mag(this.velocity)
    const da = mult(forwardVector, this.gas * aMag)
    add(this.velocity, da)
    if (velmag > MAX_SPEED) {
      this.velocity = mult(this.velocity, MAX_SPEED / velmag)
      velmag = mag(this.velocity)
    }

    const dv = mult(copy(this.velocity), this.deltaTime)
    add(this.position, dv)
  }
}

module.exports = Player
