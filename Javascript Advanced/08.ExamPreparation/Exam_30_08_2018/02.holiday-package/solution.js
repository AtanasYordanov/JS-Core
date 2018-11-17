const assert = require('chai').assert;
const HolidayPackage = require('./holiday-package');

describe('Holiday Package', function () {
    let myPackage;

    beforeEach(() => {
        myPackage = new HolidayPackage('Varna', 'Summer');
    });

    it('should be instantiated correctly', function () {
        assert.equal(myPackage.destination, 'Varna');
        assert.equal(myPackage.season, 'Summer');
    });

    it('insuranceIncluded should set value corretly', function () {
        myPackage.insuranceIncluded = true;

        assert.equal(myPackage.insuranceIncluded, true);
    });

    it('addVacationer, parameter not string, should throw appropriate exception', function () {
        assert.throws(() => myPackage.addVacationer(1),
            Error, 'Vacationer name must be a non-empty string');
    });

    it('addVacationer, empty string, should throw appropriate exception', function () {
        assert.throws(() => myPackage.addVacationer(' '),
            Error, 'Vacationer name must be a non-empty string');
    });

    it('addVacationer, just one name, should throw appropriate exception', function () {
        assert.throws(() => myPackage.addVacationer('Toshko'),
            Error, 'Name must consist of first name and last name');
    });

    it('addVacationer, valid data, should add vacationer', function () {
        myPackage.addVacationer('Toshko Toshev');
        assert.equal(myPackage.vacationers.length, 1);
    });

    it('show vacationers, no vacationers, should return appropriate message', function () {
        assert.equal(myPackage.showVacationers(), 'No vacationers are added yet');
    });

    it('show vacationers, vacationers, should return correct value', function () {
        myPackage.addVacationer('Gosho Goshov');
        myPackage.addVacationer('Pesho Peshov');

        assert.equal(myPackage.showVacationers()
            , 'Vacationers:\nGosho Goshov\nPesho Peshov');
    });

    it('generateHolidayPackage, no vacationers, should throw appropriate exception', function () {
        assert.throws(() => myPackage.generateHolidayPackage(),
            Error, 'There must be at least 1 vacationer added');
    });

    it('generateHolidayPackage, during Summer, should produce correct result', function () {
        myPackage.addVacationer('Toshko Toshev');

        let result = myPackage.generateHolidayPackage();
        let expected = "Holiday Package Generated\nDestination: Varna\n" +
            "Vacationers:\nToshko Toshev\nPrice: 600";
        assert.equal(expected, result);
    });

    it('generateHolidayPackage, during Spring, should produce correct result', function () {
        myPackage = new HolidayPackage('Varna', 'Spring');
        myPackage.addVacationer('Toshko Toshev');

        let result = myPackage.generateHolidayPackage();
        let expected = "Holiday Package Generated\nDestination: Varna\n" +
            "Vacationers:\nToshko Toshev\nPrice: 400";
        assert.equal(expected, result);
    });

    it('generateHolidayPackage, with insurance, should produce correct result', function () {
        myPackage.addVacationer('Toshko Toshev');
        myPackage.insuranceIncluded = true;

        let result = myPackage.generateHolidayPackage();
        let expected = "Holiday Package Generated\nDestination: Varna\n" +
            "Vacationers:\nToshko Toshev\nPrice: 700";
        assert.equal(expected, result);
    });
});