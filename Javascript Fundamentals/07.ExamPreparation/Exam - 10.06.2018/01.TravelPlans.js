function solve(lines) {
    let specialized = ['Programming', 'Hardware maintenance', 'Cooking', 'Translating', 'Designing'];
    let clumsy = ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting', 'Writing', 'Lecturing', 'Modeling', 'Nursing'];

    let specializedCount = 0;
    let clumsyCount = 0;

    let totalGold = 0;

    lines
        .forEach(line => {
            let [profession, gold] = line.split(' : ');
            gold = +gold;
            if (specialized.includes(profession)) {
                if (gold >= 200) {
                    gold *= 0.8;
                    gold += ++specializedCount % 2 === 0 ? 200 : 0;
                } else {
                    gold = 0;
                }
            } else if (clumsy.includes(profession)) {
                if (++clumsyCount % 2 === 0) {
                    gold *= 0.95;
                } else if (clumsyCount % 3 === 0) {
                    gold *= 0.90;
                }
            }
            totalGold += gold;
        });

    console.log(`Final sum: ${totalGold.toFixed(2)}`);
    let diff = Math.abs(totalGold - 1000).toFixed(2);
    if (totalGold >= 1000) {
        console.log(`Mariyka earned ${diff} gold more.`);
    } else {
        console.log(`Mariyka need to earn ${diff} gold more to continue in the next task.`);
    }
}

solve(["Programming : 500", "Driving : 243.55", "Acting : 200", "Singing : 100", "Cooking : 199"
    , "Hardware maintenance : 800", "Gardening : 700", "Programming : 500"]);