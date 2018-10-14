function solve(text, command) {
    let nameRegex = / [A-Z]\w*-([A-Z]\w*\.-)?[A-Z]\w* /;
    let airportRegex = / [A-Z]{3}\/[A-Z]{3} /;
    let flightNumberRegex = / [A-Z]{1,3}\d{1,5} /;
    let companyRegex = /- [A-Z]\w*\*[A-Z]\w* /;

    switch (command) {
        case "name":
            console.log(`Mr/Ms, ${getName()}, have a nice flight!`);
            break;
        case "flight":
            var airports = getAirports();
            console.log(`Your flight number ${getFlight()} is from ${airports[0]} to ${airports[1]}.`);
            break;
        case "company":
            console.log(`Have a nice flight with ${getCompany()}.`);
            break;
        case "all":
            airports = getAirports();
            console.log(`Mr/Ms, ${getName()}, your flight number ${getFlight()} is from ${airports[0]} to ${airports[1]}. Have a nice flight with ${getCompany()}.`);
            break;
    }

    function getName() {
        let name = text.match(nameRegex)[0];
        return name.substring(1, name.length - 1).replace('-', ' ').replace('-', ' ');
    }

    function getFlight() {
        let flight = text.match(flightNumberRegex)[0];
        return flight.substring(1, flight.length - 1);
    }

    function getAirports() {
        let airport = text.match(airportRegex)[0];
        airport = airport.substring(1, airport.length - 1);
        return airport.split('/');
    }

    function getCompany() {
        let company = text.match(companyRegex)[0];
        company = company.substring(2, company.length - 1).replace('*', ' ');
        return company;
    }
}

solve('ahah T-T.-Testov  )*))&&ba SOF/VAR ela** FB973 - Bulgaria*Air -opFB900 pa-SOF/VAr//_- T12G12 STD08:45  STA09:35 ', 'all');