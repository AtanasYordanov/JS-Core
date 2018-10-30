function solve(array, order) {
    let sortingStrategy = order === 'asc'
        ? (a, b) => a - b
        : (a, b) => b - a;

    return array.sort(sortingStrategy);
}