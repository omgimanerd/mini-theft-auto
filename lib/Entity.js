/**
 * Wrapper class for all entities on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const add = require('vectors/add')(2)
const mult = require('vectors/mult')(2)

class Entity {
  constructor(position, velocity, acceleration, mass, hitboxRadius) {
    this.position = position || [0, 0]
    this.velocity = velocity || [0, 0]
    this.acceleration = acceleration || [0, 0]

    this.mass = mass || 1
    this.hitboxRadius = hitboxRadius || 0

    this.lastUpdateTime = 0
    this.deltaTime = 0
  }

  get position() {
    return this.position
  }

  get x() {
    return this.position[0]
  }

  get y() {
    return this.position[1]
  }

  get velocity() {
    return this.velocity
  }

  distanceTo(entity) {
    const dx = this.x - entity.x
    const dy = this.y - entity.y
    return Math.sqrt(dx * dx + dy + dy)
  }

  update() {
    const currentTime = Date.getTime()
    if (this.lastUpdateTime === 0) {
      this.deltaTime = 0
    } else {
      this.deltaTime = currentTime - this.lastUpdateTime
    }
    const dv = mult(this.velocity, this.deltaTime / 1000)
    add(this.position, dv)
    this.lastUpdateTime = currentTime
  }

  isCollidedWith(entity) {
    return this.distanceTo(entity) <= this.hitboxRadius + entity.hitboxRadius
  }
}

module.exports = Entity
