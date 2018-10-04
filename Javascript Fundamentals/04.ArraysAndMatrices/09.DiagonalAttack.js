function solve(array) {
    let matrix = [];
    let length = array.length;
    for (let i = 0; i < length; i++) {
        matrix[i] = array[i].split(' ').map(e => +e);
    }
    let firstDiagonalSum = 0;
    let secondDiagonalSum = 0;
    for (let i = 0; i < length; i++) {
        firstDiagonalSum += matrix[i][i];
        secondDiagonalSum += matrix[i][length - 1 - i];
    }

    if (firstDiagonalSum === secondDiagonalSum) {
        for (let row = 0; row < length; row++) {
            for (let col = 0; col < length; col++) {
                if (row !== col && row + col !== length - 1) {
                    matrix[row][col] = firstDiagonalSum;
                }
            }
        }
    }
    matrix.forEach(row => console.log(row.join(' ')));
}

solve([
    '5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1'
]);