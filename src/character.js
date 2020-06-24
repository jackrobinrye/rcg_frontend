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
        let characterDiv = document.createElement("div")
        characterDiv.classList.add("character")
    
        let characterName = document.createElement("h3")
        characterName.innerHTML = this.name
        characterDiv.append(characterName)
    
        const tbl = document.createElement("table")
        tbl.classList.add("paleBlueRows")
    
        let tBody = document.createElement("tbody")
    
        let cData = []
        Object.keys(this).forEach(element =>
            cData.push({[element]: this[element]})
        )
    
        for (let i = 0; i < 5; i++) {
            let tr = document.createElement("tr")
                for (let j = i*3; j<i*3+3; j++){
                    let thisKey = Object.keys(cData[j])[0] 
                    let value;
                    if (thisKey === "id" || thisKey === "player_id" || thisKey === "name") {}
                    else if (thisKey === "cclass") {
                        value = cData[j][thisKey]
                        let td = document.createElement("td")
                        td.innerHTML = `class: ${value}`
                        tr.append(td)
                    }
                    else {
                        value = cData[j][thisKey]
                        let td = document.createElement("td")
                        td.innerHTML = `${thisKey}: ${value}`
                        tr.append(td)
                    }
                }   
                tBody.append(tr)
        }
        tbl.append(tBody)
        characterDiv.append(tbl)
        return characterDiv
    }

}

Character.all = [];