function solve(input, sortingCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = +price;
            this.status = status;
        }
    }

    return input
        .map(s => new Ticket(...s.split('|')))
        .sort((a, b) => a[sortingCriteria] > b[sortingCriteria]);
}