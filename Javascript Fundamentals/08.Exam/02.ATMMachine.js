function solve(lines) {
    let atm = [];

    lines.forEach(array => {
        if (array.length > 2) {
            atm.push(...array);
            let moneyInserted = array.reduce((a, b) => a + b, 0);
            let total = atm.reduce((a, b) => a + b, 0);
            console.log(`Service Report: ${moneyInserted}$ inserted. Current balance: ${total}$.`);
        } else if (array.length === 2) {
            let balance = array[0];
            let withdrawMoney = array[1];
            let total = atm.reduce((a, b) => a + b, 0);

            if (balance < withdrawMoney) {
                console.log(`Not enough money in your account. Account balance: ${balance}$.`)
            } else if (total < withdrawMoney) {
                console.log('ATM machine is out of order!');
            } else {
                let collected = 0;
                atm
                    .filter(a => a <= withdrawMoney)
                    .sort((a, b) => b - a)
                    .forEach(b => {
                        if (collected + b <= withdrawMoney) {
                            collected += b;
                            atm.splice(atm.indexOf(b), 1);
                        }
                    });
                console.log(`You get ${withdrawMoney}$. Account balance: ${balance - withdrawMoney}$. Thank you!`);
            }
        } else {
            let banknoteType = array[0];
            let count = atm.filter(b => b === banknoteType).length;
            console.log(`Service Report: Banknotes from ${banknoteType}$: ${count}.`);
        }
    });
}

solve([
    [20, 5, 100, 20, 1],
    [457, 25],
    [1],
    [10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
    [20, 85],
    [5000, 4500],
]);