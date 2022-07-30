var _ = require('lodash');

export class Person {
    constructor(name, gender) {
        this.personName = name;
        this.personGender = gender;
    }
    get name() {
        return this.personName;
    }
    set name(newName) {
        this.personName = newName;
    }
    get gender() {
        return this.personGender;
    }
    set gender(newGender) {
        this.personGender = newGender;
    }
    isEqual(person) {
        return _.isEqual(this, person);
    }
    update(person) {
        this.personName = person.name;
        this.personGender = person.gender;
    }
}
