function solve(array) {
    let delimiter = array[array.length - 1];
    array = array.slice(0, array.length - 1);
    console.log(array.join(delimiter));
}

solve(['One', 'Two', 'Three', 'Four', 'Five', '-']);