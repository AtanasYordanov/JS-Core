function solve(requirements) {
    let engine;

    if (requirements.power <= 90) {
        engine = {power: 90, volume: 1800};
    } else if (requirements.power <= 120) {
        engine = {power: 120, volume: 2400};
    } else {
        engine = {power: 200, volume: 3500};
    }

    const carriage = {type: requirements.carriage, color: requirements.color};
    const wheelsize = requirements.wheelsize % 2 === 1
        ? requirements.wheelsize
        : requirements.wheelsize - 1;
    const wheels = [wheelsize, wheelsize, wheelsize, wheelsize];

    return {model: requirements.model, engine, carriage, wheels};
}

solve(
    {
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
);