function solve(array) {
    let regex = /www\.[a-zA-Z0-9-]+(\.[a-z]+)+/g;
    array.forEach(e => {
        let matches = e.match(regex) || [];
        matches.forEach(m => console.log(m));
    });
}

solve([
    'Need information about cheap hotels in London?',
    'You can check us at www.london-hotels.co.uk!',
    'We provide the best services in London.',
    'Here are some reviews in some blogs:',
    '"London Hotels are awesome!" - www.indigo.bloggers.com',
    '"I am very satisfied with their services" - ww.ivan.bg',
    '"Best Hotel Services!" - www.rebel21.sedecrem.moc'
]);