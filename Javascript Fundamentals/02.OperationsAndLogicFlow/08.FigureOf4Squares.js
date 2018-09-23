function solve(n) {
    if (n === 2) {
        console.log('+++');
        return;
    }

    let base = buildLine('+', '-');
    let filler = buildLine('|', ' ');

    let fillersCount = Math.floor((n - 3) / 2);

    console.log(base);
    for (let i = 0; i < fillersCount; i++) {
        console.log(filler);
    }
    console.log(base);
    for (let i = 0; i <fillersCount; i++) {
        console.log(filler);
    }
    console.log(base);

    function buildLine(s1, s2) {
        let line = s1;
        for (let i = 0; i < n - 2; i++) {
            line += s2;
        }
        line += s1;
        for (let i = 0; i < n - 2; i++) {
            line += s2;
        }
        line += s1;
        return line;
    }
}

solve(2);
solve(6);