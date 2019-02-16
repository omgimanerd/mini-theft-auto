/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

class Drawing {
  constructor(context, images) {
    this.context = context
    this.images = images

    this.width = this.context.canvas.width
    this.height = this.context.canvas.height
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}

if (typeof exports !== 'undefined') {
  module.exports = Drawing
}
