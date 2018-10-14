function solve(input) {
    let delimiter = input[1];
    let companies = input[0].split(delimiter);

    let valid = [];
    let invalid = [];

    input.slice(2)
        .forEach(line => {
            line = line.toLowerCase();
            let count = companies.filter(c => line.includes(c.trim())).length;
            if (count === companies.length) {
                valid.push(line);
            } else {
                invalid.push(line);
            }
        });

    if (valid.length) {
        console.log('ValidSentences');
        valid.forEach((s, i) => console.log(`${i + 1}. ${s}`));
        if (invalid.length) {
            console.log('='.repeat(30));
        }
    }
    if (invalid.length) {
        console.log('InvalidSentences');
        invalid.forEach((s, i) => console.log(`${i + 1}. ${s}`));
    }
}

solve([
    "bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho  e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "We will koftipochivkaLTD travel e expenses no MinkaTrans mu e BulgariaTour",
    "dqdo BuLGariaTOUR mraz some text but is KoftiPochivkaLTD minkaTRANS"
]);