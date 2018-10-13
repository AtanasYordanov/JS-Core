function solve(array) {
    let products = new Map();
    array.map(e => {
        const [name, price] = e.split(' : ');
        return {name, price};
    }).forEach(p => {
        products.set(p.name, p.price);
    });

    let currentLetter = null;
    [...products.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(p => {
            const letter = p[0][0];
            if (currentLetter !== letter) {
                currentLetter = letter;
                console.log(letter);
            }
            console.log(`  ${p[0]}: ${p[1]}`);
        });
}

solve([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);
