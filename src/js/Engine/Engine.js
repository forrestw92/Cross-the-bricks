import Canvas from './Canvas';
import AssetLoader from './AssetLoader';

class Engine extends Canvas {
    constructor(width, height, resources) {
        super(width, height);
        this.running = false;
        this.branches = [];
        this.resources = new AssetLoader(resources);
    }


    run() {
        let lastTime = 0;
        const update = (ms) => {
            let now = ms / 1000;
            let dt = now - lastTime;
            this.update(dt, now);
            lastTime = now;
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        this.running = true;
    }

    update(dt, t) {
        const updateBranch = (branch) => {
            branch.forEach(leaves => {
                if (leaves instanceof Array) {
                    updateBranch(leaves);
                    return;
                }
                if (leaves.hide) {
                    return;
                }
                if (leaves.remove) {
                    leaves = '';
                }
                if (leaves.update) {
                    leaves.update(dt, t);
                }
                if (leaves.render) {
                    leaves.render();
                }
                if (leaves.leaves) {
                    updateBranch(leaves.leaves);
                }
            });
        };
        updateBranch(this.branches);
    }

}

export default Engine;
