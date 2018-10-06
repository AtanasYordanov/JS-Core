function solve(str) {
    let output = str.split(' ')
        .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');
    console.log(output);
}

solve('Capitalize these words');