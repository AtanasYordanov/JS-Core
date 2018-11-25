function getInfo() {
    const stopId = $('#stopId').val();
    let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json `;
    let $list = $('#buses');

    $.get(url)
        .then(displayData)
        .catch(displayError);

    function displayData(data) {
        $list.empty();
        $('#stopName').text(data.name);
        let buses = data['buses'];
        Object.keys(buses)
            .forEach(key => {
                $($list).append($('<li>').text(
                    `Bus ${key} arrives in ${buses[key]} minutes`
                ));
            });
    }

    function displayError() {
        $list.empty();
        $('#stopName').text('Error');
    }
}