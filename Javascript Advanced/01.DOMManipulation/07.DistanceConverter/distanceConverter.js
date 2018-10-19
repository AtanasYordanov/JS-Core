function attachEventsListeners() {
    document.getElementById('convert').addEventListener('click', convert);

    function convert() {
        let inputDistance = +document.getElementById('inputDistance').value;
        let inputUnits = document.getElementById('inputUnits').value;
        let outputUnits = document.getElementById('outputUnits').value;

        let meters, result;

        switch (inputUnits) {
            case 'km':
                meters = inputDistance * 1000;
                break;
            case 'm':
                meters = inputDistance;
                break;
            case 'cm':
                meters = inputDistance * 0.01;
                break;
            case 'mm':
                meters = inputDistance * 0.001;
                break;
            case 'mi':
                meters = inputDistance * 1609.34;
                break;
            case 'yrd':
                meters = inputDistance * 0.9144;
                break;
            case 'ft':
                meters = inputDistance * 0.3048;
                break;
            case 'in':
                meters = inputDistance * 0.0254;
                break;
        }

        switch (outputUnits) {
            case 'km':
                result = meters / 1000;
                break;
            case 'm':
                result = meters;
                break;
            case 'cm':
                result = meters / 0.01;
                break;
            case 'mm':
                result = meters / 0.001;
                break;
            case 'mi':
                result = meters / 1609.34;
                break;
            case 'yrd':
                result = meters / 0.9144;
                break;
            case 'ft':
                result = meters / 0.3048;
                break;
            case 'in':
                result = meters / 0.0254;
                break;
        }

        document.getElementById('outputDistance').value = result;
    }
}
