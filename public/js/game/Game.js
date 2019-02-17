/* global Drawing, Input, Viewport */
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
    this.viewport = new Viewport(0, 0, canvas.width, canvas.height)
    this.animationFrameId = 0

    this.self = null
    this.others = null
  }

  init(name) {
    this.input.apply()
    this.socket.emit('new-player', {
      name
    }, (x, y) => {
      this.socket.on('update', this.update.bind(this))
      this.run()
      this.viewport.setPosition(x, y)
    })
  }

  update(state) {
    this.self = state.self
    this.viewport.update(this.self.position[0], this.self.position[1])
    this.others = state.others
  }

  sendInput() {
    this.socket.emit('player-action', this.input)
  }

  draw() {
    if (this.self !== null) {
      this.drawing.clear()
      this.drawing.drawBackground(this.viewport.toCanvasX(0),
        this.viewport.toCanvasY(0))
      this.drawing.drawPlayer(true,
        this.viewport.toCanvasX(this.self.position[0]),
        this.viewport.toCanvasY(this.self.position[1]),
        this.self.orientation)
    }
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
