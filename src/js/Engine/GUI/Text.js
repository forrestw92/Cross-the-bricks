class Text {
    constructor(ctx, text, position, style,) {
        this.ctx = ctx;
        this.text = text;
        this.position = position;
        this.style = style;
        this.defaults = {
            font: {
                size: 16,
                name: "Arial"
            }
        };
    }

    render() {
        let fontString = "";
        this.ctx.save();

        if (this.style) {
            if (this.style.font) {
                if (this.style.font.style) {
                    fontString += this.style.font.style;
                }
                if (this.style.font.size) {
                    fontString += this.style.font.size + 'px ';
                } else {
                    fontString += this.defaults.font.size + 'px ';
                }
                if (this.style.font.name) {
                    fontString += this.style.font.name;
                } else {
                    fontString += this.defaults.font.name;
                }
                this.ctx.font = fontString;
            }
            if (this.style.align) {
                this.ctx.textAlign = this.style.align;
            }
            if (this.style.color) {
                this.ctx.fillStyle = this.style.color;
            }
            if (this.style.fillText) {
                this.ctx.fillText(this.text, this.position.x, this.position.y);
            }
            if (this.style.strokeText) {
                this.ctx.strokeText(this.text, this.position.x, this.position.y);
            }
        }
        this.ctx.restore();
    }
}

export default Text;