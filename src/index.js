PLAYERS_URL = "http://localhost:3000/api/players"

//fetch requests
//asynch  -- promises

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
        p.render();
    });
}


function renderCharacters(charactersData, div) {

    charactersData.forEach(character => {
        div.append(character.render())
    })
}


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
                    let p = new Player(player)
                    p.render()
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