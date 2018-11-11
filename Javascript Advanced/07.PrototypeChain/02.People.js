function solve() {
    class Employee {
        constructor(name, age, tasks) {
            this.name = name;
            this.age = age;
            this.tasks = tasks;
            this.salary = 0;
            this.currentTaskIndex = 0;
        }

        work() {
            console.log(`${this.name} ${this.tasks[this.currentTaskIndex++]}`);
            this.currentTaskIndex %= this.tasks.length;
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }

        getSalary() {
            return this.salary;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age, [
                'is working on a simple task.'
            ]);
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age, [
                'is working on a complicated task.',
                'is taking time off work.',
                'is supervising junior workers.'
            ]);
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age, [
                'scheduled a meeting.',
                'is preparing a quarterly report.'
            ]);
            this.dividend = 0;
        }

        getSalary() {
            return this.salary + this.dividend;
        }
    }

    return {Employee, Junior, Manager, Senior};
}