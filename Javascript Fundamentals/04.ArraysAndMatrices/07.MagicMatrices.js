function solve(matrix) {
    function isMagical() {
        let sum = matrix[0].reduce((a, b) => a + b);

        for (let i = 1; i < matrix.length; i++) {
            let currentSum = matrix[i].reduce((a, b) => a + b);
            if (currentSum !== sum) {
                return false;
            }
        }

        for (let col = 0; col < matrix[0].length; col++) {
            let currentSum = 0;
            for (let row = 0; row < matrix.length; row++) {
                currentSum += matrix[row][col];
            }
            if (currentSum !== sum) {
                return false;
            }
        }
        return true;
    }

    console.log(isMagical());
}

solve([
        [4, 5, 6],
        [6, 5, 4],
        [5, 5, 5]
    ]
);