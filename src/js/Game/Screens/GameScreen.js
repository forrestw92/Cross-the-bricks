import MapLoader from '../../Engine/MapLoader';
import Player from '../Entitys/Player';
import GUI from '../../Engine/GUI/GUI';
import Entity from '../Entitys/Entity';
import Text from '../../Engine/GUI/Text';
import Config from '../Config';
import Enemy from '../Entitys/Enemy';
import Helper from '../../Engine/Helper';

class GameScreen {
    constructor(engine, mouse, input, playerFrame, gameOver) {
        this.input = input;
        this.mouse = mouse;
        this.ctx = engine.ctx;
        this.resources = engine.resources;
        this.leaves = [];
        this.enemies = [];
        this.gameOver = gameOver;
        this.playerFrame = playerFrame;
        this.timer = 0;
        this.level = 1;
        this.maxLevel = 11;
        this.randomPickupTimer = 5;
        this.currentPickupMaxAliveTime = 5;
        this.currentPickupAliveTime = 0;
        this.generateTimer = 0;
        this.winningCol = 0;
        this.start();
    }

    generatePlayer() {
        this.player = new Player(this.ctx, this.map, this.mouse, this.input, this.resources.get(Config.resourceInfo.players), {
            x: this.playerFrame,
            y: 0
        }, this.map.getTile(5, 2), 101, 83, 101, 171);

        this.leaves.push(this.player);
        this.player.winningCol = this.winningCol[0];
    }

    generateGUI() {
        this.gui = new GUI({x: 0, y: 0}, this.ctx.canvas.width, this.ctx.canvas.height);
        this.guiHearts = new Entity(this.ctx, this.resources.get(Config.resourceInfo.entities), {
            x: 303,
            y: 0
        }, {x: this.ctx.canvas.width - 40, y: -15}, 101, 171, 101, 171, {x: 0.35, y: 0.35});
        this.guiLifesText = new Text(this.ctx, this.player.lifes + Config.gameScreen.lifesText.text, Config.gameScreen.lifesText.position, Config.gameScreen.lifesText.style);
        this.guiScoreText = new Text(this.ctx, Config.gameScreen.scoreText.text, Config.gameScreen.scoreText.position, Config.gameScreen.scoreText.style);
        this.guiLevelText = new Text(this.ctx, Config.gameScreen.levelText.text, Config.gameScreen.levelText.position, Config.gameScreen.levelText.style);
        this.gui.leaves.push(this.guiLifesText, this.guiHearts, this.guiScoreText, this.guiLevelText);
        this.leaves.push(this.gui);
    }

    randomPickup(rate) {
        const rand = (rate) => {
            let pickup = Object.keys(Config.pickups).filter(key => Config.pickups[key].rate <= rate)[0];
            if (pickup !== undefined) {
                return pickup;
            } else {
                rand(rate);
            }
        };
        return rand(rate);
    }

    generatePickup(dt) {

        if (this.generateTimer <= this.randomPickupTimer) {
            this.generateTimer += dt;

            return;
        }
        this.deletePickups();
        this.generateTimer -= this.randomPickupTimer;
        let tile = this.map.getRandomEmptyTile(1, 3, 0, 5);
        if (tile) {
            let rate = Helper.randIntBetween(10, 100);
            let randPickup = this.randomPickup(rate);

            this.currentPickup = new Entity(this.ctx, this.resources.get(Config.resourceInfo.entities), Config.pickups[randPickup].frame, this.map.getTile(tile.row, tile.col).position, 101, 171, 101, 171, {
                x: 0.5,
                y: 0.5
            }, {x: 101 / 2, y: 171 / 2 - 83 / 4});
            this.currentPickup.name = randPickup;
            this.currentPickup.type = 'pickup';
            this.leaves.splice(1, 0, this.currentPickup);
        }
    }

    generateMap() {
        this.map = new MapLoader(this.ctx, this.resources.get(Config.resourceInfo.tiles), {
            x: 0,
            y: 0
        }, 83, 101, 171, 303, Config.mapInfo);
        this.leaves.push(this.map);
        this.generateObstacle();

    }

