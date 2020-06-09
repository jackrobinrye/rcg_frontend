console.log("in player.js")
class Player {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.gender = data.gender
        this.age = data.age
        this.characters = []
        data.characters.forEach(character => {
            let c = new Character(character)
            this.characters.push(c)
        });
        Player.all.push(this)
    }

}

Player.all = [];