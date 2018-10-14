function solve([from, to, replacement, text]) {
    let countryRegex = /\b[A-Z][a-zA-Z]+[A-Z]\b/g;
    let numberRegex = /\d{3}(\.\d+)?/g;

    let match = text.match(countryRegex)[0];
    let stringToReplace = match.substring(+from, +to + 1);
    let country = match.replace(stringToReplace, replacement);
    country = country[0] + country.substring(1).toLowerCase();

    let city = text.match(numberRegex)
        .map(m => Math.ceil(m))
        .reduce((acc, cur) => acc + String.fromCharCode(cur), '');
    city = city[0].toUpperCase() + city.substring(1).toLowerCase();
    console.log(`${country} => ${city}`);
}

solve(["3", "5", "gar", "114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"]);