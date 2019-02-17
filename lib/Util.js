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
}

Util.TAU = 2 * Math.PI

module.exports = Util
