// js/page-b.js


function PageB(element, pageComplete) {

  var ANIMATION_END = 'animationend webkitAnimationEnd'

  // boy
  var $boy = element.find('.xmas-boy')

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

  // start action
  boyAction
    // start walk
    .walk()
    // stop walk
    .then(function () {
      boyAction.stopWalk()
    })
    // unwrap package
    .then(function () {
      boyAction.unwrap()
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
}
