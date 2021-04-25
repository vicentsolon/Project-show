const skyDom = document.querySelector(".sky");
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);

class Sky extends Rect {
    constructor(speed) {
        super(skyDom, skyWidth, skyHeight, 0, 0, speed, 0);
    }
    
    onMove() {
        if (this.left <= -skyWidth/2) {
            this.left = 0;
        }
    }
}