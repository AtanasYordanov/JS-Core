let assert = require('chai').assert;

function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

describe('lookupChar', function () {
    it('with a number parameter, should return undefined', function () {
        assert.equal(lookupChar(5, 1), undefined);
    });
    it('with a float index parameter, should return undefined', function () {
        assert.equal(lookupChar('valid', 1.23), undefined);
    });
    it('with index less than 0, should return Incorrect index', function () {
        assert.equal(lookupChar('valid', -1), 'Incorrect index');
    });
    it('with index larger than string length, should return Incorrect index', function () {
        assert.equal(lookupChar('valid', 8), 'Incorrect index');
    });
    it('with valid data, should return correct char', function () {
        assert.equal(lookupChar('valid', 2), 'l');
    });
});