    generateObstacle() {
        this.leaves = this.leaves.filter(leaf => leaf.type !== 'rock');
        let cols = [0, 1, 2, 3, 4];
        this.winningCol = cols.splice(Helper.randIntBetween(0, cols.length), 1);
        if (this.player) {
            this.player.winningCol = this.winningCol[0];
        }
        cols.forEach(col => {
            this.obstacle = new Entity(this.ctx, this.resources.get(Config.resourceInfo.entities), {
                x: 505,
                y: 0
            }, {
                x: this.map.getTile(0, col).position.x,
                y: this.map.getTile(0, col).position.y - 83 / 2
            }, 101, 171, 101, 171);
            this.obstacle.type = 'rock';
            this.map.addEntityToTile(0, col, this.obstacle);
            this.leaves.splice(1, 0, this.obstacle);

        });
    }

    generateEnemies() {
        const deleteEnemies = () => {
            this.enemies.forEach(enemy => {
                enemy.remove = true;
            });
            this.enemies = [];
        };
        deleteEnemies();
        let rows = Helper.distributeBetween(1, 3, (this.level !== this.maxLevel) ? this.level : this.maxLevel);
        rows.forEach(row => {
            let col = Helper.randIntBetween(0, 5);
            this.enemies.push(new Enemy(this.ctx, this.resources.get(Config.resourceInfo.enemy), this.map.getTile(row, col), 101, 83, ((row === 1) ? -1 : 1), Helper.randFloatBetween(1, 1.2)));
        });
        this.leaves.splice(1, 0, this.enemies);
    }

    deletePickups() {
        this.leaves = this.leaves.filter(leaf => leaf.type !== 'pickup');
        this.currentPickup = undefined;
    }

    restrictPlayerMovement() {

        this.player.position.x = this.player.col * 101;
        this.player.position.y = this.player.row * 83 - this.player.height / 2;

        this.input.reset();
    }

    checkPlayerWin(dt) {
        this.timer += dt;
        if (this.player.row === 0 && this.player.col === this.winningCol[0]) {
            this.player.canMove = false;
            if (this.timer >= 1) {
                this.nextLevel();
            }
        } else {
            this.timer = 0;
        }
    }


    nextLevel() {
        this.level++;
        this.generateObstacle();
        this.guiLevelText.text = `Level ${this.level}`;
        this.updateScore(250);
        this.generateEnemies();
        this.player.respawn();
    }

    checkPlayerCollision() {
        let ent = [...this.enemies, this.currentPickup];

        ent.forEach(entity => {
            if (entity === undefined) return;
            if (Helper.collisionDetection(this.player, entity)) {
                if (entity instanceof Enemy) {
                    if (this.player.die()) {
                        this.guiLifesText.text = this.player.lifes + 'X';
                    } else {
                        this.gameOver();
                    }
                } else if (entity.type === 'pickup') {
                    this.addPickup(Config.pickups[this.currentPickup.name]);
                    this.deletePickups();
                } else if (entity.type === 'obstacle') {
                    this.restrictPlayerMovement();
                }
            }
        });
    }

    addLife(life) {
        this.player.lifes += life;
        this.guiLifesText.text = this.player.lifes + this.guiLifesText.text.slice(1, this.guiLifesText.text.length);
    }

    updateScore(score) {
        this.player.addScore(score);
        this.guiScoreText.text = (Helper.numberLength(this.player.score) < 5) ? '0'.repeat(5 - Helper.numberLength(this.player.score)) + this.player.score : this.player.score;
    }

    addPickup(pickup) {
        if (pickup.life) {
            this.addLife(pickup.life);
        }
        if (pickup.score) {
            this.updateScore(pickup.score);
        }

    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    update(dt, t) {
        this.generatePickup(dt);
        this.checkPlayerWin(dt);
        this.checkPlayerCollision();
    }

    start() {
        this.generateMap();
        this.generatePlayer();
        this.generateGUI();
        this.generateEnemies();
    }
}

export default GameScreen;