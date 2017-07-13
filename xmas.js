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

  // 观察者
  var observer = new Observer()
  // Page A
  new PageA(function () {
    observer.publish('completeA')
  })
  // Enter page B
  observer.subscribe('pageB', function () {
    new PageB(function () {
      observer.publish("completeB")
    })
  })
  // Enter page C
  observer.subscribe('pageC', function () {
    new PageC()
  })

  // Page A to page B
  observer.subscribe('completeA', function () {
    changePage($pageA, 'effect-out', function () {
      observer.publish('pageB')
    })
  })
  // Page B to page C
  observer.subscribe('completeB', function () {
    changePage($pageC, 'effect-in', function () {
      observer.publish('pageC')
    })
  })

  // $('#choose').on('change', function (e) {
  //   var pageName = e.target.value

  //   switch (pageName) {
  //     case "page-b":
  //       changePage($pageA, "effect-out", function () {
  //         new PageB()
  //       })
  //       break;
  //     case "page-c":
  //       changePage($pageC, "effect-in", function () {
  //         new PageC()
  //       })
  //       break;
  //   }
  // })
}


$(function () {
  Xmas()
})
