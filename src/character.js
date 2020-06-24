class Character {
    constructor(data) {
        this.id = data.id
        this.player_id = data.player_id
        this.name = data.name
        this.race = data.race
        this.cclass = data.cclass
        this.gender = data.gender
        this.background = data.background
        this.alignment = data.alignment
        this.age = data.age
        this.strength = data.strength
        this.dexterity = data.dexterity
        this.constitution = data.constitution
        this.intelligence = data.intelligence
        this.wisdom = data.wisdom
        this.charisma = data.charisma
        Character.all.push(this)
    } 

    render() {
        // debugger
        characterDiv = document.createElement("div")
        characterDiv.classList.add("character")
    
        characterName = document.createElement("h3")
        characterName.innerHTML = this.name
        characterDiv.append(characterName)
    
        const tbl = document.createElement("table")
        tbl.classList.add("paleBlueRows")
    
        let tBody = document.createElement("tbody")
    
        let cData = []
        for (key in this){
            cData.push({[key]: this[key]})
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
        // div.append(characterDiv)
        return characterDiv
    }

}

Character.all = [];