let assert = require('chai').assert;
let jsdom = require('jsdom-global')();
let $ = require('jquery');
document.body.innerHTML = '<div id="wrapper">' +
    '<input type="text" id="name">' +
    '<input type="text" id="income">' +
    '</div>';

let sharedObject = {
    name: null,
    income: null,
    changeName: function (name) {
        if (name.length === 0) {
            return;
        }
        this.name = name;
        let newName = $('#name');
        newName.val(this.name);
    },
    changeIncome: function (income) {
        if (!Number.isInteger(income) || income <= 0) {
            return;
        }
        this.income = income;
        let newIncome = $('#income');
        newIncome.val(this.income);
    },
    updateName: function () {
        let newName = $('#name').val();
        if (newName.length === 0) {
            return;
        }
        this.name = newName;
    },
    updateIncome: function () {
        let newIncome = $('#income').val();
        if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
            return;
        }
        this.income = Number(newIncome);
    }
};

describe('sharedObject', function () {
    describe('changeName', function () {
        it('with an empty string, should do nothing', function () {
            sharedObject.changeName('');

            assert.equal(sharedObject.name, null);
        });
        it('with valid data, should change name', function () {
            sharedObject.changeName('name');

            assert.equal(sharedObject.name, 'name');
        });
        it('with valid data, should change html document value', function () {
            sharedObject.changeName('name');

            assert.equal($('#name').val(), 'name');
        });
    });
    describe('changeIncome', function () {
        it('with a float number, should do nothing', function () {
            sharedObject.changeIncome(1.5);

            assert.equal(sharedObject.income, null);
        });
        it('with a negative number, should do nothing', function () {
            sharedObject.changeIncome(0);

            assert.equal(sharedObject.income, null);
        });
        it('with a negative number, should do nothing', function () {
            sharedObject.changeIncome(-2);

            assert.equal(sharedObject.income, null);
        });
        it('with valid data, should change income field', function () {
            sharedObject.changeIncome(5);

            assert.equal(sharedObject.income, 5);
        });
        it('with valid data, should change html element value', function () {
            sharedObject.changeIncome(5);

            assert.equal($('#income').val(), 5);
        });
    });
    describe('updateName', function () {
        it('with an empty string, should do nothing', function () {
            const previousName = sharedObject.name;
            $('#name').val('');

            sharedObject.updateName();

            assert.equal(sharedObject.name, previousName);
        });
        it('with valid data, should update name', function () {
            $('#name').val('valid name');

            sharedObject.updateName();

            assert.equal(sharedObject.name, 'valid name');
        });
    });
    describe('updateIncome', function () {
        it('with a non-number value, should do nothing', function () {
            const previousIncome = sharedObject.income;
            $('#income').val('string');

            sharedObject.updateIncome();

            assert.equal(sharedObject.income, previousIncome);
        });
        it('with a function value, should do nothing', function () {
            const previousIncome = sharedObject.income;
            $('#income').val(() => {
            });

            sharedObject.updateIncome();

            assert.equal(sharedObject.income, previousIncome);
        });
        it('with a float number, should do nothing', function () {
            const previousIncome = sharedObject.income;
            $('#income').val(1.5);

            sharedObject.updateIncome();

            assert.equal(sharedObject.income, previousIncome);
        });
        it('with a negative number, should do nothing', function () {
            const previousIncome = sharedObject.income;
            $('#income').val(-3);

            sharedObject.updateIncome();

            assert.equal(sharedObject.income, previousIncome);
        });
        it('with valid data, should update income', function () {
            $('#income').val(30);

            sharedObject.updateIncome();

            assert.equal(sharedObject.income, 30);
        });
    });
});
