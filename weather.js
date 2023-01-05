document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "Default not popping up, you're good")
    fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`).then(result => {
        console.log("Fetch was successful")
        return result.json()
    }).then(weather => {
        console.log(weather, "Formatted weather")
    })
});