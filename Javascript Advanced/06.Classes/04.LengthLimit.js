class Stringer {
    constructor(innerString, innerLength) {
        this.innerString = innerString;
        this.innerLength = +innerLength;
    }

    increase(length) {
        this.innerLength += +length;
    }

    decrease(length) {
        this.innerLength -= +length;
        this.innerLength = Math.max(this.innerLength, 0);
    }

    toString() {
        if (this.innerLength < this.innerString.length) {
            return this.innerString.substr(0, this.innerLength) + '...';
        }
        return this.innerString;
    }
}