function solve(array) {

    function locateTreasure(x, y) {
        let island;
        islands.filter(i => i.x1 <= x && i.x2 >= x && i.y1 <= y && i.y2 >= y)
            .forEach(i => island = i.name);
        return island !== undefined ? island : 'On the bottom of the ocean';
    }

    const islands = [
        {name: 'Tonga', x1: 0, y1: 6, x2: 2, y2: 8},
        {name: 'Tuvalu', x1: 1, y1: 1, x2: 3, y2: 3},
        {name: 'Cook', x1: 4, y1: 7, x2: 9, y2: 8},
        {name: 'Samoa', x1: 5, y1: 3, x2: 7, y2: 6},
        {name: 'Tokelau', x1: 8, y1: 0, x2: 9, y2: 1}
    ];

    for (let i = 0; i < array.length - 1; i += 2) {
        let x = array[i];
        let y = array[i + 1];
        let location = locateTreasure(x, y);
        console.log(location);
    }
}

solve([4, 2, 1.5, 6.5, 1, 3]);