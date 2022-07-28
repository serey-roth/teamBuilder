var _ = require('lodash');

export class Team {
    constructor() {
        this.list = [];
    }
    add(pokemon) {
        this.list.push(pokemon);
    }
    update(index, newPokemon) {
        const pokemon = this.list[index];
        pokemon.update(newPokemon);
    }
    delete(pokemon) {
        this.list = this.list.filter(p => !p.isEqual(pokemon));
    }
    get pokemonList() {
        return this.list;
    }
    getCount() {
        return this.list.length;
    }
}