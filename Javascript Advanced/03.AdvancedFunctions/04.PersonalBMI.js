function solve(name, age, weight, height) {
    let personalInfo = {age, weight, height};
    let BMI = Math.round(weight / (height * height) * 10000);
    let status;
    if (BMI < 18.5) {
        status = 'underweight';
    } else if (BMI < 25) {
        status = 'normal';
    } else if (BMI < 30) {
        status = 'overweight';
    } else {
        status = 'obese';
    }
    let chart = {name, personalInfo, BMI, status};
    if (status === 'obese') {
        chart.recommendation = 'admission required';
    }
    return chart;
}