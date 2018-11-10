class Rat {
    constructor(name) {
        this.name = name;
        this.unitedRats = [];
    }

    unite(rat) {
        if (rat instanceof Rat) {
            this.unitedRats.push(rat);
        }
    }

    getRats() {
        return this.unitedRats;
    }

    toString() {
        let output = this.name;
        this.unitedRats.forEach(r => output += `\r\n##${r.name}`)
        return output;
    }
}