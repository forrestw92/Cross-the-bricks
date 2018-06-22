class Enemy {
    constructor(ctx, resource, tileInfo, width, height, direction, speed = 1) {
        this.ctx = ctx;
        this.resource = resource;
        this.position = {x: tileInfo.position.x, y: tileInfo.position.y - height / 4};
        this.startInfo = tileInfo.position;
        this.height = height;
        this.width = width;
        this.row = tileInfo.row;
        this.col = tileInfo.col;
        this.direction = direction;
        this.speed = speed;
    }

    get boundingBox() {
        return {
            top: this.position.y,
            left: this.position.x + ((this.direction === -1) ? -this.width : 0),
            right: this.position.x + this.width + ((this.direction === -1) ? -this.width : 0),
            bottom: this.position.y + this.height
        };
    }

    render() {
        this.ctx.save();
        this.ctx.translate(this.position.x + ((this.direction === -1) ? this.width : 0), this.position.y);
        this.ctx.scale(this.direction, 1);
        this.ctx.translate(-this.position.x + ((this.direction === -1) ? this.width : 0), -this.position.y);
        this.ctx.drawImage(this.resource, this.position.x, this.position.y);
        this.ctx.restore();

    }

    resetPosition() {
        if (this.position.x >= this.ctx.canvas.width + this.width && this.direction === 1) {
            this.position.x = -this.width;
        }
        if (this.position.x <= -this.width && this.direction === -1) {
            this.position.x = this.ctx.canvas.width + this.width;
        }
    }

    update(dt) {
        this.resetPosition();
        this.position.x += this.direction * 101 * dt * this.speed;
    }
}

export default Enemy;