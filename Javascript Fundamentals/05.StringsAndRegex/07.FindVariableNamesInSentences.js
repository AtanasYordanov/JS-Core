function solve(input) {
    let regex = /\b_([a-zA-Z0-9]+\b)/g;
    let matches = [];
    for (let match = regex.exec(input); match; match = regex.exec(input)) {
        matches.push(match[1]);
    }
    console.log(matches.join());
}

solve('The _id and _age variables are both integers.');