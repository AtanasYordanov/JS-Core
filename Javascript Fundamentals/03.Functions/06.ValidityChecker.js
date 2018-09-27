function solve([x1, y1, x2, y2]) {

    function getDistance(x1, y1, x2, y2) {
        let a = Math.abs(x1 - x2);
        let b = Math.abs(y1 - y2);

        return Math.sqrt(a * a + b * b);
    }

    function getOutputString(d, x1, y1, x2, y2) {
        let output = `{${x1}, ${y1}} to {${x2}, ${y2}} is `;
        output += Number.isInteger(d) ? 'valid' : 'invalid';
        return output;
    }

    let d1 = getDistance(x1, y1, 0, 0);
    let d2 = getDistance(x2, y2, 0, 0);
    let d3 = getDistance(x1, y1, x2, y2);

    console.log(getOutputString(d1, x1, y1, 0, 0));
    console.log(getOutputString(d2, x2, y2, 0, 0));
    console.log(getOutputString(d3, x1, y1, x2, y2));
}

solve([2, 1, 1, 1]);