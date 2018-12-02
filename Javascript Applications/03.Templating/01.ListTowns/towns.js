function attachEvents() {
    const $towns = $('#towns');
    const $root = $('#root');
    const template = Handlebars.compile($('#towns-template').html());
    $('#btnLoadTowns').on('click', loadTowns);

    function loadTowns() {
        let towns = $towns.val().trim().split(/,\s+/).map(t => t.trim());
        $root.empty();
        $root.append(template(towns));
        $towns.val('');
    }
}