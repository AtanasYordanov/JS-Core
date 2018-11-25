function solve() {
    let nextStopId = 'depot';
    let nextStopName;
    let $infoBox = $('.info');
    let $departBtn = $('#depart');
    let $arriveBtn = $('#arrive');

    function depart() {
        $departBtn.attr('disabled', 'true');
        $arriveBtn.removeAttr('disabled');

        let url = `https://judgetests.firebaseio.com/schedule/${nextStopId}.json`;
        $.get(url)
            .then(displayNextStop)
            .catch(displayError);

        function displayNextStop(data) {
            nextStopName = data.name;
            $infoBox.text(`Next Stop ${nextStopName}`);
            nextStopId = data.next;
        }

        function displayError() {
            $infoBox.text('Error');
            $departBtn.attr('disabled', 'true');
            $arriveBtn.attr('disabled', 'true');
        }
    }

    function arrive() {
        $arriveBtn.attr('disabled', 'true');
        $departBtn.removeAttr('disabled');
        $infoBox.text(`Arriving at ${nextStopName}`);
    }

    return {
        depart,
        arrive
    }
}

let result = solve();