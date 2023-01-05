    document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`)
    .then(result => {
       return result.json()
    })
    .then(weather => {
        console.log(weather)
    })
})