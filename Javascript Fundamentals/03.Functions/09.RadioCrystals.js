function solve(array) {

    let desiredResult = array[0];

    for (let i = 1; i < array.length; i++) {
        let num = array[i];

        let operation = 0;

        let cuts = 0;
        let laps = 0;
        let grinds = 0;
        let etches = 0;
        let xRays = 0;

        console.log(`Processing chunk ${num} microns`);

        while (num !== desiredResult) {
            if (num / 4 >= desiredResult) {
                num /= 4;
                cuts++;
            } else if (num * 0.8 >= desiredResult) {
                if (operation < 1) {
                    num = Math.floor(num);
                    operation = 1;
                }
                num *= 0.8;
                laps++;
            } else if (num - 20 >= desiredResult) {
                if (operation < 2) {
                    num = Math.floor(num);
                    operation = 2;
                }
                num -= 20;
                grinds++;
            } else if (num >= desiredResult) {
                if (operation < 3) {
                    num = Math.floor(num);
                    operation = 3;
                }
                num -= 2;
                etches++;
            } else {
                num = Math.floor(num);
                num++;
                xRays++;
            }
        }
        if (cuts > 0) {
            console.log(`Cut x${cuts}`);
            console.log('Transporting and washing');
        }
        if (laps > 0) {
            console.log(`Lap x${laps}`);
            console.log('Transporting and washing');
        }
        if (grinds > 0) {
            console.log(`Grind x${grinds}`);
            console.log('Transporting and washing');
        }
        if (etches > 0) {
            console.log(`Etch x${etches}`);
            console.log('Transporting and washing');
        }
        if (xRays > 0) {
            console.log(`X-ray x${xRays}`);
        }
        console.log(`Finished crystal ${desiredResult} microns`);
    }
}

solve([1000, 4000, 8100]);