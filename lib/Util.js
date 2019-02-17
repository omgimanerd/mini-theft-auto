/**
 * @fileoverview Description
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

class Util {
  static normalizeAngle(angle) {
    while (angle < 0) {
      angle += Util.TAU
    }
    return angle % Util.TAU
  }

  static bound(value, min, max) {
    if (value < min) {
      return min
    } else if (value > max) {
      return max
    }
    return value
  }

  static getSign(value) {
    if (value > 0) {
      return 1
    } else if (value < 0) {
      return -1
    }
    return 0
  }
}

Util.TAU = 2 * Math.PI

module.exports = Util
