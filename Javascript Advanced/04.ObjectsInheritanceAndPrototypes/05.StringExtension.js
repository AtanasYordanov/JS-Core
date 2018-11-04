(() => {
        String.prototype.ensureStart = function (str) {
            const current = this.valueOf();
            return !this.startsWith(str) ? str + current : current;
        };

        String.prototype.ensureEnd = function (str) {
            const current = this.valueOf();
            return !this.endsWith(str) ? current + str : current;
        };

        String.prototype.isEmpty = function () {
            return this.valueOf() === '';
        };

        String.prototype.truncate = function (n) {
            const current = this.valueOf();
            if (this.length <= n) {
                return this.valueOf();
            }
            if (current.includes(' ') && current.indexOf(' ') <= n - 3) {
                let index = -1;
                let next = current.indexOf(' ', index + 1);
                while (next > -1 && next <= n - 3) {
                    index = current.indexOf(' ', index + 1);
                    next = current.indexOf(' ', index + 1);
                }
                return current.substring(0, index) + '.'.repeat(3);
            }
            if (n < 4) {
                return '.'.repeat(n);
            }
            return current.substring(0, n - 3) + '.'.repeat(3);
        };

        String.format = function (str) {
            for (let i = 0; i < arguments.length - 1; i++) {
                str = str.replace(`{${i}}`, arguments[i + 1]);
            }
            return str;
        };
    }
)();