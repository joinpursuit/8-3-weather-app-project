document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    //console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`).then(result => {
        console.log("Fetch was successful")
        return result.json()
    }).then(weather => {
        console.log(weather, "Finally properly formatted weather")
    })
});