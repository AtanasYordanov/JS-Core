$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const template = Handlebars.compile($('#cat-template').html());
        $('#allCats').append(template(cats));
        $('#allCats button').on('click', displayMoreInfo);
    }

    function displayMoreInfo() {
        $(this)
            .text('Hide status code')
            .off("click")
            .on('click', hideInfo)
            .parent().find('div').show();
    }

    function hideInfo() {
        $(this)
            .text('Show status code')
            .off("click")
            .on('click', displayMoreInfo)
            .parent().find('div').hide();
    }
});
