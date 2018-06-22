const Config = {};

Config.resources = [
    'images/players.png',
    'images/enemy-bug.png',
    'images/entities.png',
    'images/tiles.png'
];
Config.resourceInfo = {
    tiles: 'images/tiles.png',
    players: 'images/players.png',
    enemy: 'images/enemy-bug.png',
    entities: 'images/entities.png'
};
Config.pickups = {
    blueGem: {
        frame: {x: 0, y: 0},
        rate: 80,
        score: 100
    },
    greenGem: {
        frame: {x: 101, y: 0},
        rate: 60,
        score: 200
    },
    goldGem: {
        frame: {x: 202, y: 0},
        rate: 40,
        score: 300
    },
    extraLife: {
        frame: {x: 303, y: 0},
        rate: 20,
        life: 1,
        score: 500
    },
    star: {
        frame: {x: 707, y: 0},
        rate: 10,
        score: 1000
    }
};
Config.mapInfo = [
    [2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
];
Config.canvas = {
    width: 505,
    height: 606
};
Config.playerScreen = {};
Config.playerScreen.confirmButton = {};
Config.playerScreen.confirmButtonText = {};
Config.playerScreen.subTitle = {};
Config.playerScreen.title = {};


Config.playerScreen.confirmButton.position = {
    x: 505 / 2 - 101 / 2,
    y: 606 / 2 + 171 / 1.5,
    width: 101,
    height: 42.75
};
Config.playerScreen.confirmButton.style = {
    fill: true,
    fillColor: 'green',
    shadowBlur: 10,
    shadowColor: 'black',
    hover: true
};

Config.playerScreen.confirmButtonText.text = 'Confirm';
Config.playerScreen.confirmButtonText.position = {
    x: Config.canvas.width / 2 - 101 / 2 + 101 / 2,
    y: Config.canvas.height / 2 + 171 / 1.5 + 42.75 / 2 + 12 - 3
};
Config.playerScreen.confirmButtonText.style = {
    color: 'white',
    align: 'center',
    fillText: true,
    font: {size: 24}
};
Config.playerScreen.subTitle.text = 'Choose a player';
Config.playerScreen.subTitle.position = {
    x: Config.canvas.width / 2,
    y: Config.canvas.height / 2 - 171 + 80
};
Config.playerScreen.subTitle.style = {
    color: 'black',
    align: 'center',
    fillText: true,
    font: {
        name: 'Walibi',
        size: 18
    }
};
Config.playerScreen.title.text = 'Cross the bricks';
Config.playerScreen.title.position = {x: Config.canvas.width / 2, y: 100};
Config.playerScreen.title.style = {
    color: 'black',
    align: 'center',
    fillText: true,
    font: {
        name: 'Walibi',
        size: 40
    }
};


Config.gameScreen = {};
Config.gameScreen.lifesText = {};
Config.gameScreen.confirmButtonText = {};
Config.gameScreen.scoreText = {};
Config.gameScreen.title = {};
Config.gameScreen.levelText = {};
Config.gameScreen.lifesText.text = 'X';
Config.gameScreen.lifesText.position = {x: Config.canvas.width - 75, y: 20};
Config.gameScreen.lifesText.style = {
    color: 'black',
    fillText: true,
    font:
        {
            name: 'Walibi',
            size: 24
        }
};
Config.gameScreen.scoreText.text = '00000';
Config.gameScreen.scoreText.position = {x: Config.canvas.width / 2, y: 20};
Config.gameScreen.scoreText.style = {
    color: 'black',
    align: 'center',
    fillText: true,
    font:
        {
            name: 'Walibi',
            size: 18
        }
};

Config.gameScreen.levelText.text = 'Level 1';
Config.gameScreen.levelText.position = {x: 0, y: 20};
Config.gameScreen.levelText.style = {
    color: 'black',
    fillText: true,
    font:
        {
            name: 'Walibi',
            size: 18
        }
};

Config.gameOverScreen = {};
Config.gameOverScreen.subTitle = {};
Config.gameOverScreen.highScore = {};
Config.gameOverScreen.confirmButton = {};
Config.gameOverScreen.confirmButtonText = {};
Config.gameOverScreen.subTitle.text = 'Highscore';
Config.gameOverScreen.subTitle.position = {x: Config.canvas.width / 2, y: Config.canvas.height / 2 - 100};
Config.gameOverScreen.subTitle.style = {
    color: 'black',
    align: 'center',
    fillText: true,
    font:
        {
            name: 'Walibi',
            size: 32
        }
};
Config.gameOverScreen.highScore.position = {x: Config.canvas.width / 2, y: Config.canvas.height / 2};
Config.gameOverScreen.highScore.style = {
    color: 'green',
    align: 'center',
    fillText: true,
    font:
        {
            name: 'Walibi',
            size: 24
        }
};


Config.gameOverScreen.confirmButton.position = {
    x: 505 / 2 - 101 / 2,
    y: 606 / 2 + 171,
    width: 101,
    height: 42.75
};
Config.gameOverScreen.confirmButton.style = {
    fill: true,
    fillColor: 'green',
    shadowBlur: 10,
    shadowColor: 'black',
    hover: true
};

Config.gameOverScreen.confirmButtonText.text = 'Confirm';
Config.gameOverScreen.confirmButtonText.position = {
    x: Config.canvas.width / 2 - 101 / 2 + 101 / 2,
    y: Config.canvas.height / 2 + 171 / 1.5 + 171 / 2
};
Config.gameOverScreen.confirmButtonText.style = {
    color: 'white',
    align: 'center',
    fillText: true,
    font: {size: 24}
};
export default Config;