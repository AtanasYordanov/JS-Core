let assert = require('chai').assert;

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe('mathEnforcer', function () {
    describe('addFive', function () {
        it('with a non-number parameter, should return undefined', function () {
            assert.equal(mathEnforcer.addFive('string'), undefined);
        });
        it('with valid data, should return correct result', function () {
            assert.equal(mathEnforcer.addFive(3), 8);
        });
        it('with negative number, should return correct result', function () {
            assert.equal(mathEnforcer.addFive(-3), 2);
        });
        it('with float number, should return correct result', function () {
            assert.closeTo(mathEnforcer.addFive(1.2), 6.2, 0.1);
        });
    });
    describe('subtractTen', function () {
        it('with a non-number parameter, should return undefined', function () {
            assert.equal(mathEnforcer.subtractTen('string'), undefined);
        });
        it('with valid data, should return correct result', function () {
            assert.equal(mathEnforcer.subtractTen(12), 2);
        });
        it('with negative number, should return correct result', function () {
            assert.equal(mathEnforcer.subtractTen(-3), -13);
        });
        it('with float number, should return correct result', function () {
            assert.closeTo(mathEnforcer.subtractTen(12.2), 2.2, 0.1);
        });
    });
    describe('sum', function () {
        it('with a non-number parameter, should return undefined', function () {
            assert.equal(mathEnforcer.sum('string', 5), undefined);
        });
        it('with a non-number parameter, should return undefined', function () {
            assert.equal(mathEnforcer.sum(5, 'string'), undefined);
        });
        it('with valid data, should return correct result', function () {
            assert.equal(mathEnforcer.sum(3, 4), 7);
        });
        it('with negative numbers, should return correct result', function () {
            assert.equal(mathEnforcer.sum(-3, 2), -1);
        });
        it('with float number, should return correct result', function () {
            assert.closeTo(mathEnforcer.sum(3.2, 6.7), 9.9, 0.1);
        });
    });
});