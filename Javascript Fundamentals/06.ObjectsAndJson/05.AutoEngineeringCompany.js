function solve(array) {
    let cars = new Map();
    array.forEach(c => {
        const [brand, model, amount] = c.split(' | ');

        if (!cars.get(brand)) {
            cars.set(brand, new Map());
        }
        if (!cars.get(brand).get(model)) {
            cars.get(brand).set(model, 0);
        }
        cars.get(brand).set(model, cars.get(brand).get(model) + +amount);
    });

    [...cars.entries()]
        .forEach(b => {
            console.log(b[0]);
            [...cars.get(b[0]).entries()]
                .forEach(c => {
                    console.log(`###${c[0]} -> ${c[1]}`)
                });
        });
}

solve([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]);