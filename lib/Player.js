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

const MAX_SPEED = 500
const ACCELERATION = 60
const LATERAL_FRICTION = 0.1
const BACKWARDS_FRICTION = 3
const TURN_RATE = 0.004

class Player extends Entity {
  constructor(socketId, name) {
    super([100, 100], null, null, null, 30)
    this.socketId = socketId
    this.name = name
    this.score = 0

    this.orientation = 0
    this.wheelOrientation = 0

    this.wheelOrientationDelta = 0
    this.accelerating = 0
  }

  updateOnInput(input) {
    if (input.WHEEL_ORIENTATION) {
      this.wheelOrientation = Util.bound(
        input.WHEEL_ORIENTATION,
        -Math.PI / 8, Math.PI / 8)
    } else if (input.LEFT) {
      this.wheelOrientationDelta = -TURN_RATE
    } else if (input.RIGHT) {
      this.wheelOrientationDelta = TURN_RATE
    } else {
      this.wheelOrientationDelta =
        Util.getSign(this.wheelOrientation) * -TURN_RATE
    }

    if (input.UP) {
      this.accelerating = -1
    } else if (input.DOWN) {
      this.accelerating = 1
    } else {
      this.accelerating = 0
    }
  }

  update() {
    super.update()

    // this.wheelOrientation = Util.bound(
    //   this.wheelOrientation + this.wheelOrientationDelta,
    //   -Math.PI / 8, Math.PI / 8)

    const velocityMag = mag(this.velocity)
    if (velocityMag !== 0) {
      this.orientation += this.wheelOrientation * (velocityMag / MAX_SPEED)
    }
    const rightVector = [
      -Math.sin(this.orientation - Math.PI / 2),
      Math.cos(this.orientation - Math.PI / 2)
    ]
    const lateralVelocity = mult(rightVector, dot(this.velocity, rightVector))
    const lateralVelocityMag = mag(lateralVelocity)
    let lateralFriction = mult(lateralVelocity, -LATERAL_FRICTION)
    if (mag(lateralFriction) > lateralVelocityMag) {
      lateralFriction = mult(norm(lateralFriction), lateralVelocityMag)
    }
    const backwardsFriction = mult(
      copy(this.velocity), -BACKWARDS_FRICTION * this.deltaTime)
    if (mag(backwardsFriction) > velocityMag) {
      this.velocity = [0, 0]
    } else {
      const friction = add(lateralFriction, backwardsFriction)
      add(this.velocity, friction)
    }

    const forwardVector = [
      -Math.sin(this.orientation), Math.cos(this.orientation)
    ]
    const da = mult(forwardVector, this.accelerating * ACCELERATION)
    add(this.velocity, da)
    if (velocityMag > MAX_SPEED) {
      this.velocity = mult(norm(this.velocity), MAX_SPEED)
    }

    const dv = mult(copy(this.velocity), this.deltaTime)
    add(this.position, dv)
  }

  deductCollisionScore() {
    const loss = Math.ceil(this.score * 0.4)
    this.score -= loss
    return loss
  }

  onPlayerCollision(entity, createScrapCallback) {
    if (mag(this.velocity) > mag(entity.velocity)) {
      console.log('fuck')
    }
  }
}

module.exports = Player
