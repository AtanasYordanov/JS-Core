function createBook(selector, title, author, isbn) {

    let booksCount = $('#wrapper div').length + 1;
    let bookId = `book${booksCount}`;

    let bookBox = $('<div>').attr('id', bookId)
        .append($('<p>').addClass('title').text(title))
        .append($('<p>').addClass('author').text(author))
        .append($('<p>').addClass('isbn').text(isbn))
        .append($('<button>').addClass('select-btn').text('Select').on('click', select))
        .append($('<button>').addClass('select-btn').text('Deselect').on('click', deselect));

    $(selector).append(bookBox);

    function select() {
        $(this).parent().css('border', '2px solid blue');
    }

    function deselect() {
        $(this).parent().css('border', 'none');
    }
}