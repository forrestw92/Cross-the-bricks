class AssetLoader {
    constructor(resources) {
        this.resourceCache = {};
        this.readyCallbacks = [];
        this.load(resources);
    }

    load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(url => {
                this._load(url);
            });
        } else {
            this._load(urlOrArr);
        }
    }

    _load(url) {
        if (this.resourceCache[url]) {
            return this.resourceCache[url];
        } else {
            let img = new Image();
            let self = this;
            img.onload = function () {
                self.resourceCache[url] = img;
                if (self.isReady()) {
                    self.readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            };

            this.resourceCache[url] = false;
            img.src = url;
        }
    }

    get(url) {
        return this.resourceCache[url];
    }

    isReady() {
        let ready = true;
        for (let k in this.resourceCache) {
            if (this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    onReady(func) {
        if (func instanceof Array) {
            func.forEach(f => {
                this.readyCallbacks.push(f);
            });
        } else {
            this.readyCallbacks.push(func);
        }
    }

}

export default AssetLoader;