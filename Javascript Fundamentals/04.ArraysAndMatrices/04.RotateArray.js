function solve(array) {

    function rotateArray(skip) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            let index = i - skip;
            index = index < 0 ? array.length + index : index;
            newArray.push(array[index]);
        }
        return newArray;
    }

    let rotationsCount = +array[array.length - 1];
    array = array.slice(0, array.length - 1);
    let skip = rotationsCount % array.length;
    array = rotateArray(skip);
    console.log(array.join(' '));
}

solve(['1', '2', '3', '4', '2']);