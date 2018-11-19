function acceptance() {
    let $companyField = $('#fields td:nth-child(1) input');
    let $productField = $('#fields td:nth-child(2) input');
    let $quantityField = $('#fields td:nth-child(3) input');
    let $scrapeField = $('#fields td:nth-child(4) input');
    let $list = $('#warehouse');

    let company = $companyField.val();
    let product = $productField.val();
    let quantity = $quantityField.val();
    let scrape = $scrapeField.val();

    $companyField.val('');
    $productField.val('');
    $quantityField.val('');
    $scrapeField.val('');

    if (company === '' || product === '' || quantity === '' || scrape === ''
        || isNaN(quantity) || isNaN(scrape)
        || quantity <= 0 || quantity - scrape <= 0) {
        return;
    }

    $list.append(
        $('<div></div>')
            .append(`<p>[${company}] ${product} - ${quantity - scrape} pieces</p>`)
            .append(
                $('<button>Out of stock</button>')
                    .on('click', function () {
                        $(this).parent().remove()
                    })
            )
    );
}