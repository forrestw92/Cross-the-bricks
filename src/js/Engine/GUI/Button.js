class Button {
    constructor(ctx, mouse, position, style, onClick) {
        this.mouse = mouse;
        this.ctx = ctx;
        this.canvasRect = this.ctx.canvas.getBoundingClientRect();
        this.position = position;
        this.width = position.width;
        this.height = position.height;
        this.style = style;
        this.onClick = onClick;

    }

    mouseOver() {
        return (this.mouse.mouseMoveInfo.x - this.canvasRect.left >= this.getBoundingBox().left &&
            this.mouse.mouseMoveInfo.x - this.canvasRect.left <= this.getBoundingBox().right &&
            this.mouse.mouseMoveInfo.y - this.canvasRect.top >= this.getBoundingBox().top &&
            this.mouse.mouseMoveInfo.y - this.canvasRect.top <= this.getBoundingBox().bottom);
    }

    update(dt, t) {
        if (this.mouse.mouseClick && this.mouseOver()) {
            this.onClick();
        }
    }

    render() {
        this.ctx.save();
        if (this.style) {
            if (this.style.shadowBlur) {
                this.ctx.shadowBlur = this.style.shadowBlur;
            }
            if (this.style.shadowColor) {
                this.ctx.shadowColor = this.style.shadowColor;
            }
            if (this.style.strokeStyle) {
                this.ctx.strokeStyle = this.style.strokeStyle;
            }
            if (this.style.rect) {
                this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
                this.ctx.stroke();
            }
            if (this.style.fill) {
                if (this.style.fillColor) {
                    this.ctx.fillStyle = this.style.fillColor;
                }
                this.ctx.fillRect(this.position.x + (this.mouseOver() && this.style.hover ? -5 : 0), this.position.y + (this.mouseOver() && this.style.hover ? -5 : 0), this.width + (this.mouseOver() && this.style.hover ? 10 : 0), this.height + (this.mouseOver() && this.style.hover ? 10 : 0));
            }

        } else {
            this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
            this.ctx.stroke();
        }

        this.ctx.restore();

    }

    getBoundingBox() {
        return {
            left: this.position.x,
            top: this.position.y,
            right: this.position.x + this.width,
            bottom: this.position.y + this.height
        };
    }
}

export default Button;