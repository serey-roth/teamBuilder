var _ = require('lodash');

export class Pokemon {
    constructor(name, gender) {
        this.pokemonName = name;
        this.pokemonGender = gender;
    }
    get name() {
        return this.pokemonName;
    }
    set name(newName) {
        this.pokemonName = newName;
    }
    get gender() {
        return this.pokemonGender;
    }
    set gender(newGender) {
        this.pokemonGender = newGender;
    }
    isEqual(pokemon) {
        return _.isEqual(this, pokemon);
    }
    update(pokemon) {
        this.pokemonName = pokemon.name;
        this.pokemonGender = pokemon.gender;
    }
}
