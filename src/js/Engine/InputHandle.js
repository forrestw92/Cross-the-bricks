class InputHandle {
    constructor() {
        this.keyCodes = [37, 38, 39, 40, 65, 87, 68, 83];
        this.keys = [];
        document.addEventListener('keyup', e => {
            if (this.keyCodes.indexOf(e.which) >= 0) {
                this.keys[e.which] = false;
            }
        }, false);
        document.addEventListener('keydown', e => {
            if (this.keyCodes.indexOf(e.which) >= 0) {
                this.keys[e.which] = true;
            }
        }, false);
    }

    get y() {
        if (this.keys[38] || this.keys[87]) {
            return -1;
        }
        if (this.keys[40] || this.keys[83]) {
            return 1;
        }
        return 0;
    }

    get x() {
        if (this.keys[37] || this.keys[65]) {
            return -1;
        }
        if (this.keys[39] || this.keys[68]) {
            return 1;
        }
        return 0;
    }

    reset() {
        this.keys = [];
        return true;
    }
}

export default InputHandle;