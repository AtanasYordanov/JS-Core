function solve(lines) {
    let teams = {};

    lines.forEach(line => {
        let [team, pilot, points] = line.split(' -> ');
        points = +points;
        if (!teams[team]) {
            teams[team] = {team};
            teams[team].pilots = [];
        }
        if (teams[team].pilots.some(p => p.pilot === pilot)) {
            let pilotObj = teams[team].pilots.find(p => p.pilot === pilot);
            pilotObj.points += points;
        } else {
            teams[team].pilots.push({pilot, points});
        }
    });

    Object.keys(teams)
        .sort((a, b) => {
            return teams[b].pilots.reduce((acc, cur) => acc + cur.points, 0)
                - teams[a].pilots.reduce((acc, cur) => acc + cur.points, 0)
        })
        .slice(0, 3)
        .forEach(team => {
            let totalPoints = teams[team].pilots.reduce((acc, cur) => acc + cur.points, 0);
            console.log(`${team}: ${totalPoints}`);
            teams[team].pilots
                .sort((a, b) => b.points - a.points)
                .forEach(pilot => console.log(`-- ${pilot.pilot} -> ${pilot.points}`))
        });
}

solve([
    'Ferrari -> Kimi Raikonnen -> 25',
    'Ferrari -> Sebastian Vettel -> 18',
    'Mercedes -> Lewis Hamilton -> 10',
    'Mercedes -> Valteri Bottas -> 8',
    'Red Bull -> Max Verstapen -> 6',
    'Red Bull -> Daniel Ricciardo -> 4',
    'Mercedes -> Lewis Hamilton -> 25',
    'Mercedes -> Valteri Bottas -> 18',
    'Haas -> Romain Grosjean -> 25',
    'Haas -> Kevin Magnussen -> 25'
]);