/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const PATH = '/public/img'
const TILE_WIDTH = 1250
const TILE_HEIGHT = 1000
const MAX = 5000

class Drawing {
  constructor(context) {
    this.context = context
    this.images = {
      audi: `${PATH}/audi_64x64.png`,
      viper: `${PATH}/black_viper_64x64.png`,
      tile: `${PATH}/background.jpg`
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

  drawBackground(x, y) {
    const bg = new Image()
    bg.src = this.images.tile
    for (let xC = x; xC < x + MAX; xC += TILE_WIDTH) {
      for (let yC = y; yC < y + MAX; yC += TILE_HEIGHT) {
        this.context.drawImage(bg, xC, yC)
      }
    }
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
