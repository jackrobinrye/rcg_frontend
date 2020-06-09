console.log("in player.js")
class Player {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.gender = data.gender
        this.age = data.age
        Player.all.push(this)
    }

}

Player.all = [];