function solve(array) {
    let largestElement = -Infinity;

    array.filter(e => {
            if (e < largestElement) {
                return false;
            }
            largestElement = e;
            return true;
        }
    ).forEach(e => console.log(e));
}

solve([1, 3, 8, 4, 10, 12, 3, 2, 24]);