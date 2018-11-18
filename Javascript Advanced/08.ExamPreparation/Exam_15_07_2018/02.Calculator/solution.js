const assert = require('chai').assert;
const Calculator = require('./calculator');

describe('Holiday Package', function () {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('add, when called, should add data to expenses', function () {
        calculator.add("5");
        assert.equal(calculator.expenses.length, 1);
    });

    it('to String, when empty, should return appropriate message', function () {
        assert.equal(calculator.toString(), 'empty array');
    });

    it('to String, when not empty, should return correct result', function () {
        calculator.add("5");
        calculator.add("8");
        calculator.add("9");
        assert.equal(calculator.toString(), '5 -> 8 -> 9');
    });

    it('diviceNums, when no numbers, should return appropriate exception', function () {
        calculator.add("5");
        calculator.add("8");
        assert.throws(() => calculator.divideNums(),
            Error, 'There are no numbers in the array!');
    });

    it('divideNums, when zero is present, should return appropriate message', function () {
        calculator.add(8);
        calculator.add(0);
        assert.equal(calculator.divideNums(), 'Cannot divide by zero');
    });

    it('divideNums, valid data, should update expenses', function () {
        calculator.add(8);
        calculator.add(2);
        calculator.add(2);
        calculator.divideNums();
        assert.equal(calculator.expenses.length, 1);
        assert.equal(calculator.toString(), "2");
    });

    it('divideNums, valid data, should return correct value', function () {
        calculator.add(8);
        calculator.add(2);
        calculator.add(2);
        assert.equal(calculator.divideNums(), 2);
    });

    it('orderBy, when empty, should return appropriate message', function () {
        assert.equal(calculator.orderBy(), 'empty');
    });

    it('orderBy, when only numbers, should sort correctly', function () {
        calculator.add(5);
        calculator.add(19);
        calculator.add(2);
        assert.equal(calculator.orderBy(), '2, 5, 19');
    });

    it('orderBy, when string are present, should sort correctly', function () {
        calculator.add(5);
        calculator.add("19");
        calculator.add(2);
        assert.equal(calculator.orderBy(), '19, 2, 5');
    });
});