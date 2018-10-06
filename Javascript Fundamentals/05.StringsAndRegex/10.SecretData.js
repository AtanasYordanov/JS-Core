function solve(array) {
    let regex = /(\*[A-Z][a-zA-Z]*|\+[0-9-]{10}|[!_][a-zA-Z0-9]+)(?= |\t|$)/g;
    array.forEach(e => {
        console.log(e.replace(regex, (m) => '|'.repeat(m.length)))
    });
}

solve([
    'I think it was +555-49-796 _Aurora21 555-49-796 _Aurora21+555-49-796',
    'I can\'t really remember...',
    'He said something about "finishing work"', 'with subject !2491a23BVB34Q and returning to Base _Aurora21',
    'Then after that he disappeared from my sight.',
    'As if he vanished in the shadows.',
    'A moment, shorter than a second, later, I saw the person flying off the top floor.',
    'I really don\'t know what happened there.',
    'This is all I saw, that night.',
    'I cannot explain it myself...']
);