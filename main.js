const URL = "https://v3.wttr.in/"

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    // console.log(`${URL}${event.target.place.value}?format=j1`)
    fetch(`${URL}${event.target.place.value}?format=j1`)
        .then( result => {
            // console.log('Fetch successful')
            return result.json()
        }).then (weather => {
            console.log(weather)
        })
})