/**
 * Wrapper class for all entities on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const mag = require('vectors/mag')(2)
const sub = require('vectors/sub')(2)

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

  distanceTo(entity) {
    return mag(sub(this.position, entity.position))
  }

  update() {
    const currentTime = Date.now()
    if (this.lastUpdateTime === 0) {
      this.deltaTime = 0
    } else {
      this.deltaTime = (currentTime - this.lastUpdateTime) / 1000
    }
    this.lastUpdateTime = currentTime
  }

  isCollidedWith(entity) {
    return this.distanceTo(entity) <= this.hitboxRadius + entity.hitboxRadius
  }
}

module.exports = Entity
