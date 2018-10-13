function solve(fruits) {
    let cherryWeight = 0;
    let peachWeight = 0;
    let plumWeight = 0;
    let bucketWeight = 0;

    fruits.forEach(f => {
        let [fruit, weight] = f.split(/\s+/);
        weight = +weight;
        if (fruit === 'cherry') {
            cherryWeight += weight * 1000;
        } else if (fruit === 'peach') {
            peachWeight += weight * 1000;
        } else if (fruit === 'plum') {
            plumWeight += weight * 1000;
        } else {
            bucketWeight += weight;
        }
    });

    let cherryKompots = Math.floor((cherryWeight / 9) / 25);
    let peachKompots = Math.floor((peachWeight / 140) / 2.5);
    let plumKompots = Math.floor((plumWeight / 20) / 10);
    let rakiyaLiters = bucketWeight * 0.2;

    console.log(`Cherry kompots: ${cherryKompots}`);
    console.log(`Peach kompots: ${peachKompots}`);
    console.log(`Plum kompots: ${plumKompots}`);
    console.log(`Rakiya liters: ${rakiyaLiters.toFixed(2)}`);
}

solve([
    'cherry 1.2',
    'peach 2.2',
    'plum 5.2',
    'peach 0.1',
    'cherry 0.2',
    'cherry 5.0',
    'plum 10',
    'cherry 20.0',
    'papaya 20'
]);