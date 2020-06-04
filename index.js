PLAYERS_URL = "http://localhost:3000/api/players"

document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded")

    fetch(PLAYERS_URL, {mode: 'no-cors'})
    .then(function(response) {
        console.log(response); 
        console.log(response.json()); 
        console.log("not the catch")
    }).catch(function(error) {  
        console.log('Request failed', error)  
    });

    // function fetchPlayers() {
    // fetch(PLAYERS_URL, {mode: 'no-cors'})
    //     .then(response => response.json())
    //     .then(players => {
    //         console.log(players);
    //     })
    // }
    // fetchPlayers()
})