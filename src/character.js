console.log("in character.js")
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

}

Character.all = [];