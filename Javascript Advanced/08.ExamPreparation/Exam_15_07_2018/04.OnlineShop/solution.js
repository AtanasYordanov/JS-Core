function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    let $productField = $('.custom-select');
    let $priceField = $('#price');
    let $quantityField = $('#quantity');
    let $capacityField = $('#capacity');
    let $sumField = $('#sum');
    let $inventory = $('.display');
    let $submitBtn = $('#submit');

    attachEvents();

    function attachEvents() {

        $productField.on('keyup', () => {
            if (!$productField.val()) {
                $submitBtn.attr('disabled', true);
            } else {
                $submitBtn.attr('disabled', false);
            }
        });

        $submitBtn.on('click', submit);
    }

    function submit() {
        let product = $productField.val();
        let price = +$priceField.val();
        let quantity = +$quantityField.val();

        $inventory.append(`<li>Product: ${product} Price: ${price} Quantity: ${quantity}</li>`);
        $capacityField.val(+$capacityField.val() + quantity);
        $sumField.val(+$sumField.val() + price);

        resetFields();
        if ($capacityField.val() >= 150) {
            $productField.attr('disabled', true);
            $priceField.attr('disabled', true);
            $quantityField.attr('disabled', true);
            $submitBtn.attr('disabled', true);
            $capacityField.val('full');
            $capacityField.addClass('fullCapacity')
        }
    }

    function resetFields() {
        $productField.val('');
        $priceField.val(1);
        $quantityField.val(1);
        $submitBtn.attr('disabled', true);
    }
}
