function solve([v1, v2, t]) {
    let firstDistance = v1 / 3.6 * t;
    let secondDistance = v2 / 3.6 * t;
    let diff = Math.abs(firstDistance - secondDistance);
    console.log(diff);
}

solve([0, 60, 3600]);
solve([0, 60, 3600]);