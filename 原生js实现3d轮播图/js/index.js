const oImg = document.getElementsByTagName("img");

// 获取图片数量
let len = oImg.length;

// 展示中心图片索引值
let curDisplay = 0;

// 定义一个计时器变量
let timer;

// 入口函数
function init() {
    show();
    autoPlay();
    bindEvent();
}

init();

// 图片展示
function show() {
    // 数组索引的中间值
    let midLen = Math.floor( len/2 );
    let lNum, rNum;
    // 分别是分散在中间图片左右左右的两侧的索引值

    // 分别让分散在左右两侧的图片平移旋转
    for (let i = 1; i <= midLen; i ++) {
        lNum = curDisplay - i;
        if ( lNum == -1) {
            lNum = len - 1;
        } else if ( lNum == -2) {
            lNum = len - 2;
        }
        oImg[lNum].style.transform = `translateX(${-150 * i}px) translateZ(${300 - i * 100}px) rotateY(30deg)`;

        rNum = curDisplay + i;
        if ( rNum == 5) {
            rNum = 0;
        } else if ( rNum == 6) {
            rNum = 1;
        }
        oImg[rNum].style.transform = `translateX(${150 * i}px) translateZ(${300 - i * 100}px) rotateY(-30deg)`;
    }

    //展示中心图片向z轴移动
    oImg[curDisplay].style.transform = "translateZ(300px)";
}

// 自动播放
function autoPlay() {
    timer = setInterval(function () {
        if ( curDisplay == len -1) {
            curDisplay = 0;
        } else {
            curDisplay ++;
        }
        show();
    },1500);
}


// 绑定事件
function bindEvent() {
    // 闭包问题，使用let解决
    for (let i = 0; i < len; i ++ ) {
        oImg[i].onclick = function () {
            //改变当前索引
            curDisplay = i;
            show();
        }
        oImg[i].onmouseover = function () {
            clearInterval(timer);
        }
        oImg[i].onmouseout = function () {
            autoPlay();
        }
    }
}