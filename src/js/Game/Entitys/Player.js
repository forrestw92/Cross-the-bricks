import Helper from '../../Engine/Helper';

class Player {
    constructor(ctx, map, mouse, input, resource, frame, tileInfo, width, height, spriteWidth, spriteHeight) {
        this.map = map;
        this.mouse = mouse;
        this.input = input;
        this.resource = resource;
        this.ctx = ctx;
        this.canvasRect = this.ctx.canvas.getBoundingClientRect();
        this.position = {x: tileInfo.position.x, y: tileInfo.position.y - height / 2};
        this.startInfo = {position: tileInfo.position, row: tileInfo.row, col: tileInfo.col};
        this.height = height;
        this.width = width;
        this.frame = frame;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.row = tileInfo.row;
        this.col = tileInfo.col;
        this.moveRow = 0;
        this.moveCol = 0;
        this.lifes = 3;
        this.score = 0;
        this.winningCol = 0;
        this.lastMoveTime = 0;
        this.moveTime = 0;
        this.canMove = true;
    }

    get boundingBox() {
        return {
            top: this.position.y + this.height / 4 + 8,
            left: this.position.x + this.width / 2,
            right: this.position.x + this.width / 2,
            bottom: this.position.y + this.height / 2 + 20
        };
    }

    addScore(score) {
        this.score += score;
    }

    setScore(score) {
        this.score = score;
    }

    respawn() {
        this.canMove = true;
        this.row = this.startInfo.row;
        this.col = this.startInfo.col;
        this.position.x = this.startInfo.position.x;
        this.position.y = this.startInfo.position.y - this.height / 2;
    }

    die() {
        if (this.lifes !== 0) {
            this.lifes--;
            this.respawn();
            return true;
        }
        if (this.lifes === 0) {
            return false;
        }
    }

    calculateMouseMoveDirection() {
        let pos = this.mouse.mousePosition;
        let dirX = 0, dirY = 0;
        if (!this.mouse.mouseClick) {
            return {x: dirX, y: dirY};
        }
        let move = this.map.getTileFromPos(pos.x - this.canvasRect.left, pos.y - this.canvasRect.top + this.height / 2)[0];
        if (move.row > this.row) {
            dirY = 1;
        }
        if (move.row < this.row) {
            dirY = -1;
        }
        if (move.col > this.col) {
            dirX = 1;
        }
        if (move.col < this.col) {
            dirX = -1;
        }
        return {x: dirX, y: dirY};

    }

    getMoveDirection() {
        let mouseMove = this.calculateMouseMoveDirection();
        let dirX = 0, dirY = 0;
        if (this.input.x !== 0 || mouseMove.x !== 0) {
            dirX = this.input.x || mouseMove.x;
        }
        if (this.input.y !== 0 || mouseMove.y !== 0) {
            dirY = this.input.y || mouseMove.y;
        }
        return {x: dirX, y: dirY};
    }

    move(dt) {
        if (dt === undefined) {
            return;
        }
        if (!this.canMove) {
            return;
        }
        let direction = this.getMoveDirection();
        if (direction.x !== 0 && direction.y !== 0) {
            this.input.reset();
            return;
        }
        if (direction.x !== 0 || direction.y !== 0) {
            this.lastMoveTime += dt;
        }
        if (this.lastMoveTime > 0.1) {
            this.row += direction.y;
            this.col += direction.x;
            this.row = Helper.clamp(this.row, 0, 5);
            this.col = Helper.clamp(this.col, 0, 4);
            if (this.col !== this.winningCol && this.row === 0) {
                this.row = 1;
            }
            this.position.y = this.row * 83 - this.height / 2;
            this.position.x = this.col * 101;
            this.lastMoveTime -= 0.1;
            this.input.reset();
        }
    }

    update(dt) {
        this.move(dt);
    }

    render() {
        this.ctx.drawImage(this.resource, this.frame.x, this.frame.y, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.spriteWidth, this.spriteHeight);
    }
}

export default Player;