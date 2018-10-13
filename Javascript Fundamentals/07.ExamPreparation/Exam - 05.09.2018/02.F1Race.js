function solve(lines) {
    let pilots = lines.splice(0, 1)[0].split(' ');

    lines.forEach(line => {
        let [command, pilot] = line.split(' ');

        switch (command) {
            case "Join":
                if (!pilots.includes(pilot)) {
                    pilots.push(pilot);
                }
                break;
            case "Crash":
                pilots.splice(pilots.indexOf(pilot), 1);
                break;
            case "Pit":
                let pilotIndex = pilots.indexOf(pilot);
                if (pilots[pilotIndex + 1]) {
                    pilots.splice(pilotIndex, 2, ...pilots.slice(pilotIndex, pilotIndex + 2).reverse());
                }
                break;
            case "Overtake":
                let index = pilots.indexOf(pilot);
                if (pilots[index - 1]) {
                    pilots.splice(index - 1, 2, ...pilots.slice(index - 1, index + 1).reverse());
                }
                break;
        }
    });

    console.log(pilots.join(" ~ "));
}

solve([
    "Vetel Hamilton Raikonnen Botas Slavi",
    "Pit Hamilton",
    "Overtake LeClerc",
    "Join Ricardo",
    "Crash Botas",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Crash Slavi"
]);