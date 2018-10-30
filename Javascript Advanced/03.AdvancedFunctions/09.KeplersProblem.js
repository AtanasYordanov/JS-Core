function solve(currentAnomaly, eccentricity) {
    currentAnomaly = (currentAnomaly * 180) / Math.PI;
    let anomaly = getAnomaly(eccentricity, currentAnomaly, 9);
    console.log(anomaly);

    function getAnomaly(eccentricity, anomaly, precision) {
        let delta = Math.pow(10, -precision);

        anomaly /= 360.0;
        anomaly = 2.0 * Math.PI * (anomaly - Math.floor(anomaly));

        let e = anomaly;
        let f = e - eccentricity * Math.sin(anomaly) - anomaly;

        while ((Math.abs(f) > delta)) {
            e = e - f / (1.0 - eccentricity * Math.cos(e));
            f = e - eccentricity * Math.sin(e) - anomaly;
        }

        return Math.round(e * Math.pow(10, precision)) / Math.pow(10, precision);
    }
}