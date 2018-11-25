function attachEvents() {
    const baseUrl = 'https://phonebook-nakov.firebaseio.com/phonebook';
    let $personField = $('#person');
    let $phoneField = $('#phone');
    let $phonebook = $('#phonebook');

    $('#btnLoad').on('click', loadNumbers);
    $('#btnCreate').on('click', createNumber);

    function loadNumbers() {
        $.get(baseUrl + '.json')
            .then(data => {
                displayNumbers(data);
            });
    }

    function displayNumbers(data) {
        $phonebook.empty();
        Object.keys(data).forEach(key => {
            let number = data[key];
            $(`<li>${number['person']}: ${number['phone']}</li>`)
                .append(
                    $('<button>[Delete]</button>')
                        .on('click', () => deleteNumber(key))
                )
                .appendTo($phonebook);
        });
    }

    function deleteNumber(key) {
        $.ajax({
            url: `${baseUrl}/${key}.json`,
            method: 'DELETE'
        })
            .then(() => loadNumbers());
    }

    function createNumber() {
        let person = $personField.val();
        let phone = $phoneField.val();
        let data = {person, phone};

        $.post(baseUrl + '.json', JSON.stringify(data))
            .then(() => loadNumbers());

        $personField.val('');
        $phoneField.val('');
    }
}