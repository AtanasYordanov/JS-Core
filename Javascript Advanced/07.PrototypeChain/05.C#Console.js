let assert = require('chai').assert;

class Console {

    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
                return message;
            }
            else if (typeof(message) === 'string') {
                return message;
            }
        }
        else {
            if (typeof (message) !== 'string') {
                throw new TypeError('No string format given!');
            }
            else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError('Incorrect amount of parameters given!');
                }
                else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError('Incorrect placeholders given!');
                        }
                        else {
                            message = message.replace(tokens[i], arguments[i + 1]);
                        }
                    }
                    return message;
                }
            }
        }
    }
}

describe('C# Console ', () => {
    it('when passed a string, should return it', () => {
        assert.equal(Console.writeLine('str'), 'str');
    });
    it('when passed a string, should return its json representation', () => {
        const testObj = {name: 'name', num: 8};
        assert.equal(Console.writeLine(testObj), JSON.stringify(testObj));
    });
    it('when message is not a string, should throw TypeError', () => {
        assert.throws(() => Console.writeLine(0, ''), TypeError);
    });
    it('when passed less parameters, should throw RangeError', () => {
        assert.throws(() => Console.writeLine('{0} {1} {2}', 0, 1), RangeError);
    });
    it('when passed more parameters, should throw RangeError', () => {
        assert.throws(() => Console.writeLine('{0} {1} {2}', 0, 1, 2, 3), RangeError);
    });
    it('when passed incorrect placeholders, should throw RangeError', () => {
        assert.throws(() => Console.writeLine('{1} {2}', 0, 1), RangeError);
    });
    it('when passes too large number, should throw erro', () => {
        assert.throws(() => Console.writeLine('{50}', 1), RangeError);
    });
    it('when passed valid data, should return correct result', () => {
        assert.equal(Console.writeLine('{0} {1}', 0, 1), '0 1');
    });
});