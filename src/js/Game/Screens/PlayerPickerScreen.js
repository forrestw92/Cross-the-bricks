import Entity from '../Entitys/Entity';
import Button from '../../Engine/GUI/Button';
import GUI from '../../Engine/GUI/GUI';
import Text from '../../Engine/GUI/Text';
import Helper from '../../Engine/Helper';
import Config from '../Config';

class PlayerPickerScreen {
    constructor(engine, mouse, callback) {
        this.ctx = engine.ctx;
        this.canvasRect = this.ctx.canvas.getBoundingClientRect();
        this.resources = engine.resources;
        this.mouse = mouse;
        this.callback = callback;
        this.callback.adsf = this;
        this.playerFrames = 4;
        this.players = new Entity(this.ctx, this.resources.get(Config.resourceInfo.players), {x: 0, y: 0}, {
            x: 0,
            y: this.ctx.canvas.height / 2 - 171 / 2
        }, 504, 171, 504, 171);
        this.selector = new Entity(this.ctx, this.resources.get(Config.resourceInfo.entities), {
            x: 606,
            y: 0
        }, {x: this.ctx.canvas.width / 2 - 101 / 2, y: this.ctx.canvas.height / 2 - 171 / 2}, 101, 171, 101, 171);
        this.gui = new GUI({x: 0, y: 0}, this.ctx.canvas.width, this.ctx.canvas.height);
        this.playerButton = new Button(this.ctx, this.mouse, Config.playerScreen.confirmButton.position, Config.playerScreen.confirmButton.style, this.callback);
        this.playerButtonText = new Text(this.ctx, Config.playerScreen.confirmButtonText.text, Config.playerScreen.confirmButtonText.position, Config.playerScreen.confirmButtonText.style);
        this.chooseText = new Text(this.ctx, Config.playerScreen.subTitle.text, Config.playerScreen.subTitle.position, Config.playerScreen.subTitle.style);
        this.titleText = new Text(this.ctx, Config.playerScreen.title.text, Config.playerScreen.title.position, Config.playerScreen.title.style);
        this.gui.leaves.push(this.playerButton, this.playerButtonText, this.titleText, this.chooseText);
        this.leaves = [this.selector, this.players, this.gui];
        this.pickedFrame = -1;
        this.pickedDirection = 0;
        this.callback.pickedFrame = 202;
    }

    mouseInRect(x, y) {
        return x >= 0 &&
            x <= this.ctx.canvas.width &&
            y >= this.ctx.canvas.height / 2 - 171 / 2 &&
            y <= this.ctx.canvas.height / 2 + 171 / 2;
    }

    mouseToFrame(x, y) {
        for (let frame = 0; frame <= this.playerFrames; frame++) {
            let frameX = frame * 101,
                frameY = this.players.position.y;
            if (x >= frameX &&
                x <= frameX + 101 &&
                y >= frameY &&
                y <= frameY + 171) {
                return frame;
            }
        }
    }

    update(dt, t) {
        if (this.mouse.mouseClick && this.mouseInRect(this.mouse.mouseClick.x - this.canvasRect.left, this.mouse.mouseClick.y - this.canvasRect.top)) {
            this.pickedFrame = this.mouseToFrame(this.mouse.mouseClick.x - this.canvasRect.left, this.mouse.mouseClick.y - this.canvasRect.top);
            this.pickedDirection = (this.mouse.mouseClick.x - this.canvasRect.left >= this.selector.position.x) ? 1 : -1;
        }
        if (this.pickedFrame !== -1) {
            this.selector.position.x += this.pickedDirection * Math.floor(dt * 505);
            this.selector.position.x = Helper.clamp(this.selector.position.x, 0, this.ctx.canvas.width - this.selector.spriteWidth);
            if (this.pickedDirection === 1 && this.selector.position.x >= this.pickedFrame * 101 || this.pickedDirection === -1 && this.selector.position.x <= this.pickedFrame * 101) {
                this.selector.position.x = this.pickedFrame * 101;
                this.callback.pickedFrame = this.pickedFrame * 101;
                this.pickedFrame = -1;
            }
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}

export default PlayerPickerScreen;