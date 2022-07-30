import './style.css';
import * as ui from './modules/ui';
import { Person } from './modules/person';
import { Team } from './modules/team';

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

const addPerson = (e) => {
    e.preventDefault();

    const input = getInput();
    const person = new Person(input.name, input.gender);

    team.add(person);
    updateTeam(team.personList)

    resetInput();
}

const getField = (str) => {
    return str.replace(/^(\w+): /, "");

}

const deletePerson = (e) => {
    const personCard = e.target.parentNode;
    const personName = personCard.childNodes[0].value;
    const personGender = personCard.childNodes[1].value;
    team.delete(new Person(getField(personName), 
    getField(personGender)));
    updateTeam(team.personList);
}

const editPerson = (e) => {
    const personCard = e.target.parentNode;
    const personName = personCard.childNodes[0];
    const personGender = personCard.childNodes[1];

    personName.value = getField(personName.value);
    personGender.value = getField(personGender.value);

    activateEditPanel(personCard);
}

const updatePerson = (e) => {
    const personCard = e.target.parentNode;
    const personName = personCard.childNodes[0].value;
    const personEntryNumber = personCard.childNodes[8].textContent;
    let personGender = 'male';

    if (personCard.childNodes[3].childNodes[0].checked) {
        personGender = 'female';
    }

    const person = new Person(personName, personGender);

    team.update(Number.parseInt(personEntryNumber) - 1, person); 
    updatePersonCard(personCard, Person);
}

const cancelUpdate = (e) => {
    const personCard = e.target.parentNode;
    const personName = personCard.childNodes[0];
    const personGender = personCard.childNodes[1];

    personName.value = `Name: ${personName.value}`;
    personGender.value =  `Gender: ${personGender.value}`;

    deactivateEditPanel(personCard);
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

const updatePersonCard = (div, person) => {
    div.childNodes[0].value = `Name: ${person.name}`;
    div.childNodes[1].value = `Gender: ${person.gender}`;

    deactivateEditPanel(div);
}

const updateTeam = (list) => {
    ui.team.innerHTML = "";
    for (let person of list) {
        createPersonCard(person);
    }
}

const createPersonCard = (person) => {
    const div = document.createElement("div");
    div.classList.add('person');
    
    const name = document.createElement("input");
    name.type = "text"
    name.style.pointerEvents = 'none';
    name.value = `Name: ${person.name}`;

    const gender = document.createElement("input");
    gender.type = "text"
    gender.style.pointerEvents = 'none';
    gender.value = `Gender: ${person.gender}`;

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
    editBtn.onclick = editPerson;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = deletePerson;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.style.display = 'none';
    doneBtn.onclick = updatePerson;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.display = 'none';
    cancelBtn.onclick = cancelUpdate;

    const personEntryNumber = document.createElement("p");
    personEntryNumber.textContent = `${team.getCount()}`;
    personEntryNumber.style.display="none";
    
    div.appendChild(name);
    div.appendChild(gender);
    div.appendChild(spanMale);
    div.appendChild(spanFemale);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    div.appendChild(doneBtn);
    div.appendChild(cancelBtn);
    div.appendChild(personEntryNumber);

    ui.team.appendChild(div);
}

const initialize = (() => {
    ui.addForm.onsubmit = addPerson;
})();