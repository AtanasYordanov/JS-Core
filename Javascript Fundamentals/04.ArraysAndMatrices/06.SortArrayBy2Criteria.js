function solve(array) {

    array.sort((a, b) => {
        let comp = a.length - b.length;

        if (comp !== 0) {
            return comp;
        }

        return a > b;
    }).forEach(a => console.log(a));
}

solve(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']);