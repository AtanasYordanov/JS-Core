function solve(arrays) {
    let uniqueArrays = arrays
        .map(a => JSON.parse(a))
        .reduce((acc, cur) => {
            cur.sort((a, b) => b - a);
            return acc.set(`[${cur.join(', ')}]`, cur.length);
        }, new Map());
    [...uniqueArrays.entries()]
        .sort((a, b) => a[1] - b[1])
        .forEach(a => console.log(a[0]));
}

solve([
    "[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"
]);