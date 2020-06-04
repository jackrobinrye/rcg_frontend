PLAYERS_URL = "http://localhost:3000/api/players"

document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded")

    function fetchPlayers() {
        fetchPlayers()
    }

    fetch(PLAYERS_URL)
        .then(response => response.json())
        .then(players => {
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
    //add name (h2) to the div
    //render characters
}

function renderCharacters(charactersData) {
    charactersData.forEach(character => {
        renderCharacter(character)
    })
}

function renderCharacter(characterData) {
    //create a character div
    //add name (h3) to the div
    //create a 3x4 table
    //populate the table with the character data
}