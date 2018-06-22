import Helper from './Helper';

class MapLoader {
    constructor(ctx, resource, position, tileHeight, tileWidth, spriteHeight, spriteWidth, tileData) {
        this.ctx = ctx;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.resource = resource;
        this.position = position;
        this.tileHeight = tileHeight;
        this.tileWidth = tileWidth;
        this.tileData = tileData;
        this.frames = [];
        this.buildTiles();
    }

    getTileFromPos(x, y) {
        return this.frames.filter(frame => (x > frame.position.x && x < frame.position.x + 101) && (y - 83 > frame.position.y && y - 83 < frame.position.y + 83));
    }

    getEntityAtTile(row, col) {
        if (this.frames.filter(frame => (frame.row === row && frame.col === col))[0].entities.length !== 0) {
            return this.frames.filter(frame => (frame.row === row && frame.col === col))[0];
        }
        return false;

    }

    addEntityToTile(row, col, entity) {
        this.frames.map(frame => {
            if (frame.row === row && frame.col === col) {
                frame.entities.push(entity);
            }
        });
    }

    getRandomEmptyTile(rowMin, rowMax, colMin, colMax) {
        let frame = this.frames.filter(frame => frame.entities.length === 0 && (frame.row >= rowMin && frame.row <= rowMax) && (frame.col >= colMin && frame.col <= colMax));
        let rand = Helper.randIntBetween(0, frame.length);
        if (frame.length === 1) {
            return {
                row: frame[0].row, col: frame[0].col
            };
        } else if (frame[0]) {
            return {
                row: frame[rand].row, col: frame[rand].col
            };
        }
        return false;
    }

    moveEntityToTile(row, col, entity) {
        this.frames.map(frame => {
            if (frame.row === row && frame.col === col) {
                let entities = frame.entities.filter(entity => {
                    return entity === entity;
                });
                if (entities.length === 0) {
                    frame.entities.push(entity);
                }
            }
        });
    }

    getTile(row, col) {
        return this.frames.filter(frame => {
            return (frame.row === row && frame.col === col);
        })[0];
    }

    render() {
        this.frames.forEach(tile => {
            this.ctx.drawImage(this.resource, tile.frame.x, tile.frame.y, this.tileWidth, this.spriteHeight, tile.position.x, tile.position.y, this.tileWidth, this.spriteHeight);
        });
    }

    buildTiles() {
        this.tileData.forEach((data, row) => {
            data.forEach((info, col) => {
                info--;

                this.frames.push({
                    entities: [],
                    row, col,
                    frame: {
                        x: this.tileWidth * info,
                        y: 0
                    },
                    position: {
                        x: this.tileWidth * col,
                        y: this.tileHeight * row
                    }
                });

            });
        });
    }

}

export default MapLoader;