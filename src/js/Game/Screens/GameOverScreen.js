import GUI from '../../Engine/GUI/GUI';
import Text from '../../Engine/GUI/Text';
import Config from '../Config';
import Button from '../../Engine/GUI/Button';

class GameOverScreen {
    constructor(engine, mouse, highscore, callback) {
        this.ctx = engine.ctx;
        this.resources = engine.resources;
        this.mouse = mouse;
        this.playerHighScore = highscore;
        this.callback = callback;
        this.leaves = [];
        this.generateGUI();
    }

    generateGUI() {
        this.gui = new GUI({x: 0, y: 0}, this.ctx.canvas.width, this.ctx.canvas.height);
        this.title = new Text(this.ctx, Config.playerScreen.title.text, Config.playerScreen.title.position, Config.playerScreen.title.style);
        this.highscore = new Text(this.ctx, Config.gameOverScreen.subTitle.text, Config.gameOverScreen.subTitle.position, Config.gameOverScreen.subTitle.style);
        this.highScoreText = new Text(this.ctx, this.playerHighScore, Config.gameOverScreen.highScore.position, Config.gameOverScreen.highScore.style);
        this.confirmButton = new Button(this.ctx, this.mouse, Config.gameOverScreen.confirmButton.position, Config.gameOverScreen.confirmButton.style, this.callback);
        this.confirmButtonText = new Text(this.ctx, Config.gameOverScreen.confirmButtonText.text, Config.gameOverScreen.confirmButtonText.position, Config.gameOverScreen.confirmButtonText.style);

        this.gui.leaves.push(this.title, this.highScoreText, this.highscore, this.confirmButton, this.confirmButtonText);
        this.leaves.push(this.gui);
    }

    update(dt, t) {

    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}

export default GameOverScreen;