function solve(input) {
    let regex = /[0-9]+/g
    let str = input.join();
    let matches = regex.exec(str);
    console.log(matches.join(' '));
}

solve([
    'The300',
    'What is that?',
    'I think it’s the 3rd movie.',
    'Lets watch it at 22:45']
);