PLAYERS_URL = "http://localhost:3000/api/players"

document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded")

    function fetchPlayers() {
        fetchPlayers()
    }

    fetch(PLAYERS_URL)
        .then(response => response.json())
        .then(players => {
            //create title and add to DOM
            let title = document.createElement("h1")
            title.innerText = "Random Character Generator"
            document.querySelector("body").append(title)

            //create createPlayer div and button and add to DOM
            let createPlayerButtonDiv = document.createElement("div")

            let createPlayerButton = document.createElement("button")
            createPlayerButton.innerHTML = "Add Player"

            //create event listener for the createPlayerButton 
            createPlayerButton.addEventListener("click", event => {
                summonForm(event.target.parentElement)});

            createPlayerButtonDiv.append(createPlayerButton)
            document.querySelector("body").append(createPlayerButtonDiv)

            


            renderPlayers(players.data)
        })
    }

)





//RENDER ALL PLAYERS
function renderPlayers(playersData) {
    // console.log(playersData)
    playersData.forEach(player => {
        // console.log("rendering a player")
        renderPlayer(player);
    });
}





//RENDER SINGLE PLAYER
function renderPlayer(playerData) {
    //create playerDiv
    let playerDiv = document.createElement("div");

    //add attributes to playerDiv
    playerDiv.classList.add(`player-id-${playerData.id}`)
    playerDiv.setAttribute("player-id", `${playerData.id}`)
    
    //create and add playerName (h2) to the div
    let playerName = document.createElement("h2");
    playerName.innerHTML = playerData.attributes.name 
    playerDiv.append(playerName)



    //BUTTON FOR ADD CHARACTER WITHIN RENDER PLAYER\\
    //create addCharacter button
    let addCharacterButton = document.createElement("button")
    addCharacterButton.innerHTML = "Add New Character"
    addCharacterButton.setAttribute("button-player-id", `${playerData.id}`)

    //create event listener for the addCharacter button
    addCharacterButton.addEventListener("click", (event) => {

        //prevent default
        event.preventDefault
        // debugger

        // STILL DON'T UNDERSTAND THIS FULLY ASK QUESTIONS
        const addConfigObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                player_id: event.target.getAttribute('button-player-id')
                // trainer_id: event.target.dataset.trainerId
            })
        }

        //
        fetch("http://localhost:3000/api/characters", addConfigObj)
                .then(resp => resp.json())
                .then(character => {
                    if (character.message) {
                        alert(character.message)
                    } 
                    else {
                        const div = document.getElementsByClassName(`player-id-${character.player_id}`)[0]
                        renderCharacter(character, div)
                        console.log(character)
                        console.log("")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        
    });
     
    //add addCharacter button to the div
    playerDiv.append(addCharacterButton)
    //\\BUTTON//



    
    //RENDER ALL CHARACTERS METHOD CALL
    renderCharacters(playerData.attributes.characters, playerDiv)
    



    //add playerDiv to the body
    document.querySelector("body").append(playerDiv)
}





//RENDER ALL CHARACTERS DEFINITION
function renderCharacters(charactersData, div) {
    //create a charactersDiv
    let charactersDiv = document.createElement("div")

    //give charactersDiv attributes
    charactersDiv.classList.add("characters")

    //loop through characters and render each individual character
    charactersData.forEach(character => {
        renderCharacter(character, div)
    })

    //return the charactersDiv to be appended to the playerDiv above
    return charactersDiv
}




//RENDER SINGLE CHARACTER
function renderCharacter(characterData, div) {
    //create a characterDiv
    characterDiv = document.createElement("div")

    //give the characterDiv attributes
    characterDiv.classList.add("character")
    characterDiv.setAttribute("character-id", `${characterData.id}`)

    //create and add name (h3) to the div
    characterName = document.createElement("h3")
    characterName.innerHTML = characterData.name
    characterDiv.append(characterName)

    // //create a table
    const tbl = document.createElement("table")

    // //create the table body
    let tBody = document.createElement("tbody")
    
    let cData = []
    for (key in characterData){
        cData.push({[key]: characterData[key]})
    }

    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr")
            for (let j = i*3; j<i*3+3; j++){
                for (key in cData[j]){
                    if (key === "id" || key === "player_id" || key === "name" || key === "created_at" || key === "updated_at") {
                    }
                    else if(key === "cclass"){
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
        // }
    }
    tbl.append(tBody)
    characterDiv.append(tbl)

    //add the final stuff to the playerDiv
    div.append(characterDiv)
}


//summonForm 
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

    var dmInput = document.createElement("INPUT");
    dmInput.setAttribute("type", "checkbox")
    dmInput.setAttribute('name',"username");

    let submitButton = document.createElement("input"); //input element, submit button
    submitButton.setAttribute('type',"submit");
    submitButton.setAttribute('value',"Submit");

    // debugger

    //add event listener to submit button
//!!!!!!!!!!!!!!!!THIS IS WHERE I'M WORKING CURRENTLY
    submitButton.addEventListener("click", (event) => {
        // debugger

        event.preventDefault

        const addPlayerConfigObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                // player_id: event.target.getAttribute('button-player-id')
                name: event.target.parentElement.childNodes[0].value,
                gender: event.target.parentElement.childNodes[1].value,
                age: event.target.parentElement.childNodes[2].value,
                dm: event.target.parentElement.childNodes[3].value

            })
        }

        //
        fetch("http://localhost:3000/api/players", addPlayerConfigObj)
            .then(resp => resp.json())
            .then(player => {
                if (player.message) {
                    alert(player.message)
                } 
                else {
                    // debugger
                    console.log(player)
                    // renderNewPlayer()
                }
            })
            .catch((error) => {
                console.log(error)
            })

            
        })
        
        form.append(nameInput);
        form.append(genderInput);
        form.append(ageInput);
        form.append(dmInput);
        form.append(submitButton);
        div.append(form)


}






function renderNewPlayer(name, gender, age, dm) {
    //create playerDiv
    let playerDiv = document.createElement("div");

    //add attributes to playerDiv
    playerDiv.classList.add(`player-id-${playerData.id}`)
    playerDiv.setAttribute("player-id", `${playerData.id}`)
    
    //create and add playerName (h2) to the div
    let playerName = document.createElement("h2");
    playerName.innerHTML = playerData.attributes.name 
    playerDiv.append(playerName)



    //BUTTON\\
    //create addCharacter button
    let addCharacterButton = document.createElement("button")
    addCharacterButton.innerHTML = "Add New Character"
    addCharacterButton.setAttribute("button-player-id", `${playerData.id}`)

    //create event listener for the addCharacter button
    addCharacterButton.addEventListener("click", (event) => {

        //prevent default
        event.preventDefault
        // debugger

        // STILL DON'T UNDERSTAND THIS FULLY ASK QUESTIONS
        const addConfigObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                player_id: event.target.getAttribute('button-player-id')
                // trainer_id: event.target.dataset.trainerId
            })
        }

        //
        fetch("http://localhost:3000/api/characters", addConfigObj)
                .then(resp => resp.json())
                .then(character => {
                    if (character.message) {
                        alert(character.message)
                    } 
                    else {
                        const div = document.getElementsByClassName(`player-id-${character.player_id}`)[0]
                        renderCharacter(character, div)
                        console.log(character)
                        console.log("")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        
    });
     
    //add addCharacter button to the div
    playerDiv.append(addCharacterButton)
    //\\BUTTON//



    
    //render characters
    renderCharacters(playerData.attributes.characters, playerDiv)

    //add playerDiv to the body
    document.querySelector("body").append(playerDiv)
}