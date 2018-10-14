function solve(lines) {
    let totalIncome = 0;

    lines.forEach(line => {
        let data = line.split(', ');
        let moneyInserted = +data[0];
        let type = data[1];
        let sugar = +data[data.length - 1];

        let cost = type === 'coffee' && data[2] === 'caffeine' ? 0.9 : 0.8;

        if (data.length >= 4 && data[3] === 'milk' || data[2] === 'milk') {
            cost += +(cost * 0.1).toFixed(1);
        }

        if (sugar > 0) {
            cost += 0.1;
        }

        let diff = Math.abs(moneyInserted - cost).toFixed(2);
        if (moneyInserted >= cost) {
            totalIncome += cost;
            console.log(`You ordered ${type}. Price: ${cost.toFixed(2)}$ Change: ${diff}$`);
        } else {
            console.log(`Not enough money for ${type}. Need ${diff}$ more.`);
        }
    });

    console.log(`Income Report: ${totalIncome.toFixed(2)}$`)
}

solve([
    '1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2',
    '1.00, coffee, decaf, 0'
]);