const form = document.querySelector("form");
const unorderedList = document.querySelector("ul");
const noSearchDefaultText = document.querySelector(".sidebar p");
const main = document.querySelector("main");
const mainArticle = document.querySelector("article");
const mainArticleParagraph = document.getElementById("firstP");
const weatherAsideElement = document.getElementById("weatherForecast");
const weatherAsideArticles = document.querySelectorAll(
  "#weatherForecast article"
);
const listOfSearches = document.getElementById("locationWeather");

form.addEventListener("submit", (event) => {
  //prevent page reload
  event.preventDefault();
  //remove previous searches so that a new search may load
  document.querySelectorAll("main article section").forEach((obj) => {
    obj.remove();
  });
  document.querySelectorAll("main aside article div").forEach((obj) => {
    obj.remove();
  });

  const location = document.getElementById("location").value;

  //TODO: Create catch error message
  fetch(`http://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then((json) => {})
    .catch((error) => {});
  document.getElementById("location").value = ""; //reset input field text value
});
