let petService = (() => {
    function loadPets() {
        return requester.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey');
    }

    function loadPetsByCategory(category) {
        return requester.get('appdata', `pets?query={"category":"${category}"}&sort={"likes": -1}`, 'kinvey');
    }

    function loadPetDetails(petId) {
        return requester.get('appdata', 'pets/' + petId, 'kinvey');
    }

    function addPet(pet) {
        return requester.post('appdata', 'pets', 'kinvey', pet);
    }

    function loadMyPets(userId) {
        return requester.get('appdata', `pets?query={"_acl.creator":"${userId}"}`, 'kinvey');
    }

    function editPet(petId, pet) {
        return requester.update('appdata', 'pets/' + petId, 'kinvey', pet);
    }

    function deletePet(petId) {
        return requester.remove('appdata', 'pets/' + petId, 'kinvey');
    }

    return {
        loadPets,
        addPet,
        loadMyPets,
        loadPetDetails,
        editPet,
        deletePet,
        loadPetsByCategory,
    }
})();