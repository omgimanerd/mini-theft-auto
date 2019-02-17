/**
 * Manages the player viewport when they move around.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */


class Viewport {
  constructor(x, y, canvasWidth, canvasHeight) {
    this.x = null
    this.y = null
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.deltaTime = 0
    this.lastUpdateTime = 0
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  update(playerX, playerY) {
    const currentTime = Date.now()
    if (this.lastUpdateTime === 0) {
      this.deltaTime = 0
    } else {
      this.deltaTime = currentTime - this.lastUpdateTime
    }
    const canX = this.toCanvasX(playerX)
    const canY = this.toCanvasY(playerY)
    const dx = canX - this.canvasWidth / 2
    const dy = canY - this.canvasHeight / 2
    this.x += dx * 0.0015 * this.deltaTime
    this.y += dy * 0.0025 * this.deltaTime
    this.lastUpdateTime = currentTime
  }

  toCanvasX(x) {
    return x - (this.x - this.canvasWidth / 2)
  }

  toCanvasY(y) {
    return y - (this.y - this.canvasHeight / 2)
  }
}
