//

var ANIMATION_END = 'animationend webkitAnimationEnd'

function PageC() {

  this.$window = $('.page-c .window')
  this.$leftWin = this.$window.find('.window-left')
  this.$rightWin = this.$window.find('.window-right')
  this.$sceneBg = this.$window.find('.window-scene-bg')
  this.$closeBg = this.$window.find('.window-close-bg')

  // 背景切换
  this.$sceneBg.transition({
    opacity: 0
  }, 3000)
  this.$closeBg.css('transform', 'translateZ(0)')
  this.$closeBg.transition({
    opacity: 1
  }, 5000)

  // 关门动作
  this.closeWindow()
}

PageC.prototype.closeWindow = function () {
  var count = 1
  var complete = function () {
    ++count
    if (count == 2) {
      console.log('All windows closed...')
    }
  }
  var bind = function (elem) {
    elem.addClass('close').one(ANIMATION_END, function (evt) {
      complete()
    })
  }

  bind(this.$leftWin)
  bind(this.$rightWin)
}
