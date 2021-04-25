const gameWidth = gameDom.clientWidth;

class Pipe extends Rect {
    constructor(dom, height, top, speed) {
        super(dom, 52, height, gameWidth, top, speed, 0);
    }

    onMove() {
        if (this.left < -this.width) {
            // 移除超出视野范围的dom
            this.dom.remove();
        }
    }

}

function getRandomHeight(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

class PipePare {
    constructor(speed) {
        this.spaceHeight = 150; // 空隙高度
        this.minHeight = 80; // 管道的最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight; // 管道的最大高度
        const upHeight = getRandomHeight(this.minHeight, this.maxHeight);

        const upDom = document.createElement("div");
        upDom.className = "pipeUp";

        this.upPipe = new Pipe(upDom, upHeight, 0, speed);// 上管道

        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;

        const downDom = document.createElement("div");
        downDom.className = "pipeDown";

        this.downPipe = new Pipe(downDom, downHeight, downTop, speed);

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    move(duration) {
        this.downPipe.move(duration);
        this.upPipe.move(duration);
    }

    
    get useLess() {
        return this.upPipe.left < -this.upPipe.width;
    }
}

// 不断生成柱子对
class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(()=>{
            this.pairs.push(new PipePare(this.speed))
            for (let i = 0; i < this.pairs.length; i ++) {
                if (this.pairs[i].useLess) {
                    this.pairs.splice(i, 1);
                    i --;
                }
            }
        }, this.tick)
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
