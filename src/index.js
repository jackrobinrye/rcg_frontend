PLAYERS_URL = "http://localhost:3000/api/players"

//fetch requests
//asynch  -- promises

//use those classes

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
    
    //ALPHABETIZE BUTTON
    let alphabetizeButton = document.createElement("button")
    alphabetizeButton.innerHTML = "Alphabetize"

    alphabetizeButton.addEventListener("click", (event) => {
        let alphabetizedPlayers = players.data.sort((a, b) => (a.attributes.name > b.attributes.name) ? 1 : -1)
        // console.log(alphabetizedPlayers)
        document.querySelector(".players-div").remove()
        renderPlayers(alphabetizedPlayers)
    })

    document.querySelector("body").append(alphabetizeButton)
    //ALPHABETIZE BUTTON END
    
    
    renderPlayers(players.data)
})


function renderPlayers(playersData) {
    let playersDiv = document.createElement("div")
    playersDiv.classList.add("players-div")
    document.querySelector("body").append(playersDiv)

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
    
    document.querySelector(".players-div").append(playerDiv)
}


function renderCharacters(charactersData, div) {

    charactersData.forEach(character => {
        renderCharacter(character, div)
    })
}


// function renderCharacter(characterObj, div) {
//     characterDiv = document.createElement("div")
//     characterDiv.classList.add("character")

//     characterName = document.createElement("h3")
//     characterName.innerHTML = characterObj.name
//     characterDiv.append(characterName)

//     const tbl = document.createElement("table")
//     tbl.classList.add("paleBlueRows")

//     let tBody = document.createElement("tbody")

//     let cData = []
//     for (key in characterObj){
//         cData.push({[key]: characterObj[key]})
//     }

//     for (let i = 0; i < 5; i++) {
//         let tr = document.createElement("tr")
//             for (let j = i*3; j<i*3+3; j++){
//                 for (key in cData[j]){
//                     if (key === "id" || key === "player_id" || key === "name") {}
//                     else if (key === "cclass") {
//                         value = cData[j][key]
//                         let td = document.createElement("td")
//                         td.innerHTML = `class: ${value}`
//                         tr.append(td)
//                     }
//                     else {
//                         value = cData[j][key]
//                         let td = document.createElement("td")
//                         td.innerHTML = `${key}: ${value}`
//                         tr.append(td)
//                     }
//                 }
//             }   
//             tBody.append(tr)
//     }
//     tbl.append(tBody)
//     characterDiv.append(tbl)
//     div.append(characterDiv)
// }


function summonForm(div){
    let form = document.createElement("form")
    form.setAttribute('method',"post");
    form.setAttribute('action',"submit.php");

    let nameInput = document.createElement("input"); 
    nameInput.setAttribute('type',"text");
    nameInput.setAttribute('name',"name");
    nameInput.placeholder = "Name"
    
    let genderInput = document.createElement("input");
    genderInput.setAttribute('type',"text");
    genderInput.setAttribute('gender',"gender");
    genderInput.placeholder = "Gender"
    
    let ageInput = document.createElement("input"); 
    ageInput.setAttribute('type',"number");
    ageInput.setAttribute('age',"age");
    ageInput.placeholder = "Age"

    let submitButton = document.createElement("input"); 
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