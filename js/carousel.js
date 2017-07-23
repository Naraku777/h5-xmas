// js/carousel.js

var slice = Array.prototype.slice

function toArray(a, i, j) {
  return slice.call(a, i || 0, j || a.length)
}

function isDefined(v) {
  return typeof v !== 'undefined'
}

function applyIf(o, c) {
  if (o) {
    for (var p in c) {
      if (!isDefined(o[p])) {
        o[p] = c[p]
      }
    }
  }
  return o
}

// format string
applyIf(String, {
  format: function (orgStr) {
    var args = toArray(arguments, 1)
    return orgStr.replace(/\{(\d+)\}/g, function (m, i) {
      return args[i]
    })
  }
})

/**
 * 3D Carousel
 * 
 * @param {Object} carousel 
 * @param {Object} options 
 */
function Carousel(carousel, options) {
  // image url
  var imgURLs = options.imgURLs
  // carousel
  var $carousel = carousel
  // conrainer
  var $spinner = carousel.find('#spinner')
  // picture number
  var picNum = imgURLs.length
  // deg
  var rotate = 360 / picNum
  var angle = 0
  var start = 0
  var current = 1
  // content 
  var $cotentElements

  this.picNum = picNum

  function createDOMStr(imgURL) {
    var str = ''
    str += '<figure style="transform:rotateY({0}deg) translateZ({1}) scaleY(.9); position:absolute;">'
    str += '<img src="{2}" style="width:100%;height:100%;">'
    str += '</figure>'

    return String.format(str, start, '2.5rem', imgURL)
  }

  function initStyle() {
    $carousel.css({
      "-webkit-perspective": "500px",
      "-moz-perspective": "500px",
      "perspective": "500px",
      "position": "absolute",
      "left": "6.8rem",
      "top": "4.5rem",
    })
    $spinner.css({
      "width": "4rem",
      "transform-style": "preserve-3d"
    })
  }

  function render() {
    var contentStr = ''
    $.each(imgURLs, function (index, url) {
      contentStr += createDOMStr(url)
      start = start + rotate
    })
    $cotentElements = $(contentStr)
    $spinner.append($cotentElements)
  }

  // go
  initStyle()
  render()

  // rotate

  var curIndex

  this.run = function (count, callback) {
    curIndex = count
    angle = (count - 1) * rotate + 360

    $spinner
      .css({
        '-webkit-transform': 'rotateY(-' + angle + 'deg)',
        '-webkit-transition': '1s',
        '-moz-transform': 'rotateY(-' + angle + 'deg)',
        '-moz-transition': '1s',
        'transform': 'rotateY(-' + angle + 'deg)',
        'transition': '1s'
      })
      .one('transitionend webkitTransitionEnd', function () {
        $spinner.css('-webkit-transition', '')
        $spinner.css('-moz-transition', '')
        $spinner.css('transition', '')
        console.log('Rotated...')
      })
  }

}
