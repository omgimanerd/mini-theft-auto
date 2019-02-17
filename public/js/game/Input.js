/* global tracking */
/**
 * This class facilitates the tracking of user input, such as mouse clicks
 * and button presses.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */


const e = id => document.getElementById(id)

const getColorDistance = (target, actual) => {
  return Math.abs(target.r - actual.r) + Math.abs(target.g - actual.g) +
    Math.abs(target.b - actual.b)
}

class Input {
  constructor(element) {
    this.element = element
    this.purpleColor = { r: 0, g: 0, b: 0 }
    this.redColor = { r: 0, g: 0, b: 0 }
    this.initialized = false

    this.LEFT_CLICK = false
    this.RIGHT_CLICK = false
    this.MOUSE = []

    this.LEFT = false
    this.UP = false
    this.RIGHT = false
    this.DOWN = false

    this.WHEEL_ORIENTATION = 0
  }

  onMouseDown(event) {
    if (event.which === 1) {
      this.LEFT_CLICK = true
    } else if (event.which === 3) {
      this.RIGHT_CLICK = true
    }
  }

  onMouseUp(event) {
    if (event.which === 1) {
      this.LEFT_CLICK = false
    } else if (event.which === 3) {
      this.RIGHT_CLICK = false
    }
  }

  onKeyDown(event) {
    /* eslint-disable no-fallthrough */
    switch (event.keyCode) {
    case 37:
    case 65:
    case 97:
      this.LEFT = true
      break
    case 38:
    case 87:
    case 199:
      this.UP = true
      break
    case 39:
    case 68:
    case 100:
      this.RIGHT = true
      break
    case 40:
    case 83:
    case 115:
      this.DOWN = true
    default:
      break
    }
    /* eslint-enable no-fallthrough */
  }

  onKeyUp(event) {
    /* eslint-disable no-fallthrough */
    switch (event.keyCode) {
    case 37:
    case 65:
    case 97:
      this.LEFT = false
      break
    case 38:
    case 87:
    case 199:
      this.UP = false
      break
    case 39:
    case 68:
    case 100:
      this.RIGHT = false
      break
    case 40:
    case 83:
    case 115:
      this.DOWN = false
    default:
      break
    }
    /* eslint-enable no-fallthrough */
  }

  onMouseMove(event) {
    this.mouse = [event.offsetX, event.offsetY]
  }

  setColorSwatch(event) {
    const getColorAt = (webcam, x, y) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = webcam.width
      canvas.height = webcam.height
      context.drawImage(webcam, 0, 0, webcam.width, webcam.height)
      const pixel = context.getImageData(x, y, 1, 1).data
      return { r: pixel[0], g: pixel[1], b: pixel[2] }
    }

    const c = getColorAt(event.currentTarget, event.offsetX, event.offsetY)
    if (!this.initialized) {
      this.purpleColor = c
      this.initialized = true
    } else {
      this.redColor = c
      this.initialized = false
    }
    console.log(this.purpleColor, this.redColor)
  }

  onColorTrack(event) {
    if (event.data.length === 2) {
      const purple = {}
      let purpleValid = false
      const red = {}
      let redValid = false
      event.data.forEach(rect => {
        if (rect.color === 'purple') {
          purple.x = rect.x + rect.width / 2
          purple.y = rect.y + rect.height / 2
          purpleValid = true
        } else if (rect.color === 'red') {
          red.x = rect.x + rect.width / 2
          red.y = rect.y + rect.height / 2
          redValid = true
        } else {
          throw new Error('fuck')
        }
      })
      if (purpleValid && redValid) {
        this.WHEEL_ORIENTATION = Math.atan2(purple.y - red.y, purple.x - red.x)
      }
      console.log(this.WHEEL_ORIENTATION * 180 / Math.PI)
    }
  }

  apply() {
    this.element.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.element.addEventListener('mouseup', this.onMouseUp.bind(this))
    this.element.addEventListener('keyup', this.onKeyUp.bind(this))
    this.element.addEventListener('keydown', this.onKeyDown.bind(this))
    this.element.addEventListener('mousemove', this.onMouseMove.bind(this))

    const purpleSlider = e('purple_tolerance')
    const redSlider = e('red_tolerance')
    const webcam = e('webcam')

    tracking.ColorTracker.registerColor('purple', (r, g, b) => {
      return getColorDistance(
        this.purpleColor, { r, g, b }) < purpleSlider.value
    })
    tracking.ColorTracker.registerColor('red', (r, g, b) => {
      return getColorDistance(this.redColor, { r, g, b }) < redSlider.value
    })

    webcam.addEventListener('click', this.setColorSwatch.bind(this))

    const tracker = new tracking.ColorTracker(['purple', 'red'])
    tracker.on('track', this.onColorTrack.bind(this))
    tracking.track(webcam, tracker, { camera: true })
  }
}

if (typeof exports !== 'undefined') {
  module.exports = Input
}
