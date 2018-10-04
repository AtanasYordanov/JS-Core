function solve(array) {
    let step = +array[array.length - 1];

    for (let i = 0; i < array.length - 1; i += step) {
        console.log(array[i]);
    }
}

solve(['5', '20', '31', '4', '20', '2']);