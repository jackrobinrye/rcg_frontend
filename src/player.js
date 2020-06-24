class Player {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.gender = data.gender
        this.age = data.age
        this.characters = []
        if(data.characters) {
            data.characters.forEach(character => {
                let c = new Character(character)
                this.characters.push(c)
            });
        }
        Player.all.push(this)
    }

    render() {
        let playerDiv = document.createElement("div");
        playerDiv.classList.add(`player-id-${this.id}`)
        
        let playerName = document.createElement("h1");
        playerName.classList.add("playerName")
        playerName.innerHTML = `${this.name} (${this.age}, ${this.gender})` 
        playerDiv.append(playerName)
    
        //ADD CHARACTER BUTTON\\
        let addCharacterButton = document.createElement("button")
        addCharacterButton.innerHTML = "Add New Character"
        addCharacterButton.setAttribute("button-player-id", `${this.id}`)
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
                    .then(characterData => {
                        if (characterData.message) {
                            alert(characterData.message)
                        } 
                        else {
                            let character = new Character(characterData)
                            const div = document.getElementsByClassName(`player-id-${character.player_id}`)[0]
                            div.append(character.render())
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
        });
         
        playerDiv.append(addCharacterButton)
        //\\END ADD CHARACTER BUTTON//
    
        if(this.characters){
            renderCharacters(this.characters, playerDiv)
        }
        
        document.querySelector(".players-div").append(playerDiv)
    }

}

Player.all = [];