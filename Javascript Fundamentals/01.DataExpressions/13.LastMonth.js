function solve([day, month, year]) {
    let date = new Date(year, month - 1, 0);
    console.log(date.getDate());
}

solve([17, 3, 2002]);