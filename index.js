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

// have a release button for each pokemon
// let releaseButton = document.createElement("button");
// releaseButton.innerHTML = "Release"
// releaseButton.classList.add("release")
// releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`)

function renderPlayer(playerData) {
    console.log(playerData)
    //create payer div and add to the DOM
    let playerDiv = document.createElement("div");
    //create and add name (h2) to the div
    let playerName = document.createElement("h2");
    playerName.innerHTML = playerData.attributes.name 
    playerDiv.append(playerName)
    //create and add addCharacter button to the div
    let addCharacterButton = document.createElement("button")
    addCharacterButton.innerHTML = "Add New Character"
    playerDiv.append(addCharacterButton)
    //render characters
    renderCharacters(playerData.attributes.characters)


    document.querySelector("body").append(playerDiv)
}

function renderCharacters(charactersData) {
    charactersData.forEach(character => {
        console.log(character)
        // renderCharacter(character)
    })
}

function renderCharacter(characterData) {
    //create a character div
    //add name (h3) to the div
    //create a 3x4 table
    //populate the table with the character data
}