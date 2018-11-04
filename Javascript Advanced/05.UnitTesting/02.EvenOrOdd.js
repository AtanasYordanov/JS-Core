let assert = require('chai').assert;

function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe('isOddOrEven', function () {
    it('with a number parameter, should return undefined', function () {
        assert.equal(isOddOrEven(5), undefined);
    });
    it('with a string having odd number of characters, should return odd', function () {
        assert.equal(isOddOrEven('odd'), 'odd');
    });
    it('with a string having even number of characters, should return even', function () {
        assert.equal(isOddOrEven('even'), 'even');
    });
});

