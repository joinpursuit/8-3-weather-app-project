document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`)
    .then((result) => {
      return result.json();
    })
    .then((weather) => {

        let main = document.getElementsByClassName(".main");
        main.article.innerHTML = weather.nearest_area[0].areaName[0].value

        // let h1 = `<h1>{weather.nearest_area[0].areaName[0].value}</h1>`;
        // // document.main.article.innerHTML = h1
        
        // console.log(weather.nearest_area[0].areaName[0].value)
    });
});







// document.querySelector("form").addEventListener("submit", (event) => {
//     event.preventDefault()
//     console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")
//     fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`).then(result => {
//         console.log("Fetch was successful")
//         return result.json()
//     }).then(weather => {
//         console.log(weather, "Finally properly formatted weather")
//     })
// });
