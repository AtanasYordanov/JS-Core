function solve(lines) {
    let countries = new Map();

    lines.forEach(line => {
        let [country, town, cost] = line.split(' > ');
        cost = +cost;
        town = town[0].toUpperCase() + town.substring(1);

        if (!countries.has(country)) {
            countries.set(country, new Map());
        }

        if (!countries.get(country).has(town) || countries.get(country).get(town) > cost) {
            countries.get(country).set(town, cost);
        }
    });

    [...countries.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(pair => {
            let towns = [...pair[1].entries()]
                .sort((a, b) => a[1] - b[1])
                .map(town => `${town[0]} -> ${town[1]}`)
                .join(' ');
            console.log(`${pair[0]} -> ${towns}`);
        });
}

solve([
    "Bulgaria > Sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > Tirana > 1000",
    "Bulgaria > Sofia > 200"
]);