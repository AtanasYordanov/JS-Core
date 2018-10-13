function solve(array) {
    let juices = new Map();
    let bottles = new Set();
    array
        .map(e => e.split(' => '))
        .forEach(([juice, quantity]) => {
            quantity = +quantity;
            quantity += juices.get(juice) || 0;
            juices.set(juice, quantity);
            if (juices.get(juice) >= 1000) {
                bottles.add(juice);
            }
        });
    [...bottles.keys()]
        .forEach(b => console.log(`${b} => ${Math.floor(juices.get(b) / 1000)}`));
}

solve([
    'Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789'
]);