function solve() {
    let argumentsMap = new Map();
    for (const argument of arguments) {
        const argumentType = typeof(argument);
        if (!argumentsMap.has(argumentType)) {
            argumentsMap.set(argumentType, 0);
        }
        argumentsMap.set(argumentType, argumentsMap.get(argumentType) + 1);
        console.log(`${argumentType}: ${argument}`);
    }
    [...argumentsMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .forEach(pair => {
            console.log(`${pair[0]} = ${pair[1]}`);
        });
}