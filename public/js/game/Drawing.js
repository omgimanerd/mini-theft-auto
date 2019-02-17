/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const PATH = '/public/img'
const TILE_WIDTH = 1250
const TILE_HEIGHT = 1000
const MAX = 5000
const IMAGE_NAMES = {
  audi: 'audi_64x64.png',
  viper: 'black_viper_64x64.png',
  scrap: 'nut_bolt.jpg',
  tile: 'background.jpg'
}

class Drawing {
  constructor(context) {
    this.context = context
    this.images = Drawing.createImages()
    this.width = this.context.canvas.width
    this.height = this.context.canvas.height
  }

  static createImage(src) {
    const img = new Image()
    img.src = src
    return img
  }

  static createImages() {
    const images = {}
    for (const name in IMAGE_NAMES) {
      images[name] = Drawing.createImage(`${PATH}/${IMAGE_NAMES[name]}`)
    }
    return images
  }

  drawPlayer(isSelf, x, y, orientation) {
    let currentCar = null
    if (isSelf) {
      currentCar = this.images.audi
    } else {
      currentCar = this.images.viper
    }
    this.context.save()
    this.context.translate(x, y)
    this.context.rotate(orientation)
    this.context.drawImage(currentCar,
      -currentCar.width / 2, -currentCar.height / 2)
    this.context.restore()
  }

  drawBackground(x, y) {
    for (let xC = x; xC < x + MAX; xC += TILE_WIDTH) {
      for (let yC = y; yC < y + MAX; yC += TILE_HEIGHT) {
        this.context.drawImage(this.images.tile, xC, yC)
      }
    }
  }

  drawScrap(x, y) {
    this.context.save()
    this.context.translate(x, y)
    this.context.drawImage(this.images.scrap,
      -this.images.width / 2, -this.images.height / 2)
    this.context.restore()
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}

if (typeof exports !== 'undefined') {
  module.exports = Drawing
}
