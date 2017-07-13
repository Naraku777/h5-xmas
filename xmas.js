//



// 模拟镜头效果切换页面
function changePage(element, effect, callback) {
  element
    .addClass(effect)
    .one('animationend webkitAnimationEnd', function () {
      callback && callback()
    })
}

var Xmas = function () {
  var $pageA = $('.page-a')
  var $pageB = $('.page-b')
  var $pageC = $('.page-c')

  $('#choose').on('change', function (e) {
    var pageName = e.target.value

    switch (pageName) {
      case "page-b":
        changePage($pageA, "effect-out", function () {
          new PageB()
        })
        break;
      case "page-c":
        changePage($pageC, "effect-in", function () {
          new PageC()
        })
        break;
    }
  })
}


$(function () {
  Xmas()
})
