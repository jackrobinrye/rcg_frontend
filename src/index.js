PLAYERS_URL = "http://localhost:3000/api/players"

document.addEventListener("DOMContentLoaded", () => {

    fetch(PLAYERS_URL)
        .then(response => response.json())
        .then(players => {
            let title = document.createElement("h1")
            title.classList.add("title")
            title.innerText = "Random Character Generator"
            document.querySelector("body").append(title)


            //CREATE PLAYER BUTTON\\
            let createPlayerButtonDiv = document.createElement("div")
            createPlayerButtonDiv.classList.add("createPlayerButtonDiv")
            let createPlayerButton = document.createElement("button")
            createPlayerButton.innerHTML = "Add Player"

            createPlayerButton.addEventListener("click", event => {
                summonForm(event.target.parentElement)
            })

            createPlayerButtonDiv.append(createPlayerButton)
            document.querySelector("body").append(createPlayerButtonDiv)
            //\\END CREATE PLAYER BUTTON//
            
            
            renderPlayers(players.data)
        })
    }

)


function renderPlayers(playersData) {
    playersData.forEach(player => {
        const playerData = {...{id: player.id}, ...player.attributes}
        p = new Player(playerData)
        renderPlayer(p);
    });
}


function renderPlayer(player) {
    let playerDiv = document.createElement("div");
    playerDiv.classList.add(`player-id-${player.id}`)
    
    let playerName = document.createElement("h1");
    playerName.classList.add("playerName")
    playerName.innerHTML = `${player.name} (${player.age}, ${player.gender})` 
    playerDiv.append(playerName)

    //ADD CHARACTER BUTTON\\
    let addCharacterButton = document.createElement("button")
    addCharacterButton.innerHTML = "Add New Character"
    addCharacterButton.setAttribute("button-player-id", `${player.id}`)
    addCharacterButton.addEventListener("click", (event) => {
        event.preventDefault()
        const addConfigObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                player_id: event.target.getAttribute('button-player-id')
            })
        }

        fetch("http://localhost:3000/api/characters", addConfigObj)
                .then(resp => resp.json())
                .then(character => {
                    if (character.message) {
                        alert(character.message)
                    } 
                    else {
                        const div = document.getElementsByClassName(`player-id-${character.player_id}`)[0]
                        renderCharacter(character, div)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
    });
     
    playerDiv.append(addCharacterButton)
    //\\END ADD CHARACTER BUTTON//

    if(player.characters){
        renderCharacters(player.characters, playerDiv)
    }
    
    document.querySelector("body").append(playerDiv)
}


function renderCharacters(charactersData, div) {

    charactersData.forEach(character => {
        let characterObj = new Character(character)
        renderCharacter(characterObj, div)
    })
}


function renderCharacter(characterObj, div) {
    characterDiv = document.createElement("div")
    characterDiv.classList.add("character")

    characterName = document.createElement("h3")
    characterName.innerHTML = characterObj.name
    characterDiv.append(characterName)

    const tbl = document.createElement("table")
    tbl.classList.add("paleBlueRows")

    let tBody = document.createElement("tbody")
    let cData = []
    for (key in characterObj){
        cData.push({[key]: characterObj[key]})
    }

    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr")
            for (let j = i*3; j<i*3+3; j++){
                for (key in cData[j]){
                    if (key === "id" || key === "player_id" || key === "name") {}
                    else if (key === "cclass") {
                        value = cData[j][key]
                        let td = document.createElement("td")
                        td.innerHTML = `class: ${value}`
                        tr.append(td)
                    }
                    else {
                        value = cData[j][key]
                        let td = document.createElement("td")
                        td.innerHTML = `${key}: ${value}`
                        tr.append(td)
                    }
                }
            }   
            tBody.append(tr)
    }
    tbl.append(tBody)
    characterDiv.append(tbl)
    div.append(characterDiv)
}


function summonForm(div){
    let form = document.createElement("form")
    form.setAttribute('method',"post");
    form.setAttribute('action',"submit.php");

    let nameInput = document.createElement("input"); //input element, text
    nameInput.setAttribute('type',"text");
    nameInput.setAttribute('name',"name");
    nameInput.innerText = "Name"
    
    let genderInput = document.createElement("input"); //input element, text
    genderInput.setAttribute('type',"text");
    genderInput.setAttribute('gender',"gender");
    genderInput.innerHTML = "Gender"
    
    let ageInput = document.createElement("input"); //input element, text
    ageInput.setAttribute('type',"number");
    ageInput.setAttribute('age',"age");
    ageInput.innerHTML = "Age"

    let submitButton = document.createElement("input"); //input element, submit button
    submitButton.setAttribute('type',"submit");
    submitButton.setAttribute('value',"Submit");
    submitButton.addEventListener("click", (event) => {

        event.preventDefault()

        const addPlayerConfigObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                //!!!!!!!!!!is there a cleaner way to do this?
                name: event.target.parentElement.childNodes[0].value,
                gender: event.target.parentElement.childNodes[1].value,
                age: event.target.parentElement.childNodes[2].value

            })
        }

        fetch(PLAYERS_URL, addPlayerConfigObj)
            .then(resp => resp.json())
            .then(player => {
                if (player.message) {
                    alert(player.message)
                } 
                else {
                    renderPlayer(player)
                    div.removeChild(form)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        })

        form.append(nameInput);
        form.append(genderInput);
        form.append(ageInput);
        form.append(submitButton);
        div.append(form)
}