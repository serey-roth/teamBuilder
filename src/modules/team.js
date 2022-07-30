var _ = require('lodash');

export class Team {
    constructor() {
        this.list = [];
    }
    add(person) {
        this.list.push(person);
    }
    update(index, newPerson) {
        const person = this.list[index];
        person.update(newPerson);
    }
    delete(person) {
        this.list = this.list.filter(p => !p.isEqual(person));
    }
    get personList() {
        return this.list;
    }
    getCount() {
        return this.list.length;
    }
}