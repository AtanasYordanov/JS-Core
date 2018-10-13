function solve(array) {
    let heroes = [];

    array.forEach(e => {
            let [name, level, items] = e.split(/ \/ /);
            items = items ? items.split(/, /) : [];
            level = +level;
            let hero = {name, level, items};
            heroes.push(hero);
        }
    );

    console.log(JSON.stringify(heroes));
}

solve(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']
);