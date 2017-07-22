//



// 模拟镜头效果切换页面
function changePage(element, effect, callback) {

    element
        .addClass(effect)
        .one('animationend webkitAnimationEnd', function () {
            callback && callback()
        })
}

// Background music
function H5Audio(url, loop) {
    var audio = new Audio(url)

    audio.autoplay = true
    audio.loop = loop || false
    audio.play()

    return {
        end: function (callback) {
            audio.addEventListener('ended', function () {
                callback && callback()
            }, false)
        }
    }
}

var Xmas = function () {
    var $pageA = $('.page-a')
    var $pageB = $('.page-b')
    var $pageC = $('.page-c')

    // // 观察者
    // var observer = new Observer()
    // // Page A
    // new PageA(function () {
    //   observer.publish('completeA')
    // })
    // // Enter page B
    // observer.subscribe('pageB', function () {
    //   new PageB(function () {
    //     observer.publish("completeB")
    //   })
    // })
    // // Enter page C
    // observer.subscribe('pageC', function () {
    //   new PageC()
    // })

    // // Page A to page B
    // observer.subscribe('completeA', function () {
    //   changePage($pageA, 'effect-out', function () {
    //     observer.publish('pageB')
    //   })
    // })
    // // Page B to page C
    // observer.subscribe('completeB', function () {
    //   changePage($pageC, 'effect-in', function () {
    //     observer.publish('pageC')
    //   })
    // })

    new PageA($pageA)
}


$(function () {
    Xmas()
    // var bgAudio = H5Audio('audio/scene.mp3')
    // bgAudio.end(function () {
    //   console.log('Background music ended...')
    // })
})