const birdDom = document.querySelector(".bird");
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
const gameDom = document.querySelector(".game")
const gameHeight = gameDom.clientHeight;

class Bird extends Rect {
    constructor() {
        super(birdDom, birdWidth, birdHeight, birdLeft, birdTop, 0, 0);
        this.g = 1500;  // 设置下落加速度
        this.maxY = gameHeight - landHeight - this.height;
        this.swingStatus = 1; // 设置翅膀状态
        this.timer = null;
        this.render();
    }

    startSwing() {
        this.timer = setInterval(()=>{
            this.swingStatus ++;
            if (this.swingStatus == 4) {
                this.swingStatus = 1;
            }
            this.render();
        }, 200);

    }

    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }

    move(duration) {
        super.move(duration);
        this.ySpeed += this.g * duration; // 根据加速度重新设置下落速度
    }
    
    // 控制范围
    onMove() {
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }

    // 向上跳
    jump() {
        this.ySpeed = -400;
    }
}
