function solve(grads) {
    let degrees = grads * 0.9 % 360;
    if (degrees < 0) {
        degrees += 360;
    }
    console.log(degrees);
}

solve(850);