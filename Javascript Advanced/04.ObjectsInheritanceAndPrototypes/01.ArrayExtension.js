(function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    Array.prototype.skip = function (count) {
        return this.slice(count);
    };

    Array.prototype.take = function (count) {
        return this.slice(0, count);
    };

    Array.prototype.sum = function () {
        return this.reduce((a, b) => a + b, 0);
    };

    Array.prototype.average = function () {
        return this.reduce((a, b) => a + b, 0) / this.length;
    };
})();

let arr = [1, 2, 3, 4, 5];
console.log(arr.average());