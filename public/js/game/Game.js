/**
 * Class encapsulating the client side of the game, handles drawing and
 * updates.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

class Game {
  constructor(socket, drawing, input) {
    this.socket = socket
    this.drawing = drawing
    this.input = input

    this.self = null
    this.animationFrameId = 0
  }

  init() {
    this.socket.on('update', this.update)
  }

  update(state) {

  }

  draw() {

  }

  animate() {
    this.animationFrameId = window.requestAnimationFrame(this.run)
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.animationFrameId)
  }

  run() {
    this.update()
    this.draw()
    this.animate()
  }
}

if (typeof Game !== 'undefined') {
  module.exports = Game
}
