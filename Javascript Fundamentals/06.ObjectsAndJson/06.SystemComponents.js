function solve(array) {
    let systems = new Map();

    array.forEach(e => {
        const [system, component, subcomponent] = e.split(' | ');

        if (!systems.get(system)) {
            systems.set(system, new Map());
        }

        if (!systems.get(system).get(component)) {
            systems.get(system).set(component, new Set());
        }
        systems.get(system).get(component).add(subcomponent);
    });

    [...systems.entries()]
        .sort((a, b) => b[1].size - a[1].size ||
            a[0].toLowerCase().localeCompare(b[0].toLowerCase()))
        .forEach(s => {
            console.log(s[0]);
            [...s[1].entries()]
                .sort((a, b) => b[1].size - a[1].size)
                .forEach(c => {
                    console.log(`|||${c[0]}`);
                    [...c[1].entries()]
                        .forEach(sc => {
                            console.log(`||||||${sc[0]}`)
                        });
                });
        });
}

solve([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
]);