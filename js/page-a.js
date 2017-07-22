//

function PageA(element) {
  this.$root = element
  this.$boy = element.find('.chs-boy')
  this.$window = element.find('.window')
  this.$windowLeft = this.$window.find('.window-left')
  this.$windowRight = this.$window.find('.window-right')

  this.run()
}

// run next animation
PageA.prototype.next = function (opts) {
  var dfd = $.Deferred()
  this.$boy.transition(opts.style, opts.time, "linear", function () {
    dfd.resolve()
  })
  return dfd
}

PageA.prototype.openWindow = function (callback) {
  var count = 1
  var complete = function () {
    ++count
    if (count === 2) {
      callback && callback()
    }
  }
  var bind = function (data) {
    data.one('transitioned webkitTransitionEnd', function (event) {
      data.removeClass('window-transition')
      complete()
    })
  }
  bind(this.$windowLeft.addClass('window-transition').addClass('hover'))
  bind(this.$windowRight.addClass('window-transition').addClass('hover'))
}

PageA.prototype.stopWalk = function () {
  this.$boy.removeClass("chs-boy-deer")
}

// run path
PageA.prototype.run = function (callback) {
  var that = this
  var next = function () {
    return this.next.apply(this, arguments)
  }.bind(this)

  next({
      'time': 10000,
      "style": {
        "top": "4rem",
        "right": "16rem",
        "scale": "1.2"
      }
    })
    .then(function () {
      return next({
        "time": 500,
        "style": {
          "rotateY": "-180",
          "scale": "1.5"
        }
      })
    })
    .then(function () {
      return next({
        "time": 7000,
        "style": {
          "top": "7.8rem",
          "right": "1.2rem"
        }
      })
    })
    .then(function () {
      return next({}).then(function () {
        that.stopWalk()
      })
    }).then(
      function () {
        that.openWindow(function () {
          console.log('Windows has opened...')
        })
      }
    )

}
