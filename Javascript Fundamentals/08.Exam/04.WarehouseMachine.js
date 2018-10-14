function solve(lines) {
    let coffees = new Map();

    lines.forEach(line => {
        let [command, brand, name, date, quantity] = line.split(', ');

        switch (command) {
            case "IN":
                if (!coffees.has(brand)) {
                    coffees.set(brand, new Map());
                }
                if (coffees.get(brand).has(name)) {
                    let coffee = coffees.get(brand).get(name);
                    if (coffee.date < date) {
                        coffees.get(brand).set(name, {name, date, quantity});
                    } else if (coffees.get(brand).get(name).date === date) {
                        coffee.quantity += quantity;
                    }
                } else {
                    coffees.get(brand).set(name, {name, date, quantity});
                }
                break;
            case "OUT":
                if (coffees.has(brand) && coffees.get(brand).has(name)) {
                    let coffee = coffees.get(brand).get(name);
                    if (coffee.date > date) {
                        coffee.quantity -= quantity;
                    }
                }
                break;
            case "REPORT":
                console.log('>>>>> REPORT! <<<<<');
                [...coffees.entries()]
                    .forEach(pair => {
                        console.log(`Brand: ${pair[0]}:`);
                        [...pair[1].values()]
                            .forEach(c => {
                                console.log(`-> ${c.name} -> ${c.date} -> ${c.quantity}.`);
                            });
                    });
                break;
            case "INSPECTION":
                console.log('>>>>> INSPECTION! <<<<<');
                [...coffees.entries()]
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .forEach(pair => {
                        console.log(`Brand: ${pair[0]}:`);
                        [...pair[1].values()]
                            .sort((a, b) => b.quantity - a.quantity)
                            .forEach(c => {
                                console.log(`-> ${c.name} -> ${c.date} -> ${c.quantity}.`);
                            });
                    });
                break;
        }
    });
}

solve([
    "IN, Batdorf & Bronson, Espresso, 2025-05-25, 20",
    "IN, Folgers, Black Silk, 2023-03-01, 14",
    "IN, Lavazza, Crema e Gusto, 2023-05-01, 5",
    "IN, Lavazza, Crema e Gusto, 2023-05-02, 5",
    "IN, Folgers, Black Silk, 2022-01-01, 10",
    "IN, Lavazza, Intenso, 2022-07-19, 20",
    "OUT, Dallmayr, Espresso, 2022-07-19, 5",
    "OUT, Dallmayr, Crema, 2022-07-19, 5",
    "OUT, Lavazza, Crema e Gusto, 2020-01-28, 2",
    "REPORT",
    "INSPECTION",
]);