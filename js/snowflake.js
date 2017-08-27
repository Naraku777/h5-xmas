$(function () {

  /**
   * Snowflake Class
   *
   * @param {string} elementName
   */
  function Snowflake(elementName) {
    // Elment
    var snowElem = document.getElementById(elementName)
    var canvasCtx = snowElem.getContext('2d')
    // Size
    var width = config.clientWidth
    var height = config.clientHeight
    // Canvas size
    snowElem.width = width
    snowElem.height = height
    // Snow count
    var SNOW_NUM = 50
    // Build snowfalake Object
    var snowflakeObjects = initSnowflakes(SNOW_NUM, width, height)
    var snowflakeCount = snowflakeObjects.length

    /**
     * Draw snowflake in canvas
     *
     */
    var render = function () {
      canvasCtx.clearRect(0, 0, width, height)
      for (var i = 0; i < snowflakeCount; ++i) {
        snowflakeObjects[i].render(canvasCtx)
      }
    }

    /**
     * Update snowflake in canvas
     *
     */
    var update = function () {
      for (var i = 0; i < snowflakeCount; ++i) {
        snowflakeObjects[i].update()
      }
    }

    /**
     * Render and update snowflake in canvas
     *
     */
    var renderAndUpdate = function () {
      render()
      update()
      requestAnimationFrame(renderAndUpdate)
    }

    // Go
    renderAndUpdate()
  }

  /**
   * Get snowflake object array
   *
   * @param {number} snowflakeNum
   * @param {number} width
   * @param {number} height
   * @returns {[object]}
   */
  function initSnowflakes(snowflakeNum, width, height) {
    // Snowflake options
    var opts = {
      // Radius
      minRadius: 3,
      maxRadius: 10,
      // Movement range
      maxX: width,
      maxY: height,
      // Speed
      minSpeedY: 0.05,
      maxSpeedY: 2,
      speedX: 0.05,
      // Alpha
      minAlpha: 0.5,
      maxAlpha: 1,
      minMoveX: 4,
      maxMoveX: 18
    }
    var snowArray = []
    for (var i = 0; i < snowflakeNum; i++) {
      snowArray[i] = new Snow(opts)
    }
    return snowArray
  }




  /**
   * Snow class
   *
   * @param {object} opts
   */
  function Snow(opts) {
    this.opts = opts
    this.radius = randomInRange(opts.minRadius, opts.maxRadius)
    // Initially position x & y
    this.initX = Math.random() * opts.maxX
    this.y = -(Math.random() * 500)
    // Speed
    this.speedY = randomInRange(opts.minSpeedY, opts.maxSpeedY)
    this.speedX = opts.speedX
    // Set alpha
    this.alpha = randomInRange(opts.minAlpha, opts.maxAlpha)
    // Angle (default: 360)
    this.angle = Math.random(Math.PI * 2)
    // Move distance
    this.x = this.initX + Math.sin(this.angle)
    // X's move distance
    this.moveX = randomInRange(opts.minMoveX, opts.maxMoveX)
  }


  /**
   * Draw snow in canvas
   *
   * @param {object} canvasCtx
   */
  Snow.prototype.render = function (canvasCtx) {
    // Begin the path
    canvasCtx.beginPath()
    // The color to fill
    canvasCtx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')'
    // context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    canvasCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    // Close the path
    canvasCtx.closePath()
    // Fill the path
    canvasCtx.fill()
  }

  /**
   * Update the snow in canvas
   * - If overflow
   * - If max angle
   *
   */
  Snow.prototype.update = function () {
    this.y += this.speedY
    if (this.y > this.opts.maxY) {
      this.y -= this.opts.maxY
    }
    this.angle += this.speedX
    if (this.angle > Math.PI * 2) {
      this.angle -= Math.PI * 2
    }
    this.x = this.initX + this.moveX * Math.sin(this.angle)
  }

  /**
   * Get random in range
   *
   * @param {number} min
   * @param {number} max
   * @returns
   */
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  Snowflake('snowflake')
})
