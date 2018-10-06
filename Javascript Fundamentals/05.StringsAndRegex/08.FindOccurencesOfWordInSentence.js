function solve(input, word) {
    let regex = new RegExp(`\\b${word}\\b`, 'gi');
    let matches = input.match(regex) || [];
    console.log(matches.length);
}

solve('The waterfall was so high, that the child couldn’t see its peak.', 'the');