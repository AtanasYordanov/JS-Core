class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.numberOfChildren = 0;
        this.kids = {};
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }
        if (this.kids[grade] && this.kids[grade].map(k => k.split('-')[0]).includes(`${name}`)) {
            return `${name} is already in the list for this ${this.destination} vacation.`;
        }
        if (!this.kids[grade]) {
            this.kids[grade] = [];
        }
        this.kids[grade].push(`${name}-${budget}`);
        this.numberOfChildren += 1;
        return this.kids[grade];
    }

    removeChild(name, grade) {
        if (!this.kids[grade]) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }
        let index = this.kids[grade].findIndex(k => k.split('-')[0] === name);
        if (index === -1) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }
        this.kids[grade].splice(index, 1);
        this.numberOfChildren -= 1;
        return this.kids[grade];
    }

    toString() {
        if (this.numberOfChildren === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        let output = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;

        Object.keys(this.kids)
            .sort((a, b) => a - b)
            .filter(grade => this.kids[grade].length > 0)
            .forEach(grade => {
                output += `Grade: ${grade}\n`;
                this.kids[grade]
                    .forEach((k, i) => output += `${i + 1}. ${k}\n`)
            });
        return output;
    }

    get numberOfChildren() {
        return this._numberOfChildren;
    }

    set numberOfChildren(value) {
        this._numberOfChildren = value;
    }
}
