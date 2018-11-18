function addSticker() {
    let $titleField = $('.title-input .title');
    let $textField = $('.text-input .content');

    let title = $titleField.val();
    let text = $textField.val();

    if (!title || !text) {
        return;
    }

    $titleField.val('');
    $textField.val('');

    $('#sticker-list')
        .append(
            $('<li class="note-content"></li>')
                .append(
                    $('<a class="button">x</a>').on('click',
                        function () {$(this).parent().remove()})
                )
                .append(`<h2>${title}</h2>`)
                .append('<hr>')
                .append(`<p>${text}</p>`)
        )
}