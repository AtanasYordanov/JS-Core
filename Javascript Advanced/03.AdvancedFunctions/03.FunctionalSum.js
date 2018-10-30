function solve(num) {
    let sum = num;

    function add(num) {
        sum += num;
        return add;
    }

    add.toString = function () {
        return sum;
    };

    return add;
}