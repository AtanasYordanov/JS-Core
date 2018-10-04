function solve([width, height, x, y]) {
    let matrix = [];
    for (let i = 0; i < height; i++) {
        matrix[i] = [];
    }

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let xDiff = Math.abs(x - row);
            let yDiff = Math.abs(y - col);
            matrix[row][col] = Math.max(xDiff, yDiff) + 1;
        }
    }
    matrix.forEach(row => console.log(row.join(' ')));
}

solve([5, 5, 2, 2]);