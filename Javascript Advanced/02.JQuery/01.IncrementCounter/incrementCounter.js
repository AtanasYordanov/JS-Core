function increment(selector) {
    let $textArea = $('<textarea>').val('0')
        .attr('disabled', true);
    let $incrBtn = $('<button>').addClass('btn')
        .attr('id', 'incrementBtn').text('Increment');
    let $addBtn = $('<button>').addClass('btn')
        .attr('id', 'addBtn').text('Add');
    let $ul = $('<ul>').addClass('results');
    $(selector).append($textArea).append($incrBtn).append($addBtn).append($ul);

    $textArea.addClass('counter');

    $incrBtn.on('click', increment);
    $addBtn.on('click', add);

    function increment() {
        let value = Number($textArea.val()) + 1;
        $textArea.val(value.toString());
    }

    function add() {
        let newLi = $('<li>').text($textArea.val());
        $ul.append(newLi);
    }
}