function solve([principalSum, interest, compoundingPeriod, timespan]) {
    let interestRate = interest / 100;
    let compoundingFrequency = 12 / compoundingPeriod;
    let total = principalSum * Math.pow(1 + interestRate / compoundingFrequency, compoundingFrequency * timespan);
    console.log(total);
}

solve([1500, 4.3, 3, 6]);