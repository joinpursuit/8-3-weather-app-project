let links = [];
let feelsLike = [];

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (document.querySelector('article')) {
        let text = document.querySelectorAll('article');
        for (element of text) {
            element.textContent='';
        }
    }
    if (document.querySelector('br')) {
        let lineBreak = document.querySelectorAll('br');
        for (element of lineBreak) {
            element.remove();
        }
    }
    let city = event.target.location.value;
    let BASE_URL = `http://wttr.in/`
    fetch(`${BASE_URL}${city}?format=j1`)
        .then(result => {
            return result.json();
        }).then(weather => {
            // giving variables to the area, region, country and current temp for the inputted city


            // clear search bar after submit
            document.getElementById('input').value = "";

            let area = weather.nearest_area[0].areaName[0].value;
            let region = weather.nearest_area[0].region[0].value;
            let country = weather.nearest_area[0].country[0].value;
            let currently = weather.current_condition[0].FeelsLikeF;
            let mainArticle = document.querySelector('article');
            let header = mainArticle.appendChild(document.createElement('h2'));
            header.append(`${area}`);
            mainArticle.append(`Area: ${area}`);
            mainArticle.appendChild(document.createElement("br"));
            mainArticle.append(`Region: ${region}`);
            mainArticle.appendChild(document.createElement("br"));
            mainArticle.append(`Country: ${country}`);
            mainArticle.appendChild(document.createElement("br"));
            mainArticle.append(`Currently: Feels Like ${currently}°F`);
            
            // today's weather forecast for inputted city
            let average = weather.weather[0].avgtempF;
            let min = weather.weather[0].mintempF;
            let max = weather.weather[0].maxtempF;
            let today = document.querySelector('article.today');
            let todayHeader = today.appendChild(document.createElement('h3'));
            todayHeader.append("Today");
            today.append(`Average Temperature: ${average}°F`);
            today.appendChild(document.createElement("br"));
            today.append(`Max Temperature: ${max}°F`);
            today.appendChild(document.createElement("br"));
            today.append(`Min Temperature: ${min}°F`);

            //tomorrow's forecast
            let average2 = weather.weather[1].avgtempF;
            let min2 = weather.weather[1].mintempF;
            let max2 = weather.weather[1].maxtempF;
            let tomorrow = document.querySelector('article.tomorrow');
            let tomorrowHeader = tomorrow.appendChild(document.createElement('h3'));
            tomorrowHeader.append("Tomorrow");
            tomorrow.append(`Average Temperature: ${average2}°F`);
            tomorrow.appendChild(document.createElement("br"));
            tomorrow.append(`Max Temperature: ${max2}°F`);
            tomorrow.appendChild(document.createElement("br"));
            tomorrow.append(`Min Temperature: ${min2}°F`);

            // day after tomorrow's forecast
            let average3 = weather.weather[2].avgtempF;
            let min3 = weather.weather[2].mintempF;
            let max3 = weather.weather[2].maxtempF;
            let dayAfterTom = document.querySelector('article.dayAfterTom');
            let dayAfterHeader = dayAfterTom.appendChild(document.createElement('h3'));
            dayAfterHeader.append("Day After Tomorrow");
            dayAfterTom.append(`Average Temperature: ${average3}°F`);
            dayAfterTom.appendChild(document.createElement("br"));
            dayAfterTom.append(`Max Temperature: ${max3}°F`);
            dayAfterTom.appendChild(document.createElement("br"));
            dayAfterTom.append(`Min Temperature: ${min3}°F`);

            let list = document.querySelector('ul');
            
           
            feelsLike.push(currently);


            
            let listItem = document.createElement('li');
            
            let a= document.createElement('a');
            a.href = `${BASE_URL}${city}?format=j1`;
            a.textContent = area;
            listItem.append(a);
            listItem.append(` - ${currently}°F`)
            list.append(listItem);
            

            a.addEventListener("click", (event) => { 
                document.getElementById('input').value = area;
            })
            

            // convert f to c
        })
        
    })
    document.querySelector('.conversion').addEventListener('submit', (event) => {
        event.preventDefault;
        try {
            const valueToConvert = event.target.convert-temp.value;
        const toF = document.querySelector("#to-f");
        const toC = document.querySelector("#to-c");
        let h4 = document.querySelector('h4');
        if (toF.checked) {
            valueToConvert = valueToConvert * (9/5) + 32;
            h4.innerText = `${valueToConvert.toFixed(2)}°F`;
        } else if (toC.checked) {
            valueToConvert = (valueToConvert - 32) * (5/9);
            h4.innerText = `${valueToConvert.toFixed(2)}°C`;
        }} catch(error) {
            alert('error')
        }
        
    })
