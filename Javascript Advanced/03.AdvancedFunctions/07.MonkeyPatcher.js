let result = (function () {
    let commands = {
        upvote: (object) => object['upvotes']++,
        downvote: (object) => object['downvotes']++,
        score: (object) => {
            let upvotes = object['upvotes'];
            let downvotes = object['downvotes'];
            let result = [];
            let obfuscation = 0;
            let maxVotes;
            if ((upvotes + downvotes) > 50) {
                maxVotes = Math.max(upvotes, downvotes);
                obfuscation = Math.ceil(0.25 * maxVotes);
            }
            result.push(upvotes + obfuscation);
            result.push(downvotes + obfuscation);
            result.push(upvotes - downvotes);
            let rating = getRating(object);
            result.push(rating);
            return result;
        },
        call: (object, args) => {
            return commands[args](object);
        }
    };
    return commands;

    function getRating(object) {
        let upvotes = object['upvotes'];
        let downvotes = object['downvotes'];
        let totalVotes = upvotes + downvotes;
        let balance = upvotes - downvotes;

        if (totalVotes < 10) {
            return 'new';
        }
        if ((upvotes / totalVotes) > 0.66) {
            return 'hot';
        }
        if ((downvotes / totalVotes <= 0.66) && balance >= 0 && (upvotes > 100 || downvotes > 100)) {
            return 'controversial';
        }
        if (balance < 0 && totalVotes >= 10) {
            return 'unpopular';
        }
        return 'new';
    }
})();
