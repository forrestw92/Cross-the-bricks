import Engine from './Engine/Engine';
import GameScreen from './Game/Screens/GameScreen';
import InputHandle from './Engine/InputHandle';
import PlayerPickerScreen from './Game/Screens/PlayerPickerScreen';
import MouseHandle from './Engine/MouseHandle';
import Config from './Game/Config';
import GameOverScreen from './Game/Screens/GameOverScreen';


let engine = new Engine(505, 606, Config.resources);
let keyInput = new InputHandle();
let mouseInput = new MouseHandle(engine.canvas);

function PlayerPicker() {

    engine.branches.push(new PlayerPickerScreen(engine, mouseInput, Game));
    if (!engine.running) {
        engine.run();
    }
}

function Game() {
    engine.branches = [];
    engine.branches.push(new GameScreen(engine, mouseInput, keyInput, this.onClick.pickedFrame, GameOver));
}

function GameOver() {
    engine.branches = [];
    engine.branches.push(new GameOverScreen(engine, mouseInput, this.player.score, PlayerPicker));
}

engine.resources.onReady(PlayerPicker);
