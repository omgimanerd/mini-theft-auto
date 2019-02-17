/* global Drawing, Input */
/**
 * Class encapsulating the client side of the game, handles drawing and
 * updates.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

class Game {
  constructor(socket, canvas) {
    this.socket = socket
    this.drawing = new Drawing(canvas.getContext('2d'))
    this.input = new Input(canvas)

    this.animationFrameId = 0

    this.self = null
    this.others = null
  }

  init(name) {
    this.input.apply()
    this.socket.emit('new-player', {
      name
    }, () => {
      this.socket.on('update', this.update)
      this.run()
    })
  }

  update(state) {
    this.self = state.self
    this.others = state.others
  }

  sendInput() {
    this.socket.emit('player-action', this.input)
  }

  draw() {
    this.drawing.clear()
    this.drawing.drawPlayer(false, 300 , 800, Math.PI / 3)
  }

  animate() {
    this.animationFrameId = window.requestAnimationFrame(this.run.bind(this))
  }

  run() {
    this.sendInput()
    this.draw()
    this.animate()
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.animationFrameId)
  }
}

if (typeof exports !== 'undefined') {
  module.exports = Game
}
