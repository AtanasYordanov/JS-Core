function solve() {

    let microelements = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };

    let mealCosts = {
        apple: {protein: 0, carbohydrate: 1, fat: 0, flavour: 2},
        coke: {protein: 0, carbohydrate: 10, fat: 0, flavour: 20},
        burger: {protein: 0, carbohydrate: 5, fat: 7, flavour: 3},
        omelet: {protein: 5, carbohydrate: 0, fat: 1, flavour: 1},
        cheverme: {protein: 10, carbohydrate: 10, fat: 10, flavour: 10}
    };
    return (input) => {
        const [command, type, quantity] = input.split(' ');

        switch (command) {
            case "restock":
                microelements[type] += +quantity;
                return 'Success';
            case "prepare":
                let meal = mealCosts[type];

                if (microelements.protein >= meal.protein * quantity
                    && microelements.carbohydrate >= meal.carbohydrate * quantity
                    && microelements.fat >= meal.fat * quantity
                    && microelements.flavour >= meal.flavour * quantity) {

                    microelements.protein -= meal.protein * quantity;
                    microelements.carbohydrate -= meal.carbohydrate * quantity;
                    microelements.fat -= meal.fat * quantity;
                    microelements.flavour -= meal.flavour * quantity;
                    return 'Success'
                } else {
                    if (microelements.protein < meal.protein * quantity) {
                        return `Error: not enough protein in stock`;
                    }
                    if (microelements.carbohydrate < meal.carbohydrate * quantity) {
                        return `Error: not enough carbohydrate in stock`;
                    }
                    if (microelements.fat < meal.fat * quantity) {
                        return `Error: not enough fat in stock`;
                    }
                    return `Error: not enough flavour in stock`;
                }
            case "report":
                return Object.keys(microelements)
                    .map(key => `${key}=${microelements[key]}`)
                    .join(' ');
        }
    };
}