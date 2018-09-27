function solve([speed, zone]) {

    function getSpeedLimit(zone) {
        switch (zone) {
            case 'motorway':
                return 130;
            case 'interstate':
                return 90;
            case 'city':
                return 50;
            case 'residential':
                return 20;
        }
    }

    let speedLimit = getSpeedLimit(zone);

    if (speed > speedLimit) {
        let diff = speed - speedLimit;

        if (diff > 40) {
            console.log('reckless driving');
        } else if (diff > 20) {
            console.log('excessive speeding');
        } else {
            console.log('speeding');
        }
    }
}

solve([21, 'residential']);