function solve() {

    const elements = ['Water', 'Fire', 'Earth', 'Air'];

    class Melon {
        constructor(weight, melonSort, element) {
            if (new.target === Melon) {
                throw new TypeError('Abstract class cannot be instantiated directly')
            }
            this.element = element;
            this.weight = weight;
            this.melonSort = melonSort;
            this._elementIndex = this.weight * this.melonSort.length;
        }

        get elementIndex() {
            return this._elementIndex;
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort, 'Water');
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort, 'Fire');
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort, 'Earth');
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort, 'Air');
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort, 'Water');
            this.currentElementIndex = 0;
        }

        morph() {
            super.element = elements[++this.currentElementIndex];
            this.currentElementIndex %= elements.length;
        }
    }

    return {Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon}
}