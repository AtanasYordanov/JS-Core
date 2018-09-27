function solve([x1, y1, x2, y2, x3, y3]) {

    function calculateDistance(x1, y1, x2, y2) {
        let a = Math.abs(x1 - x2);
        let b = Math.abs(y1 - y2);
        return Math.sqrt(a * a + b * b);
    }

    let d1 = calculateDistance(x1, y1, x2, y2);
    let d2 = calculateDistance(x2, y2, x3, y3);
    let d3 = calculateDistance(x1, y1, x3, y3);

    let paths = [
        {dist: d1 + d2, order: '1->2->3'},
        {dist: d2 + d3, order: '1->3->2'},
        {dist: d1 + d3, order: '2->1->3'}
    ];

    paths = paths.sort((p1, p2) => {
        return p1.dist - p2.dist;
    });
    console.log(`${paths[0].order}: ${paths[0].dist}`);
}

solve([0, 0, 2, 0, 4, 0]);