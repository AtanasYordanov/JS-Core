function attachEvents() {
    const $location = $('#location');
    const $forecast = $('#forecast');
    const $current = $('#current');
    const $upcoming = $('#upcoming');
    $('#submit').on('click', getWeather);

    const symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    };

    function getWeather() {
        const locationsUrl = 'https://judgetests.firebaseio.com/locations.json';
        $.get(locationsUrl)
            .then(data => {
                const locationName = $location.val();
                const location = data.find(l => l['name'] === locationName);
                if (!location) {
                    displayError();
                    return;
                }
                const code = location['code'];
                const todayUrl = `https://judgetests.firebaseio.com/forecast/today/${code}.json`;
                const upcomingUrl = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;

                Promise
                    .all([
                        $.get(todayUrl),
                        $.get(upcomingUrl)
                    ])
                    .then(([today, upcoming]) => {
                        displayTodayWeather(today);
                        displayUpcomingWeather(upcoming);
                        $forecast.show();
                    })
                    .catch(displayError);
            });
    }

    function displayTodayWeather(data) {
        $current.empty();
        $current.append('<div class="label">Current conditions</div>');

        const name = data['name'];
        const condition = data['forecast']['condition'];
        const low = data['forecast']['low'];
        const high = data['forecast']['high'];

        $(`<span class="condition symbol">${symbols[condition]}</span>`);
        $current
            .append(`<span class="condition symbol">${symbols[condition]}</span>`)
            .append(
                $(`<span class="condition"></span>`)
                    .append(`<span class="forecast-data">${name}</span>`)
                    .append(`<span class="forecast-data">${low}${symbols.Degrees}/${high}${symbols.Degrees}</span>`)
                    .append(`<span class="forecast-data">${condition}</span>`)
            );
    }

    function displayUpcomingWeather(data) {
        $upcoming.empty();
        $upcoming.append('<div class="label">Three-day forecast</div>');

        data['forecast'].forEach(day => {
            const condition = day['condition'];
            const low = day['low'];
            const high = day['high'];
            $upcoming
                .append(
                    $(`<span class="upcoming"></span>`)
                        .append(`<span class="symbol">${symbols[condition]}</span>`)
                        .append(`<span class="forecast-data">${low}${symbols.Degrees}/${high}${symbols.Degrees}</span>`)
                        .append(`<span class="forecast-data">${condition}</span>`)
                );
        });
    }

    function displayError() {
        $upcoming.empty();
        $current.empty();
        $current.append('<div>Error</div>');
        $forecast.show();
    }
}

