/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const PATH = '/public/img'

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

  drawPlayer(isSelf, x, y, orientation) {

    const myCar = new Image()
    if (isSelf) {
      myCar.src = this.images.audi
    } else {
      myCar.src = this.images.viper
    }
    this.context.save()
    this.context.translate(x, y)
    this.context.rotate(orientation)
    this.context.drawImage(myCar, -myCar.width / 2, -myCar.height / 2)
    this.context.restore()
    this.context.fillRect(64, 64, 5, 5)
  }

  // randomCar() {
  //   return Object.keys(this.images)[
  //     Math.floor(Math.random() * Object.keys(this.images).length)
  //   ]
  // }

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
