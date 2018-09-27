function solve(num) {

    function getAverage(numAsString) {


        let digitsCount = numAsString.length;

        let total = 0;
        for (let i = 0; i < digitsCount; i++) {
            total += +numAsString[i];
        }
        return total / digitsCount;
    }

    let numAsString = num.toString();

    while (getAverage(numAsString) <= 5) {
        numAsString += '9';
    }

    console.log(numAsString);
}

solve(5835);