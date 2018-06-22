class Entity {
    constructor(ctx, resource, frame, position, width, height, spriteWidth, spriteHeight, scale = false, offset = false) {
        this.resource = resource;
        this.ctx = ctx;
        this.frame = frame;
        this.position = {x: position.x, y: position.y};
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.offset = offset;
    }

    get boundingBox() {
        return {
            top: this.position.y,
            left: this.position.x + ((this.offset) ? this.offset.x : 0),
            right: this.position.x + this.width,
            bottom: this.position.y + ((this.offset) ? this.offset.y : this.height)
        };
    }

    render() {
        this.ctx.save();
        if (this.scale) {
            this.ctx.translate(this.position.x, this.position.y);
            this.ctx.scale(this.scale.x, this.scale.y);
            this.ctx.translate(-this.position.x, -this.position.y);
        }

        this.ctx.drawImage(this.resource, this.frame.x, this.frame.y, this.spriteWidth, this.spriteHeight, this.position.x + ((this.offset) ? this.offset.x : 0), this.position.y + ((this.offset) ? this.offset.y : 0), this.width, this.height);
        this.ctx.restore();
    }
}

export default Entity;