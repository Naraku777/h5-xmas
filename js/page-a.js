//

function PageA(element) {
  this.$root = element
  this.$boy = element.find('.chs-boy')
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

PageA.prototype.stopWalk = function () {
  console.log('ok')
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
      that.stopWalk();
    })
}
