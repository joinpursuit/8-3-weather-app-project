//get the form and 
document.querySelector("form").addEventListener("submit",(event) => {
    //stop the page from refreshing
    event.preventDefault();
    
    //the link for the searches in json
    fetch(`https://wttr.in/${event.location.target.value}?format=j1`)

    .then((result) => {
        //log a success message
        console.log("Fetch was successful")
        //convert from json
        result.json()
    })

    .then((result) => result)
})

