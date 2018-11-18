class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.shelfGenre = shelfGenre;
        this.room = room;
        if (!['livingRoom', 'bedRoom', 'closet'].includes(room)) {
            throw new Error(`Cannot have book shelf in ${room}`);
        }
        this.shelfCapacity = shelfCapacity;
        this.shelfCondition = shelfCapacity;
        this.shelf = [];
    }

    addBook(bookName, bookAuthor, genre) {
        let book = {bookName, bookAuthor, genre};
        if (this.shelf.length === this.shelfCapacity) {
            this.shelf[0] = book;
        } else {
            this.shelf.push(book);
            this.shelfCondition--;
        }
        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        return this;
    }

    throwAwayBook(bookName) {
        let index = this.shelf.findIndex(b => b.bookName = bookName);
        if (index > -1) {
            this.shelf.splice(index, 1);
            this.shelfCondition++;
        }
    }

    showBooks(genre) {
        return `Results for search \"${genre}\":\n` +
            this.shelf
                .filter(b => b.genre === genre)
                .map(b => `\uD83D\uDCD6 ${b.bookAuthor} - \"${b.bookName}\"`).join('\n');
    }

    toString() {
        if (this.shelf.length === 0) {
            return 'It\'s an empty shelf';
        }
        return `\"${this.shelfGenre}\" shelf in ${this.room} contains:\n` +
            this.shelf.map(b => `\uD83D\uDCD6 \"${b.bookName}\" - ${b.bookAuthor}`).join('\n');
    }
}
