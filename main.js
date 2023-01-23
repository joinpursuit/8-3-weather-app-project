
document.querySelector("header form").addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")
    fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`).then(result => {
        console.log("Fetch was successful")
        return result.json()
    }).then(weather => {
        console.log(weather, "Finally properly formatted weather")

        let previousLi = document.createElement('li');
        let previousValue = document.querySelector('input').value;
        let currently = weather.current_condition[0].FeelsLikeF
        let sunshine = weather.weather[0].hourly[0].chanceofsunshine
        let rain = weather.weather[0].hourly[0].chanceofrain
        let snow = weather.weather[0].hourly[0].chanceofsnow
        function createWeather(){
        //grabbing first 'article' element on page.
        let firstArt = document.querySelector('article');

        //getting the city name that is searched
        let city = weather.nearest_area[0].areaName[0].value
        console.log(city)

        //updating the text in the first artlice to the city searched
        firstArt.innerHTML = `<h1>${city}</h1>`

        //creating an unordered list
        let ul = document.createElement('ul');

        //creating list item
        //updating list item content
        let listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Nearest Area:</strong> ${city}`

        //grabbing region value
        let region = weather.nearest_area[0].region[0].value

        //creating list item
        //updating list item content
        let listItemTwo = document.createElement('li');
        listItemTwo.innerHTML = `<strong>Region:</strong> ${region}`;

        //grabbing country value
        let country = weather.nearest_area[0].country[0].value

        //creating list item
        //updating list item content
        let listItemThree = document.createElement('li');
        listItemThree.innerHTML = `<strong>Country:</strong> ${country}`;

        //grabbing feels like value
        let currently = weather.current_condition[0].FeelsLikeF;
        console.log(currently)

        //creating list item
        //updating list item content
        let listItemFour = document.createElement('li');
        listItemFour.innerHTML = `<strong>Currently:</strong> Feels like ${currently}℉`;

         let sunshine = weather.weather[0].hourly[0].chanceofsunshine
        console.log(`chance of sunshine: ${sunshine}`)

        let listItemFive = document.createElement('li');
        listItemFive.innerHTML = `<strong>Chance of Sunshine:</strong>  ${sunshine}`;

         let rain = weather.weather[0].hourly[0].chanceofrain
        console.log(`chance of rain: ${rain}`)

        let listItemSix = document.createElement('li');
        listItemSix.innerHTML = `<strong>Chance of Rain:</strong>  ${rain}`;

         let snow = weather.weather[0].hourly[0].chanceofsnow
        console.log(`chance of sunshine: ${snow}`)

        let listItemSeven = document.createElement('li');
        listItemSeven.innerHTML = `<strong>Chance of Snow:</strong>  ${snow}`;

        
        //adding to DOM:
        console.log(ul)
        firstArt.append(ul)
        ul.prepend(listItem)
        listItem.after(listItemTwo)
        listItemTwo.after(listItemThree)
        listItemThree.after(listItemFour)
        listItemFour.after(listItemFive)
        listItemFive.after(listItemSix)
        listItemSix.after(listItemSeven)

        //grabbing first aside element
        //updating text content
        let asideArt = document.querySelector('aside article');
        asideArt.setAttribute('class', 'today');
        asideArt.innerHTML = '<strong>Today</strong>';
        // asideArt.style.alignItems = 'center';

        //creating an unordered list for the avg, min, and max
        //removing bullet points
        let asideUl = document.createElement('ul');
        asideUl.style.listStyle = 'none'
       

        /**
         * TODAY'S WEATHER AVG:
         * CREATING LI
         * STORING THE VALUE OF TODAY'S AVG TEMP
         * ADDING TEXT CONTENT FOR TODAY'S AVG TEMP
         */
        let asideLiAvg = document.createElement('li');
        let todayAvg = weather.weather[0].avgtempF + '℉';
        console.log(todayAvg);
        asideLiAvg.innerHTML = `<strong>Average Temperature:</strong> ${todayAvg}`;
        

        /**
         * TODAY'S WEATHER MAX:
         * CREATING LI
         * STORING THE VALUE OF TODAY'S MAX TEMP
         * ADDING TEXT CONTENT FOR TODAY'S MAX TEMP
         */
        let asideLiMax = document.createElement('li')
        let todayMax = weather.weather[0].maxtempF + '℉'
        console.log(todayMax)
        asideLiMax.innerHTML = `<strong>Max Temperature:</strong> ${todayMax}`

        /**
         * TODAY'S WEATHER MIN:
         * CREATING LI
         * STORING THE VALUE OF TODAY'S MIN TEMP
         * ADDING TEXT CONTENT FOR TODAY'S MIN TEMP
         */
        let asideLiMin = document.createElement('li');
        let todayMin = weather.weather[0].mintempF + '℉';
        console.log(todayMin);
        asideLiMin.innerHTML = `<strong>Min Temperature:</strong> ${todayMin}`;
    

        //ADDING UL TO DOM:
        asideArt.append(asideUl);
        asideUl.appendChild(asideLiAvg)
        asideLiAvg.after(asideLiMin)
        asideLiMin.after(asideLiMax)

        /**
         * SELECTING THE SECOND ARTICLE ELEMENT
         * ADDING TEXT CONTENT
         */
        let main = document.getElementById('main').getElementsByTagName('aside');
        let article = main[0].childNodes[3];
        article.setAttribute('class', 'tomorrow');
        article.innerHTML = `<strong>Tomorrow</strong>`;
        console.log(article);

        /**
         * CREATING UNORDERED LIST
         * REMOVING BULLET POINTS
         */
        let asideUlTwo = document.createElement('ul');
        asideUlTwo.style.listStyle = 'none'

        /**
         * TOMORROW'S WEATHER AVG:
         * CREATING LI
         * STORING THE VALUE OF TOMORROW'S AVG TEMP
         * ADDING TEXT CONTENT FOR TOMORROW'S AVG TEMP
         */
        let tomAvgLi = document.createElement('li');
        let tomorrowAvg = weather.weather[1].avgtempF + '℉'
        console.log(tomorrowAvg);
        tomAvgLi.innerHTML = `<strong>Average Temperature:</strong> ${tomorrowAvg}`;

        /**
         * TOMORROW'S WEATHER MAX:
         * CREATING LI
         * STORING THE VALUE OF TOMORROW'S MAX TEMP
         * ADDING TEXT CONTENT FOR TOMORROW'S MAX TEMP
         */
        let tomMaxLi = document.createElement('li');
        let tomorrowMax = weather.weather[1].maxtempF + '℉'
        console.log(tomorrowMax);
        tomMaxLi.innerHTML = `<strong>Max Temperature:</strong> ${tomorrowMax}`;

        /**
         * TOMORROW'S WEATHER MIN:
         * CREATING LI
         * STORING THE VALUE OF TOMORROW'S MIN TEMP
         * ADDING TEXT CONTENT FOR TOMORROW'S MIN TEMP
         */
        let tomMinLi = document.createElement('li');
        let tomorrowMin = weather.weather[1].mintempF + '℉'
        console.log(tomorrowMin);
        tomMinLi.innerHTML = `<strong>Min Temperature:</strong> ${tomorrowMin}`;

        //ADDING UL TO DOM:
        article.append(asideUlTwo);
        asideUlTwo.appendChild(tomAvgLi);
        tomAvgLi.after(tomMinLi);
        tomMinLi.after(tomMaxLi);

        /**
         * SELECTING THE SECOND ARTICLE ELEMENT
         * ADDING TEXT CONTENT
         */
        let mainThree = document.getElementById('main').getElementsByTagName('aside');
        let articleThree = mainThree[0].childNodes[5];
        articleThree.setAttribute('class', 'dayAfter')
        articleThree.innerHTML = `<strong>Day After Tomorrow</strong>`;
        console.log(articleThree);

        /**
         * CREATING UNORDERED LIST
         * REMOVING BULLET POINTS
         */
        let asideUlThree = document.createElement('ul');
        asideUlThree.style.listStyle = 'none';

        /**
         * DAY AFTER'S WEATHER AVG:
         * CREATING LI
         * STORING THE VALUE OF DAY AFTER'S AVG TEMP
         * ADDING TEXT CONTENT FOR DAY AFTER'S AVG TEMP
         */
        let dayAfterAvgLi = document.createElement('li');
        let dayAfterAvg = weather.weather[2].avgtempF + '℉'
        console.log(dayAfterAvg);
        dayAfterAvgLi.innerHTML = `<strong>Average Temperature:</strong> ${dayAfterAvg}`;
        
        /**
         * DAY AFTER'S WEATHER AVG:
         * CREATING LI
         * STORING THE VALUE OF DAY AFTER'S MAX TEMP
         * ADDING TEXT CONTENT FOR DAY AFTER'S MAX TEMP
         */
        let dayAfterMaxLi = document.createElement('li');
        let dayAfterMax = weather.weather[2].maxtempF + '℉'
        console.log(dayAfterMax);
        dayAfterMaxLi.innerHTML = `<strong>Min temperature:</strong> ${dayAfterMax}`;

        /**
         * DAY AFTER'S WEATHER AVG:
         * CREATING LI
         * STORING THE VALUE OF DAY AFTER'S MIN TEMP
         * ADDING TEXT CONTENT FOR DAY AFTER'S MIN TEMP
         */
        let dayAfterMinLi = document.createElement('li');
        let dayAfterMin = weather.weather[2].mintempF + '℉'
        console.log(dayAfterMin);
        dayAfterMinLi.innerHTML = `<strong>Min temperature:</strong> ${dayAfterMin}`;


        //ADDING UL TO DOM:
        articleThree.append(asideUlThree);
        asideUlThree.appendChild(dayAfterAvgLi);
        dayAfterAvgLi.after(dayAfterMinLi);
        dayAfterMinLi.after(dayAfterMaxLi);

        //CLEAR PREVIOUS TEXT CONTENT
        let previousP = document.querySelector('ul p')
        previousP.textContent = ``;

        //SELECT PREVIOUS UL
        let previous = document.querySelector('section ul');
        
        /**
         * CREATE LI
         * GET THE VALUE SEARCHED
         * SET VALUE AND CURRENT TO THE LI TEXT CONTEXT
         */
        // let previousLi = document.createElement('li');
        // let previousValue = document.querySelector('input').value;
        console.log(previousValue);
        // previousLi.innerHTML = `<a href="https://v3.wttr.in/${event.target.location.value}?format=j1">${previousValue}</a> - ${currently}℉`;
        console.log(previousLi)

        // previousLi.addEventListener('click', (event) => {
        //     event.preventDefault()
        previousLi.innerHTML = `<a href="https://v3.wttr.in/${event.target.location.value}?format=j1">${previousValue}</a> - ${currently}℉`;

        // })

        //ADD TO DOM
        previous.append(previousLi)

    }

    if(sunshine > 50){
        let sunshineImg = document.querySelector('header img')
        sunshineImg.setAttribute('src', '/assets/sun2.0.png')
    }

    if(rain > 50){
        let rainImg = document.querySelector('header img')
        rainImg.setAttribute('src', '/assets/icons8-torrential-rain.gif')
    }

    if(snow > 50){
        let snowImg = document.querySelector('header img')
        snowImg.setAttribute('src', '/assets/icons8-light-snow.gif')

    }

    let time = weather.current_condition[0].localObsDateTime.slice(12)
    console.log(time)

    if(time >= 17){
        let timeImg = document.createElement('img')
        timeImg.setAttribute('src', '/assets/icons8-night.gif')
        firstArt.prepend(timeImg)
    }

    let thunder = weather.weather[0].hourly[0].chanceofthunder

    if(thunder > 50){
        let thunderImg = document.createElement('img')
        thunderImg.setAttribute('src', '/assets/icons8-strom.gif')
        firstArt.prepend(thunderImg)
    }
    createWeather()

    previousLi.addEventListener('click', (event) => {
        event.preventDefault()
    previousLi.innerHTML = `<a href="https://v3.wttr.in/${previousValue}}?format=j1">${previousValue}</a> - ${currently}℉`;
        createWeather()
        
        
    })
      
        //clearing form after submit
        const form = document.querySelector('form')
        form.reset();

    })
});