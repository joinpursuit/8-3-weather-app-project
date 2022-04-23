const base_url = 'https://wttr.in/';

const displayData = (data) => {
    console.log(data);
};

const displayError = (e) => {
    console.log(e);
};

fetch(base_url)
    .then((response) => response.json())
    .then(displayData)
    .catch(displayError);