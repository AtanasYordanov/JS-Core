let carService = (() => {
    function loadCars() {
        return requester.get('appdata', 'cars?query={}&sort={"_kmd.ect": -1}', 'kinvey');
    }

    function loadCarDetails(carId) {
        return requester.get('appdata', 'cars/' + carId, 'kinvey');
    }

    function listCar(car) {
        return requester.post('appdata', 'cars', 'kinvey', car);
    }

    function loadMyListings(username) {
        return requester.get('appdata', `cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`, 'kinvey');

    }

    function editListing(carId, car) {
        return requester.update('appdata', 'cars/' + carId, 'kinvey', car);
    }

    function removeListing(carId) {
        return requester.remove('appdata', 'cars/' + carId, 'kinvey');
    }

    return {
        loadCars,
        loadCarDetails,
        listCar,
        loadMyListings,
        editListing,
        removeListing
    }
})();