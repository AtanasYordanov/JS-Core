class Extensible {
    constructor() {
        this.id = Extensible.incrementId();
    }

    static incrementId() {
        if (!this._id) {
            this._id = 0;
        }
        return this._id++;
    }

    extend(template) {
        Object.keys(template).forEach(key => {
            const property = template[key];
            if (typeof(property) === 'function') {
                Object.getPrototypeOf(this)[key] = template[key];
            } else {
                this[key] = template[key]
            }
        });
    }
}

let obj1 = new Extensible();
let obj2 = new Extensible();
let obj3 = new Extensible();
console.log(obj1.id);
console.log(obj2.id);
console.log(obj3.id);

