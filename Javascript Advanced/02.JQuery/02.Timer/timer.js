function timer() {
    let seconds = 0;
    let timer;

    $('#start-timer').on('click', startTimer);
    $('#stop-timer').on('click', pauseTimer);

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(step, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
    }

    function step() {
        seconds++;
        $('#hours').text(("0" + Math.trunc(seconds / 3600)).slice(-2));
        $('#minutes').text(("0" + Math.trunc((seconds % 3600) / 60)).slice(-2));
        $('#seconds').text(("0" + seconds % 60).slice(-2));
    }
}