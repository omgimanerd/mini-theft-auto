/**
 * This class facilitates the tracking of user input, such as mouse clicks
 * and button presses.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

class Input {
  constructor() {
    this.LEFT_CLICK = false
    this.RIGHT_CLICK = false
    this.MOUSE = []

    this.LEFT = false
    this.UP = false
    this.RIGHT = false
    this.DOWN = false
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
      this.LEFT = true
      break
    case 38:
    case 87:
      this.UP = true
      break
    case 39:
    case 68:
      this.RIGHT = true
    case 40:
    case 83:
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
      this.LEFT = false
      break
    case 38:
    case 87:
      this.UP = false
      break
    case 39:
    case 68:
      this.RIGHT = false
    case 40:
    case 83:
      this.DOWN = false
    default:
      break
    }
    /* eslint-enable no-fallthrough */
  }

  onMouseMove(event) {
    this.mouse = [event.offsetX, event.offsetY]
  }

  apply(element) {
    element.addEventListener('mousedown', this.onMouseDown)
    element.addEventListener('mouseup', this.onMouseUp)
    element.addEventListener('keyup', this.onKeyUp)
    element.addEventListener('keydown', this.onKeyDown)
    element.addEventListener('mousemove', this.onMouseMove)
  }
}

if (typeof exports !== 'undefined') {
  module.exports = Input
}

const i = new Input()
i.apply(document)
