/**
 * Wrapper class for all entities on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const add = require('vectors/add')(2)
const copy = require('vectors/copy')(2)
const mag = require('vectors/mag')(2)
const mult = require('vectors/mult')(2)
const norm = require('vectors/normalize')(2)

class Entity {
  constructor(position, velocity, acceleration, mass, hitboxRadius) {
    this.position = position || [0, 0]
    this.velocity = velocity || [0, 0]
    this.acceleration = acceleration || [0, 0]

    this.orientation = 0
    this.mass = mass || 1
    this.hitboxRadius = hitboxRadius || 0

    this.lastUpdateTime = 0
    this.deltaTime = 0
  }

  get x() {
    return this.position[0]
  }

  set x(x) {
    this.position[0] = x
  }

  get y() {
    return this.position[1]
  }

  set y(y) {
    this.position[1] = y
  }

  get vx() {
    return this.velocity[0]
  }

  set vx(vx) {
    this.velocity[0] = vx
  }

  get vy() {
    return this.velocity[1]
  }

  set vy(vy) {
    this.velocity[1] = vy
  }

  get ax() {
    return this.acceleration[0]
  }

  set ax(ax) {
    this.acceleration[0] = ax
  }

  get ay() {
    return this.acceleration[1]
  }

  set ay(ay) {
    this.acceleration[1] = ay
  }

  distanceTo(entity) {
    const dx = this.x - entity.x
    const dy = this.y - entity.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  update() {
    const currentTime = Date.now()
    if (this.lastUpdateTime === 0) {
      this.deltaTime = 0
    } else {
      this.deltaTime = currentTime - this.lastUpdateTime
    }


    // Apply acceleration from control to the Entity.
    const da = mult(copy(this.acceleration), this.deltaTime / 1000)
    add(this.velocity, da)

    // Apply friction to the Entity.
    const frictionMag = 9
    const friction = mult(norm(copy(this.velocity)), -frictionMag)
    if (frictionMag > mag(this.velocity)) {
      this.velocity = [0, 0]
    } else {
      add(this.velocity, friction)
    }

    // Apply the calculated velocity to the Entity.
    const dv = mult(copy(this.velocity), this.deltaTime / 1000)
    add(this.position, dv)

    this.lastUpdateTime = currentTime
  }

  isCollidedWith(entity) {
    return this.distanceTo(entity) <= this.hitboxRadius + entity.hitboxRadius
  }
}

module.exports = Entity
