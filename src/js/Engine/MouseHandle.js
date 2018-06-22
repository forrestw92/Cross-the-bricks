class MouseHandle {
    constructor(element) {
        element.addEventListener('mousedown', e => {
            this.addClick(e);
        }, false);
        element.addEventListener('mouseup', e => {
            this.removeClick(e);
        }, false);
        element.addEventListener('mousemove', e => {
            this.setMousePosition(e);
        }, false);

        element.addEventListener('touchmove', e => {
            this.setMousePosition(e);
        }, false);

        element.addEventListener('touchstart', e => {
            this.addClick(e);
        }, false);
        element.addEventListener('touchend', e => {
            this.removeClick(e);
        }, false);
        this.mouseMoveInfo = {};
        this.mouseClickInfo = {buttons: []};

    }

    get mouseClick() {
        let clicks = this.mouseClickInfo.buttons.filter(button => {
            return button !== false;
        });
        if (clicks.length > 0) {
            return this.mouseClickInfo;
        }
        return false;
    }

    get mousePosition() {
        if (this.mouseMoveInfo.hasOwnProperty('x')) {
            return this.mouseMoveInfo;
        }
        return false;
    }

    mouseInRect(x, y, w, h) {
        return (this.mouseMoveInfo.x >= x &&
            this.mouseMoveInfo.x <= x + w &&
            this.mouseMoveInfo.y >= y &&
            this.mouseMoveInfo.y <= y + h);
    }

    removeClick(e) {
        this.mouseClickInfo.buttons[((e.touches) ? 1 : e.which)] = false;
    }

    addClick(e) {
        this.mouseClickInfo.x = (e.touches) ? e.touches[0].clientX : e.clientX;
        this.mouseClickInfo.y = (e.touches) ? e.touches[0].clientY : e.clientY;
        this.mouseClickInfo.buttons[((e.touches) ? 1 : e.which)] = true;
    }

    setMousePosition(e) {
        let x = (e.touches) ? e.touches[0].pageX : e.clientX;
        let y = (e.touches) ? e.touches[0].pageY : e.clientY;
        this.mouseMoveInfo = {
            x, y
        };

    }
}

export default MouseHandle;