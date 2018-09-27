function solve(array) {

    function buildXml() {
        let output = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<quiz>\n';

        for (let i = 0; i < array.length - 1; i += 2) {
            output += `  <question>\n    ${array[i]}\n  </question>\n`;
            output += `  <answer>\n    ${array[i + 1]}\n  </answer>\n`;
        }

        output += '</quiz>';
        return output;
    }

    let output = buildXml();
    console.log(output);
}

solve(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]);