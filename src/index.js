import './style.css';
import * as ui from './modules/ui';
import { Pokemon } from './modules/pokemon';
import { Team } from './modules/pokemonTeam';

const team = new Team();

const getInput = () => {
    return {
        "name": ui.name.value,
        "gender": Array.prototype.filter.call(ui.gender,
            r => r.checked)[0].value
    }
}

const resetInput = () => {
    ui.name.value = "";
    ui.gender[0].checked = true;
}

const addPokemon = (e) => {
    e.preventDefault();

    const input = getInput();
    const pokemon = new Pokemon(input.name, input.gender);

    team.add(pokemon);
    updateTeam(team.pokemonList)

    resetInput();
}

const getField = (str) => {
    return str.replace(/^(\w+): /, "");

}

const deletePokemon = (e) => {
    const pokemonCard = e.target.parentNode;
    const pokemonName = pokemonCard.childNodes[0].value;
    const pokemonGender = pokemonCard.childNodes[1].value;
    team.delete(new Pokemon(getField(pokemonName), 
    getField(pokemonGender)));
    updateTeam(team.pokemonList);
}

const editPokemon = (e) => {
    const pokemonCard = e.target.parentNode;
    const pokemonName = pokemonCard.childNodes[0];
    const pokemonGender = pokemonCard.childNodes[1];

    pokemonName.value = getField(pokemonName.value);
    pokemonGender.value = getField(pokemonGender.value);

    activateEditPanel(pokemonCard);
}

const updatePokemon = (e) => {
    const pokemonCard = e.target.parentNode;
    const pokemonName = pokemonCard.childNodes[0].value;
    const pokemonEntryNumber = pokemonCard.childNodes[8].textContent;
    let pokemonGender = 'male';

    if (pokemonCard.childNodes[3].childNodes[0].checked) {
        pokemonGender = 'female';
    }

    const pokemon = new Pokemon(pokemonName, pokemonGender);

    team.update(Number.parseInt(pokemonEntryNumber) - 1, pokemon); 
    updatePokemonCard(pokemonCard, pokemon);
}

const cancelUpdate = (e) => {
    const pokemonCard = e.target.parentNode;
    const pokemonName = pokemonCard.childNodes[0];
    const pokemonGender = pokemonCard.childNodes[1];

    pokemonName.value = `Name: ${pokemonName.value}`;
    pokemonGender.value =  `Gender: ${pokemonGender.value}`;

    deactivateEditPanel(pokemonCard);
}

const activateEditPanel = (div) => {
    div.childNodes[0].style.pointerEvents = 'all';
    div.childNodes[1].style.display = 'none';
    div.childNodes[2].style.display = 'inline-block';
    div.childNodes[3].style.display = 'inline-block';
    div.childNodes[4].style.display = 'none';
    div.childNodes[5].style.display = 'none';
    div.childNodes[6].style.display = 'inline-block';
    div.childNodes[7].style.display = 'inline-block';
}

const deactivateEditPanel = (div) => {
    div.childNodes[0].style.pointerEvents = 'none';
    div.childNodes[1].style.display = 'inline-block';
    div.childNodes[2].style.display = 'none';
    div.childNodes[3].style.display = 'none';
    div.childNodes[4].style.display = 'inline-block';
    div.childNodes[5].style.display = 'inline-block';
    div.childNodes[6].style.display = 'none';
    div.childNodes[7].style.display = 'none';
}

const updatePokemonCard = (div, pokemon) => {
    div.childNodes[0].value = `Name: ${pokemon.name}`;
    div.childNodes[1].value = `Gender: ${pokemon.gender}`;

    deactivateEditPanel(div);
}

const updateTeam = (list) => {
    ui.team.innerHTML = "";
    for (let pokemon of list) {
        createPokemonCard(pokemon);
    }
}

const createPokemonCard = (pokemon) => {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    
    const name = document.createElement("input");
    name.type = "text"
    name.style.pointerEvents = 'none';
    name.value = `Name: ${pokemon.name}`;

    const gender = document.createElement("input");
    gender.type = "text"
    gender.style.pointerEvents = 'none';
    gender.value = `Gender: ${pokemon.gender}`;

    const spanMale = document.createElement("span");
    spanMale.style.display = "none";

    const male = document.createElement("input");
    male.type = "radio";
    male.name = "gender";
    male.checked = true;
    male.value = 'male';

    const labelMale = document.createElement("label");
    labelMale.textContent = "Male";

    spanMale.appendChild(male);
    spanMale.appendChild(labelMale);

    const spanFemale = document.createElement("span");
    spanFemale.style.display = "none";

    const female = document.createElement("input");
    female.type = "radio";
    female.name = "gender";
    female.checked = false;
    female.value = 'female';

    const labelFemale = document.createElement("label");
    labelFemale.textContent = "Female";

    spanFemale.appendChild(female);
    spanFemale.appendChild(labelFemale);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = editPokemon;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = deletePokemon;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.style.display = 'none';
    doneBtn.onclick = updatePokemon;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.display = 'none';
    cancelBtn.onclick = cancelUpdate;

    const pokemonEntryNumber = document.createElement("p");
    pokemonEntryNumber.textContent = `${team.getCount()}`;
    pokemonEntryNumber.style.display="none";
    
    div.appendChild(name);
    div.appendChild(gender);
    div.appendChild(spanMale);
    div.appendChild(spanFemale);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    div.appendChild(doneBtn);
    div.appendChild(cancelBtn);
    div.appendChild(pokemonEntryNumber);

    ui.team.appendChild(div);
}

const initialize = (() => {
    ui.addForm.onsubmit = addPokemon;
})();