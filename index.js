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

            renderPlayers(players.data)
        })
    }

)

function renderPlayers(playersData) {
    // console.log(playersData)
    playersData.forEach(player => {
        // console.log("rendering a player")
        renderPlayer(player);
    });
}

function renderPlayer(playerData) {
    //create playerDiv
    let playerDiv = document.createElement("div");

    //add attributes to playerDiv
    playerDiv.classList.add("player")
    playerDiv.setAttribute("player-id", `${playerData.id}`)
    
    //create and add playerName (h2) to the div
    let playerName = document.createElement("h2");
    playerName.innerHTML = playerData.attributes.name 
    playerDiv.append(playerName)
    
    //render characters
    playerDiv.append(renderCharacters(playerData.attributes.characters))
    
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
                    console.log(character)
                    if (character.message) {
                        alert(character.message)
                    } 
                    else {
                        renderCharacter(character)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        
    });


    //add addCharacter button to the div
    playerDiv.append(addCharacterButton)



    //add playerDiv to the body
    document.querySelector("body").append(playerDiv)
}

function renderCharacters(charactersData) {
    //create a charactersDiv
    let charactersDiv = document.createElement("div")

    //give charactersDiv attributes
    charactersDiv.classList.add("characters")

    //loop through characters and render each individual character
    charactersData.forEach(character => {
        charactersDiv.append(renderCharacter(character))
    })

    //return the charactersDiv to be appended to the playerDiv above
    return charactersDiv
}

function renderCharacter(characterData) {
    //create a characterDiv
    characterDiv = document.createElement("div")

    //give the characterDiv attributes
    characterDiv.classList.add("character")
    characterDiv.setAttribute("character-id", `${characterData.id}`)

    //create and add name (h3) to the div
    characterName = document.createElement("h3")
    characterName.innerHTML = characterData.name
    characterDiv.append(characterName)

    //TEMPORARY: list off each attribute
    for (let [key, value] of Object.entries(characterData)) {
        attribute = document.createElement("p")
        attribute.innerHTML = `${key}: ${value}`
        characterDiv.append(attribute)
    }

    //create a table
    const tbl = document.createElement("table")

    //create the header
    let cap = document.createElement("caption")
    cap.innerHTML = characterData.name

    //create the table body
    let body = document.createElement("tbody")
    
    //populate the table with the character data
    for (let i = 0; i < 13; i++) {
        for (let [key, value] of Object.entries(characterData)) {
            if (key === "id" || key === "player_id" || key === "name" || key === "created_at" || key === "updated_at") {
                console.log(`${key} HELLO HELLO HELLO`)
            }
            else {
                console.log(`${key}: ${value}`)
            }
        }
        
    }


    //add everything

    //add the final stuff to the playerDiv
    return characterDiv
}