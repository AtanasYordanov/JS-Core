function solve([num, precision]) {
    precision = precision > 15 ? 15 : precision;
    console.log(+num.toFixed(precision));
}

solve([3.1415926535897932384626433832795, 2]);