PLAYERS_URL = "http://localhost:3000/api/players"

document.addEventListener("DOMContentLoaded", () => {

    fetch(PLAYERS_URL)
        .then(response => response.json())
        .then(players => {
            //create title and add to DOM
            let title = document.createElement("h1")
            title.classList.add("title")
            title.innerText = "Random Character Generator"
            document.querySelector("body").append(title)


            //CREATE PLAYER BUTTON\\
            //create createPlayer div and button and add to DOM
            let createPlayerButtonDiv = document.createElement("div")
            createPlayerButtonDiv.classList.add("createPlayerButtonDiv")
            let createPlayerButton = document.createElement("button")
            createPlayerButton.innerHTML = "Add Player"

            //create event listener for the createPlayerButton 
            createPlayerButton.addEventListener("click", event => {
                summonForm(event.target.parentElement)
            })

            //append the button and divv
            createPlayerButtonDiv.append(createPlayerButton)
            document.querySelector("body").append(createPlayerButtonDiv)
            //\\CREATE PLAYER BUTTON//
            
            
            renderPlayers(players.data)
        })
    }

)





//RENDER ALL PLAYERS
function renderPlayers(playersData) {
    playersData.forEach(player => {
        const playerData = {...{id: player.id}, ...player.attributes}
        p = new Player(playerData)
        renderPlayer(p);
    });
}




//RENDER SINGLE PLAYER
function renderPlayer(player) {
    //create playerDiv
    let playerDiv = document.createElement("div");

    //add attributes to playerDiv
    playerDiv.classList.add(`player-id-${player.id}`)
    playerDiv.setAttribute("player-id", `${player.id}`)
    
    //create and add playerName (h2) to the div
    let playerName = document.createElement("h1");
    playerName.classList.add("playerName")

    playerName.innerHTML = `${player.name} (${player.age}, ${player.gender})` 
    playerDiv.append(playerName)




    //BUTTON FOR ADD CHARACTER WITHIN RENDER PLAYER\\
    //create addCharacter button
    let addCharacterButton = document.createElement("button")
    addCharacterButton.innerHTML = "Add New Character"
    addCharacterButton.setAttribute("button-player-id", `${player.id}`)

    //create event listener for the addCharacter button
    addCharacterButton.addEventListener("click", (event) => {

        //prevent default
        event.preventDefault()

        // STILL DON'T UNDERSTAND THIS FULLY ASK QUESTIONS
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
    if(player.characters){
        renderCharacters(player.characters, playerDiv)
    }
    



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
        let characterObj = new Character(character)
        renderCharacter(characterObj, div)
    })
}




//RENDER SINGLE CHARACTER
function renderCharacter(characterObj, div) {
    //create a characterDiv
    characterDiv = document.createElement("div")

    //give the characterDiv attributes
    characterDiv.classList.add("character")
    characterDiv.setAttribute("character-id", `${characterObj.id}`)

    //create and add name (h3) to the div
    characterName = document.createElement("h3")
    characterName.innerHTML = characterObj.name
    characterDiv.append(characterName)

    // //create a table
    const tbl = document.createElement("table")
    tbl.classList.add("paleBlueRows")

    // //create the table body
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

    let submitButton = document.createElement("input"); //input element, submit button
    submitButton.setAttribute('type',"submit");
    submitButton.setAttribute('value',"Submit");

    

    //add event listener to submit button
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

        //fetch to render newly created player
        fetch(PLAYERS_URL, addPlayerConfigObj)
            .then(resp => resp.json())
            .then(player => {
                if (player.message) {
                    alert(player.message)
                } 
                else {
                    //render newly created player
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