function solve(lines) {
    let genes = new Map();
    let regex = /^([a-zA-Z!@#$?]+)=(\d+)--(\d+)<<([a-zA-Z]+)$/g;

    lines.forEach(line => {
        let matches = line.match(regex) || undefined;
        if (matches) {
            let [name, length, genesCount, organism] = matches[0].split(/=|--|<</g);
            name = name.replace(/[!@#$?]+/g, '');
            if (name.length === +length) {
                if (!genes.has(organism)) {
                    genes.set(organism, 0);
                }
                genes.set(organism, genes.get(organism) + +genesCount);
            }
        }
    });

    [...genes.entries()]
        .sort((a, b) => b[1] - a[1])
        .forEach(pair => {
            console.log(`${pair[0]} has genome size of ${pair[1]}`);
        });
}

solve([
    '!@ab?si?di!a@=7--152<<human',
    'b!etu?la@=6--321<<dog',
    '!curtob@acter##ium$=14--230<<dog',
    '!some@thin@g##=9<<human',
    'Stop!'
]);