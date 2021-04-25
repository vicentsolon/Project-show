/**
 * 矩形类，可以移动
 * 属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象
 * xSpeed：横向速度，单位（像素/秒），正数是向右，负数向左
 * ySpeed：纵向速度，单位（像素/秒），正数是向下，负数向上
 */
class Rect {
    constructor(dom, width, height, left, top, xSpeed, ySpeed) {
        this.dom = dom;
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.render();
    }

    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.top = this.top + "px";
        this.dom.style.left = this.left + "px";
    }

    /**
     * 按照矩形的速度，和指定的时间，移动矩形
     * @param {*} duration 单位：秒
     */
    move(duration) {
        const xDis = this.xSpeed * duration; // 横向距离
        const yDis = this.ySpeed * duration; // 纵向距离
        this.left = this.left + xDis;
        this.top = this.top + yDis;

        if (this.onMove) {
            this.onMove(); // 重置位置
        }

        this.render(); // 重新渲染
    }
}