function solve(array) {

    function inVolume(x, y, z) {
        const xMin = 10;
        const xMax = 50;
        const yMin = 20;
        const yMax = 80;
        const zMin = 15;
        const zMax = 50;

        return x >= xMin && x <= xMax && y >= yMin && y <= yMax && z >= zMin && z <= zMax;
    }

    for (let i = 0; i < array.length - 2; i += 3) {
        let isInside = inVolume(array[i], array[i + 1], array[i + 2]);
        console.log(isInside ? 'inside' : 'outside');
    }
}

solve([8, 20, 22]);