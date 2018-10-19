function attachEventsListeners() {
    document.getElementById('daysBtn').addEventListener('click', convertFromDays);
    document.getElementById('hoursBtn').addEventListener('click', convertFromHours);
    document.getElementById('minutesBtn').addEventListener('click', convertFromMinutes);
    document.getElementById('secondsBtn').addEventListener('click', convertFromSeconds);

    let daysField = document.getElementById('days');
    let hoursField = document.getElementById('hours');
    let minutesField = document.getElementById('minutes');
    let secondsField = document.getElementById('seconds');

    function convertFromDays() {
        let hours = daysField.value * 24;
        hoursField.value = hours;
        minutesField.value = hours * 60;
        secondsField.value = hours * 3600;
    }

    function convertFromHours() {
        let hours = hoursField.value;
        daysField.value = hours / 24;
        minutesField.value = hours * 60;
        secondsField.value = hours * 3600;
    }

    function convertFromMinutes() {
        let hours = minutesField.value / 60;
        hoursField.value = hours;
        daysField.value = hours / 24;
        secondsField.value = hours * 3600;
    }

    function convertFromSeconds() {
        let minutes = secondsField.value / 60;
        minutesField.value = minutes;
        hoursField.value = minutes / 60;
        daysField.value = minutes / 60 / 24;
    }
}

