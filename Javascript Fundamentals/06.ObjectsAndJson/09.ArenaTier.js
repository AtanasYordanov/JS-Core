function solve(array) {
    let gladiators = new Map();

    array
        .map(e => e.split(' -> '))
        .forEach(g => {
            if (g.length === 3) {
                let [name, skill, technique] = g;
                technique = +technique;
                if (!gladiators.get(name)) {
                    gladiators.set(name, new Map());
                }
                if (!gladiators.get(name).get(skill) || gladiators.get(name).get(skill) < technique) {
                    gladiators.get(name).set(skill, technique);
                }
            } else {
                let fighters = g[0].split(' vs ');
                let firstGladiator = gladiators.get(fighters[0]);
                let secondGladiator = gladiators.get(fighters[1]);

                if (firstGladiator && secondGladiator &&
                    [...firstGladiator.entries()].some(s => secondGladiator.get(s[0]))) {
                    let firstTotalSkill = [...firstGladiator.entries()].map(a => a[1]).reduce((a, b) => a + b);
                    let secondTotalSkill = [...secondGladiator.entries()].map(a => a[1]).reduce((a, b) => a + b);

                    if (firstTotalSkill > secondTotalSkill) {
                        gladiators.delete(fighters[1]);
                    } else {
                        gladiators.delete(fighters[0]);
                    }
                }
            }
        });
    [...gladiators.entries()]
        .sort((a, b) => {
            return [...b[1].values()].reduce((acc, cur) => acc + cur) -
                [...a[1].values()].reduce((acc, cur) => acc + cur)
                || a[0].localeCompare(b[0])
        })
        .forEach(g => {
            let totalSkill = [...g[1].values()].reduce((acc, cur) => acc + cur);
            console.log(`${g[0]}: ${totalSkill} skill`);
            [...g[1].entries()]
                .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
                .forEach(s => console.log(`- ${s[0]} <!> ${s[1]}`));
        });
}

solve([
    'Pesho -> Duck -> 400',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Pesho vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Gosho'
]);