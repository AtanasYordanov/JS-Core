function solve(rows) {

    let symbols = ['A', 'T', 'C', 'G', 'T', 'T', 'A', 'G', 'G', 'G'];
    let index = 0;

    for (let i = 0; i < rows; i++) {

        let line = i % 4;

        if (line === 0) {
            console.log(`**${symbols[index++]}${symbols[index++]}**`);
        } else if (line === 1 || line === 3) {
            console.log(`*${symbols[index++]}--${symbols[index++]}*`);
        } else {
            console.log(`${symbols[index++]}----${symbols[index++]}`);
        }
        index = index % symbols.length;
    }
}

solve(10);