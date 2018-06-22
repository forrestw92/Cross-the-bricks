let Helper = {
    clamp(num, min, max) {
        if (min === undefined || max === undefined) {
            return num;
        }
        return (num > max) ? max : (num < min) ? min : num;
    },
    randIntBetween(min = 1, max = 100) {
        return Math.floor(Math.random() * max + min);
    },
    randFloatBetween(min = 1, max = 100) {
        return Math.random() * max + min;
    },
    randFromArray(array) {
        if (array instanceof Array) {
            return array[this.randIntBetween(0, array.length)];
        } else {
            return false;
        }
    },
    collisionDetection(a, b) {
        return a.boundingBox.left <= b.boundingBox.right && a.boundingBox.right >= b.boundingBox.left && a.boundingBox.top <= b.boundingBox.bottom && a.boundingBox.bottom >= b.boundingBox.top;
    },
    distributeBetween(min, max, wanted) {
        let dis = [];
        for (let i = min; i <= wanted; i++) {
            dis.push(i % max + 1);
        }
        return dis;
    },
    numberLength(num) {
        if (num !== undefined) {
            return (num).toString().length;
        }
    }
};
export default Helper;