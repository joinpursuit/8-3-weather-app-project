const BASE_URL = 'https://wttr.in/'
const city = 'Detroit'

fetch(`${BASE_URL}${city}?format=j1`)
    .then((response) => {
      return response.json();
    })
    .then(console.log)
    .catch((err) => {
      console.log(err)
      });