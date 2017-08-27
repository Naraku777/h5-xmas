$(function () {
  var snowElem = document.getElementById('snowflake')
  var canvasCtx = snowElem.getContext('2d')
  // 开始画一个画布中的一条新路径
  canvasCtx.beginPath()
  // 填充路径的颜色
  canvasCtx.fillStyle = 'rgba(255, 255, 255, .8)'
  // 一个中心点和半径，为一个画布的当前子路径添加一条弧线
  // 坐标，圆，沿着圆指定弧的开始点和结束点的一个角度
  // 弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历
  // context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
  canvasCtx.arc(100, 100, 50, 0, Math.PI * 2, true)
  // 关闭子路径
  canvasCtx.closePath()
  // fill() 方法使用 fillStyle 属性所指定的颜色
  // 渐变和模式来填充当前路径
  canvasCtx.fill()
})
