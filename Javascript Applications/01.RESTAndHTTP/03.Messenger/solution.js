function attachEvents() {
    const url = "https://messenger-f674b.firebaseio.com/messages.json";
    const $authorField = $('#author');
    const $contentField = $('#content');
    const $messagesBox = $('#messages');

    $('#submit').on('click', submitMessage);
    $('#refresh').on('click', refreshMessages);

    function submitMessage() {
        let author = $authorField.val();
        let content = $contentField.val();
        let timestamp = Date.now();
        let data = {author, content, timestamp};

        $.post(url, JSON.stringify(data))
            .then(refreshMessages)
    }

    function refreshMessages() {
        $messagesBox.empty();
        $.get(url)
            .then(data => {
                Object.values(data)
                    .sort((a, b) => a['timestamp'] - b['timestamp'])
                    .forEach(message => {
                        $messagesBox.append(`${message['author']}: ${message['content']}\n`);
                    });
            });
    }
}