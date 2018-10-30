function solve(num1, num2) {

    let max = Math.max(num1, num2);
    let min = Math.min(num1, num2);
    let remainder = min;

    while (true) {
        for (let i = 1; i < max / min + 1; i++) {
            let result = min * i;
            if (result === max) {
                return remainder;
            }
            if (result > max) {
                remainder = max - (min * (i - 1));
                max = min;
                min = remainder;
                break;
            }
        }
    }
}

console.log(solve(252, 105));