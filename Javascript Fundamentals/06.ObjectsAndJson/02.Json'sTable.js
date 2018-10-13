function solve(array) {
    let output = '<table>\n';

    array
        .map(e => JSON.parse(e))
        .forEach(p => {
            output += '\t<tr>\n';
            output += `\t\t<td>${p.name}</td>\n`;
            output += `\t\t<td>${p.position}</td>\n`;
            output += `\t\t<td>${p.salary}</td>\n`;
            output += '\t<tr>\n';
        });

    output += '</table>';
    console.log(output);
}

solve([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]);