function solve() {
    let list = [];

    return {
        add: function (num) {
            list.push(num);
            list.sort((a, b) => a - b);
            this.size++;
        },
        remove: function (index) {
            if (index >= 0 && index < list.length) {
                list.splice(index, 1);
                this.size--;
            }
        },
        get: function (index) {
            return list[index];
        },
        size: 0
    };
}