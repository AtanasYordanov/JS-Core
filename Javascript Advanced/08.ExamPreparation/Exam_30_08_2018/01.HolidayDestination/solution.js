function addDestination() {
    const $inputFields = $('#input input');
    const city = $inputFields[0].value;
    const country = $inputFields[1].value;
    const season = $('#seasons option:selected').text();

    clearTextBoxes();

    if (city === '' || country === '') {
        return;
    }

    let $seasonDestinations = $(`#${season.toLowerCase()}`);
    let count = +($seasonDestinations.val());
    $seasonDestinations.val(count + 1);

    $('<tr>')
        .append($('<td>').text(`${city}, ${country}`))
        .append($('<td>').text(season))
        .appendTo('#destinationsList');

    function clearTextBoxes() {
        $inputFields[0].value = '';
        $inputFields[1].value = '';
    }
}