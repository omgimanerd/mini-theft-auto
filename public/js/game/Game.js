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

  init(name) {
    this.socket.emit('new-player', {
      name
    }, () => {
      this.socket.on('update', this.update)
      this.run()
    })
  }

  update(state) {
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
