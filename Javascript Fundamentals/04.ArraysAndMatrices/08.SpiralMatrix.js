function solve(rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
    }
    let value = 1;
    let step = 0;

    while (step < rows) {
        for (let i = step; i < cols - step; i++) {
            matrix[step][i] = value++;
        }
        for (let i = step + 1; i < rows - 1 - step; i++) {
            matrix[i][cols - 1 - step] = value++;
        }
        if (value > rows * cols) {
            break;
        }
        for (let i = cols - 1 - step; i >= step; i--) {
            matrix[rows - 1 - step][i] = value++;
        }
        for (let i = rows - 2 - step; i > step; i--) {
            matrix[i][step] = value++;
        }
        step++;
    }

    matrix.forEach(row => console.log(row.join(' ')));
}

solve(5, 5);