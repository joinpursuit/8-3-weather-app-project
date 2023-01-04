//get the form and 
document.querySelector("form").addEventListener("submit",(event) => {
    //stop the page from refreshing
    event.preventDefault();

    //the link for the searches in json
    fetch(`https://wttr.in/${event.location.target.value}?format=j1`)

    .then((res) => {
        //log a success message
        console.log("Fetch was successful")
        //convert from json
        res.json()
    })

    .then((result) => {
        //place the link to the search in previous section

        //place the results in the main .searched article

        //create 3 articles with today, tomorrow, and day after tomorrow results

        





    })
})

