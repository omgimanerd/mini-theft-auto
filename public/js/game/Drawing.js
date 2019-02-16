/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const PATH = '/public/img/'

class Drawing {
  constructor(context) {
    this.context = context
    this.images = {
      audi: `${PATH}/audi_64x64.png`,
      viper: `${PATH}/black_viper_64x64.png`
    }
    this.width = this.context.canvas.width
    this.height = this.context.canvas.height
  }

  drawPlayer() {
    const myCar = new Image()
    myCar.src = this.images['audi']
    this.context.drawImage(myCar, 64, 64)
    this.context.fillRect(64, 64, 5, 5)
    console.log('this was called')
  }


  drawBackground() {
    // TODO: Draw tiles on background
  }

  drawPickup() {

  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}

if (typeof exports !== 'undefined') {
  module.exports = Drawing
}
