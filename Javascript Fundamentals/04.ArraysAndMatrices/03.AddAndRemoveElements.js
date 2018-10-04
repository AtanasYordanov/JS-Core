function solve(commands) {
    let array = [];
    let number = 1;

    commands.forEach(c => {
        if (c === 'add') {
            array.push(number++);
        } else if (c === 'remove') {
            array.pop();
            number++;
        }
    });
    console.log(array.length === 0 ? 'Empty' : array.join('\n'));
}

solve(['add', 'add', 'remove', 'add', 'add']);