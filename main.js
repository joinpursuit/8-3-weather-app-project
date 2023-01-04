document.querySelector('.form').addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "This is our weather search link!");
    fetch (`https://v3.wttr.in/${event.target.location.value}?format=j1`)
    .then(result => {
        return result.json()
    }).then(weather => {
        console.log(weather, 'This is our weather info!')
    })
})