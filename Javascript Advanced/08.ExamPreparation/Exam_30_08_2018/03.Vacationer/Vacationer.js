class Vacationer {
    constructor(fullName, creditCard = [1111, '', 111]) {
        this.fullName = fullName;
        this.idNumber = this.generateIDNumber();
        this.addCreditCardInfo(creditCard);
        this.wishList = [];
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(fullName) {
        if (fullName.length !== 3) {
            throw new Error('Name must include first name, middle name and last name');
        }

        if (!this.validateName(fullName[0])
            || !this.validateName(fullName[1])
            || !this.validateName(fullName[2])) {
            throw new Error('Invalid full name');
        }

        this._fullName = {
            firstName: fullName[0],
            middleName: fullName[1],
            lastName: fullName[2]
        };
    }

    generateIDNumber() {
        let firstName = this.fullName.firstName;
        let middleName = this.fullName.middleName;
        let lastName = this.fullName.lastName;

        let number = 231 * firstName.charCodeAt(0) + 139 * middleName.length;

        number += this.isVowel(lastName[lastName.length - 1]) ? '8' : '7';
        return number;
    }

    addCreditCardInfo(input) {
        if (input.length !== 3) {
            throw new Error('Missing credit card information');
        }

        if (typeof (input[0]) !== 'number'
            || typeof (input[2]) !== 'number') {
            throw new Error('Invalid credit card details');
        }

        this.creditCard = {
            cardNumber: input[0],
            expirationDate: input[1],
            securityNumber: input[2]
        };
    }

    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw new Error('Destination already exists in wishlist');
        }
        this.wishList.push(destination);
        this.wishList.sort((a, b) => a.length - b.length);
    }

    getVacationerInfo() {
        let wishlist = this.wishList.length > 0 ? this.wishList.join(', ') : 'empty';
        return `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\n` +
            `ID Number: ${this.idNumber}\n` +
            'Wishlist:\n' +
            `${wishlist}\n` +
            'Credit Card:\n' +
            `Card Number: ${this.creditCard.cardNumber}\n` +
            `Expiration Date: ${this.creditCard.expirationDate}\n` +
            `Security Number: ${this.creditCard.securityNumber}`;
    }

    validateName(name) {
        const regex = /^[A-Z][a-z]+$/g;
        return regex.test(name);
    }

    isVowel(letter) {
        return ['a', 'e', 'o', 'i', 'u'].includes(letter);
    }
}
