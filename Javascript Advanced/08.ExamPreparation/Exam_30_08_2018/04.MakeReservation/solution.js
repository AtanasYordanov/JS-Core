function makeReservation() {
    let $submitBtn = $('#submit');
    let $editBtn = $('#edit');
    let $continueBtn = $('#continue');

    let $nameField = $('#fullName');
    let $emailInput = $('#email');
    let $phoneField = $('#phoneNumber');
    let $address = $('#address');
    let $postalCodeField = $('#postalCode');

    let $previewList = $('#infoPreview');

    $submitBtn.on('click', submit);
    $editBtn.on('click', edit);
    $continueBtn.on('click', proceed);

    function submit() {
        let name = $nameField.val();
        let email = $emailInput.val();

        if (name === '' || email === '') {
            return;
        }

        $('<li>').text(`Name: ${name}`).appendTo($previewList);
        $('<li>').text(`E-mail: ${email}`).appendTo($previewList);
        $('<li>').text(`Phone: ${$phoneField.val()}`).appendTo($previewList);
        $('<li>').text(`Address: ${$address.val()}`).appendTo($previewList);
        $('<li>').text(`Postal Code: ${$postalCodeField.val()}`).appendTo($previewList);

        $submitBtn.attr('disabled', true);
        $editBtn.attr('disabled', false);
        $continueBtn.attr('disabled', false);

        $nameField.val('');
        $emailInput.val('');
        $phoneField.val('');
        $address.val('');
        $postalCodeField.val('');
    }

    function edit() {
        $nameField.val($previewList.find('li:nth-child(1)').text().substring(6));
        $emailInput.val($previewList.find('li:nth-child(2)').text().substring(8));
        $phoneField.val($previewList.find('li:nth-child(3)').text().substring(7));
        $address.val($previewList.find('li:nth-child(4)').text().substring(9));
        $postalCodeField.val($previewList.find('li:nth-child(5)').text().substring(13));
        $previewList.empty();

        $submitBtn.attr('disabled', false);
        $editBtn.attr('disabled', true);
        $continueBtn.attr('disabled', true);
    }

    function proceed() {
        $submitBtn.attr('disabled', true);
        $editBtn.attr('disabled', true);
        $continueBtn.attr('disabled', true);

        $('#container')
            .append($('<h2>Payment details</h2>'))
            .append(
                $('<select id="paymentOptions" class="custom-select"></select>')
                    .append($('<option selected disabled hidden>Choose</option>'))
                    .append($('<option value="creditCard">Credit Card</option>'))
                    .append($('<option value="bankTransfer">Bank Transfer</option>')
                    ).on('change', function () {displayPaymentInformation(this)})
            )
            .append($('<div id="extraDetails"></div>'));
    }

    function displayPaymentInformation(field) {
        if (field.value === 'creditCard') {
            $('#extraDetails').empty()
                .append('<div class="inputLabel">Card Number<input></div><br>')
                .append('<div class="inputLabel">Expiration Date<input></div><br>')
                .append('<div class="inputLabel">Security Numbers<input></div><br>')
                .append(
                    $('<button id="checkOut">Check Out</button>').on('click', checkOut)
                );
        } else if (field.value === 'bankTransfer') {
            $('#extraDetails').empty()
                .append('<p>You have 48 hours to transfer the amount to:' +
                    '<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>')
                .append(
                    $('<button id="checkOut">Check Out</button>').on('click', checkOut)
                );
        }
    }

    function checkOut() {
        $('#wrapper').empty().append('<h4>Thank you for your reservation!</h4>');
    }
}