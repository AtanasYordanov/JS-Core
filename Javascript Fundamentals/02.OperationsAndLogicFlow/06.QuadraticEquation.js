function solve(a, b, c) {
    let discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
        let firstSolution = (-b + Math.sqrt(discriminant)) / (2 * a);
        let secondSolution = (-b - Math.sqrt(discriminant)) / (2 * a);
        console.log(Math.min(firstSolution, secondSolution));
        console.log(Math.max(firstSolution, secondSolution));
    } else if (discriminant === 0) {
        let solution = -b / (2 * a);
        console.log(solution);
    } else {
        console.log('No');
    }
}

solve([6, 11, -35]);