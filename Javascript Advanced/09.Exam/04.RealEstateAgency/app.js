function realEstateAgency() {
    let $rentField = $('#regOffer input:nth-child(2)');
    let $appTypeField = $('#regOffer input:nth-child(3)');
    let $commissionRateField = $('#regOffer input:nth-child(4)');
    let $regOfferBtn = $('#regOffer button');

    let $familyBudgetField = $('#findOffer input:nth-child(2)');
    let $familyAppTypeField = $('#findOffer input:nth-child(3)');
    let $familyNameField = $('#findOffer input:nth-child(4)');
    let $findOfferBtn = $('#findOffer button');

    let $notifications = $('#notifications');
    let $building = $('#building');

    $regOfferBtn.on('click', registerOffer);
    $findOfferBtn.on('click', findOffer);

    function registerOffer() {
        let rent = $rentField.val();
        let appType = $appTypeField.val();
        let commissionRate = $commissionRateField.val();

        $rentField.val('');
        $appTypeField.val('');
        $commissionRateField.val('');

        if (isNaN(rent) || isNaN(commissionRate)
            || rent <= 0 || commissionRate < 0 || commissionRate > 100
            || appType === '' || appType.includes(':')) {

            $notifications.html(
                '<p id="message">Your offer registration went wrong, try again.</p>');
            return;
        }
        $notifications.html(
            '<p id="message">Your offer was created successfully.</p>');

        $building
            .append(
                $('<div class="apartment">')
                    .append(`<p>Rent: ${rent}</p>`)
                    .append(`<p>Type: ${appType}</p>`)
                    .append(`<p>Commission: ${commissionRate}</p>`)
            );
    }

    function findOffer() {
        let familyBudget = $familyBudgetField.val();
        let familyAppType = $familyAppTypeField.val();
        let familyName = $familyNameField.val();

        $familyBudgetField.val('');
        $familyAppTypeField.val('');
        $familyNameField.val('');

        if (isNaN(familyBudget) || familyBudget < 0 || familyAppType === '' || familyName === '') {
            $notifications.html(
                '<p id="message">We were unable to find you a home, so sorry :(</p>');
            return;
        }

        for (const child of $building.children()) {
            let rent = +$(child).find('p:nth-child(1)').text().split(' ')[1];
            let type = $(child).find('p:nth-child(2)').text().split(' ')[1];
            let commissionPercent = +$(child).find('p:nth-child(3)').text().split(' ')[1];

            let commission = rent * commissionPercent / 100;

            if (type === familyAppType && rent + commission <= familyBudget) {
                $(child).empty()
                    .css("border", "2px solid red")
                    .append(`<p>${familyName}</p>`)
                    .append(`<p>live here now</p>`)
                    .append(
                        $(`<button>MoveOut</button>`)
                            .on('click', function () {
                                moveOut(this, familyName)
                            })
                    );
                $notifications.html(
                    '<p id="message">Enjoy your new home! :))</p>');

                takeProfit(commission * 2);
                return;
            }
        }

        $notifications.html(
            '<p id="message">We were unable to find you a home, so sorry :(</p>');
    }

    function moveOut(el, familyName) {
        $(el).parent().remove();
        $notifications.html(
            `<p id="message">They had found cockroaches in ${familyName}\'s apartment\</p>`);
    }

    function takeProfit(value) {
        let roof = $('#roof h1');
        let profit = +roof.text().split(' ')[2];
        profit += value;
        roof.text(`Agency profit: ${profit} lv.`)
    }
}
