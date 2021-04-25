const landDom = document.querySelector(".land");
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);

class Land extends Rect {
    constructor(speed) {
        super(landDom, landWidth, landHeight, 0, landTop, speed, 0);
    }
    
    onMove() {
        if (this.left <= -landWidth/2) {
            this.left = 0;
        }
    }
}
