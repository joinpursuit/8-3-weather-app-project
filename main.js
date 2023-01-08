const BASE_URL = "https://wttr.in/"
let sub = document.getElementById("submit")
let txt = document.getElementById("text")
let main = document.querySelector("main")



sub.addEventListener("click", (event) => {
    event.preventDefault()


    fetch(
        `${BASE_URL}${txt.value}?format=j1`
    ).then((response) => response.json())
        .then((result) => {

            console.log(result.current_condition)
            // main.innerText = result.current_condition[0].FeelsLikeF

            // area , region, country, currently(feels like)

        })
        .catch((error) => console.log(error))


})