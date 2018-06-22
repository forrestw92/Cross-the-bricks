class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.createCanvas();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        document.body.appendChild(this.canvas);
    }
}

export default Canvas;