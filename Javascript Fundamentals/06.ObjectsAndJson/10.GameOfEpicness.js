function solve(data, battles) {
    let kingdoms = new Map();
    let generalWins = new Map();
    let generalLosses = new Map();

    data.forEach(k => {
        if (!kingdoms.get(k.kingdom)) {
            kingdoms.set(k.kingdom, new Map());
        }
        if (!kingdoms.get(k.kingdom).get(k.general)) {
            kingdoms.get(k.kingdom).set(k.general, 0);
        }
        let current = kingdoms.get(k.kingdom).get(k.general);
        kingdoms.get(k.kingdom).set(k.general, current + k.army);
        generalWins.set(k.kingdom + k.general, 0);
        generalLosses.set(k.kingdom + k.general, 0);
    });

    battles.forEach(b => {
        const [firstKingdom, firstGeneral, secondKingdom, secondGeneral] = b;

        let firstArmy = kingdoms.get(firstKingdom).get(firstGeneral);
        let secondArmy = kingdoms.get(secondKingdom).get(secondGeneral);

        if (firstKingdom !== secondKingdom) {
            if (firstArmy > secondArmy) {
                kingdoms.get(firstKingdom).set(firstGeneral, Math.floor(firstArmy * 1.1));
                kingdoms.get(secondKingdom).set(secondGeneral, Math.floor(secondArmy * 0.9));
                generalWins.set(firstKingdom + firstGeneral, generalWins.get(firstKingdom + firstGeneral) + 1);
                generalLosses.set(secondKingdom + secondGeneral, generalLosses.get(secondKingdom + secondGeneral) + 1);
            } else if (secondArmy > firstArmy) {
                kingdoms.get(firstKingdom).set(firstGeneral, Math.floor(firstArmy * 0.9));
                kingdoms.get(secondKingdom).set(secondGeneral, Math.floor(secondArmy * 1.1));
                generalWins.set(secondKingdom + secondGeneral, generalWins.get(secondKingdom + secondGeneral) + 1);
                generalLosses.set(firstKingdom + firstGeneral, generalLosses.get(firstKingdom + firstGeneral) + 1);
            }
        }
    });
    let winner = [...kingdoms.entries()]
        .sort((a, b) => {
            let firstWins = [...a[1].keys()].reduce((acc, cur) => acc + generalWins.get(a[0] + cur), 0);
            let secondWins = [...b[1].keys()].reduce((acc, cur) => acc + generalWins.get(b[0] + cur), 0);

            let firstLosses = [...a[1].keys()].reduce((acc, cur) => acc + generalLosses.get(a[0] + cur), 0);
            let secondLosses = [...b[1].keys()].reduce((acc, cur) => acc + generalLosses.get(b[0] + cur), 0);

            return secondWins - firstWins || firstLosses - secondLosses || a[0].localeCompare(b[0]);
        })[0];

    console.log(`Winner: ${winner[0]}`);
    [...winner[1].entries()]
        .sort((a, b) => b[1] - a[1])
        .forEach(g => {
            console.log(`/\\general: ${g[0]}`);
            console.log(`---army: ${g[1]}`);
            console.log(`---wins: ${generalWins.get(winner[0] + g[0])}`);
            console.log(`---losses: ${generalLosses.get(winner[0] + g[0])}`);
        });

}

solve(
    [{kingdom: "Maiden Way", general: "Merek", army: 5000},
        {kingdom: "Stonegate", general: "Ulric", army: 4900},
        {kingdom: "Stonegate", general: "Doran", army: 70000},
        {kingdom: "YorkenShire", general: "Quinn", army: 0},
        {kingdom: "YorkenShire", general: "Quinn", army: 2000},
        {kingdom: "Maiden Way", general: "Berinon", army: 100000}],
    [["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"]]
);