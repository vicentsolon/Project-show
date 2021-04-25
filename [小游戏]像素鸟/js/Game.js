const maskDom = document.querySelector(".mask");

class Game {
    constructor() {
        this.sky = new Sky(-50);
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProducer = new PipePareProducer(-100);
        this.timer = null;
        this.tick = 16; // 移动时间间隔, 毫秒
        this.gameOver = false;
    }

    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.bird.startSwing();
        this.pipeProducer.startProduce();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach(pair => {
                pair.move(duration);
            });
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
                maskDom.style.display = "block";
            }
        }, this.tick);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
    }

    isGameOver() {
        if (this.bird.maxY == this.bird.top) {
            // 碰大地 游戏结束
            return true;
        }
        for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }

    // 两个矩形碰撞检测
    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        var disY = Math.abs(centerY1 - centerY2); //中心点总想距离
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
    }
    regEvent() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop();
                } else {
                    this.start();
                }
            } else if (e.key === " ") {
                this.bird.jump();
            }
        }
    }
}

const g = new Game();
g.regEvent();