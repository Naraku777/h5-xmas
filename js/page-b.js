// js/page-b.js


function PageB(element, pageComplete) {

  var ANIMATION_END = 'animationend webkitAnimationEnd'

  var $boy = element.find('.xmas-boy')
  var $girl = element.find('.girl')

  // boy action
  var boyAction = {
    walk: function () {
      var dfd = $.Deferred()
      $boy.transition({
        "right": "4.5rem"
      }, 4000, "linear", function () {
        dfd.resolve()
      })
      return dfd
    },
    stopWalk: function () {
      $boy.removeClass('boy-walk')
      $boy.addClass('boy-stand')
    },
    runWalk: function () {
      $boy.addClass('walk-run')
    },
    unwrap: function () {
      var dfd = $.Deferred()
      $boy.addClass('boy-unwrap')
      $boy.removeClass('boy-stand')
      $boy.one(ANIMATION_END, function () {
        dfd.resolve()
      })
      return dfd
    },
    undress: function (count) {
      $boy.addClass('boy-undress-step-' + count).removeClass('boy-unwrap')
    },
    hug: function () {
      $boy.addClass('boy-hug').one(ANIMATION_END, function () {
        $('.xmas-boy-head').show()
      })
    }
  }

  var girlAction = {
    // stand up
    standUp: function () {
      var dfd = $.Deferred()
      // stand up
      setTimeout(function () {
        $girl.addClass('girl-stand-up')
      }, 200)
      // throw book
      setTimeout(function () {
        $girl.addClass('girl-throw-book')
        dfd.resolve()
      }, 500)
      return dfd
    },
    // walk
    walk: function () {
      var dfd = $.Deferred()
      $girl
        .addClass('girl-walk')
        .transition({
          "left": "4.5rem"
        }, 4000, "linear", function () {
          dfd.resolve()
        })
      return dfd
    },
    // stop walk
    stopWalk: function () {
      $girl
        .addClass('walk-stop')
        .removeClass('girl-stand-up')
        .removeClass('girl-walk')
        .removeClass('girl-throw-book')
        .addClass('girl-stand')
    },
    // choose
    choose: function (callback) {
      $girl.addClass('girl-choose').removeClass('walk-stop')
      $girl.one(ANIMATION_END, function () {
        callback && callback()
      })
    },
    // weep
    weepWalk: function (callback) {
      $girl.addClass('girl-weep')
      $girl.transition({
        "left": "7rem"
      }, 1000, "linear", function () {
        $girl.addClass('walk-stop').removeClass('girl-weep')
        callback && callback()
      })
    },
    // hug
    hug: function () {
      $girl.addClass('girl-hug').addClass('walk-run')
    }
  }

  // start action
  boyAction
    // start walk
    .walk()
    // stop walk
    .then(function () {
      return boyAction.stopWalk()
    })
    // unwrap package
    .then(function () {
      return boyAction.unwrap()
    })
    // undress
    .then(function () {
      setTimeout(function () {
        boyAction.undress(1)
      }, 1000)
      setTimeout(function () {
        boyAction.undress(2)
      }, 2000)
      setTimeout(function () {
        boyAction.undress(3)
      }, 3000)
      setTimeout(function () {
        boyAction.hug()
      }, 4000)
    })
  girlAction
    .standUp()
    .then(function(){
      // stop walk
      return girlAction.stopWalk()
    })
    .then(function(){
      // walk
      return girlAction.walk()
    })
    .then(function(){
      // choose
      girlAction.choose(function(){
        // continue walk
        girlAction.weepWalk(function(){
          // hug
          girlAction.hug()
        })
      })
    })
}
