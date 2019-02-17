/**
 * @fileoverview Stores the state of a piece of scrap.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const add = require('vectors/add')(2)
const copy = require('vectors/copy')(2)
const mag = require('vectors/mag')(2)
const mult = require('vectors/mult')(2)

const Entity = require('./Entity')

const FRICTION = 2

class Scrap extends Entity {
  constructor() {
    super()

    this.cooldown = 2
    this.collected = false
  }

  get collectable() {
    return this.cooldown === 0 && !this.collected
  }

  update() {
    super.update()

    this.cooldown = Math.max(0, this.cooldown - this.deltaTime)

    const friction = mult(
      copy(this.velocity), -FRICTION * this.deltaTime)
    if (mag(friction) > mag(this.velocity)) {
      this.velocity = [0, 0]
    } else {
      add(this.velocity, friction)
    }

    const dv = mult(copy(this.velocity), this.deltaTime)
    add(this.position, dv)
  }
}

module.exports = Scrap
