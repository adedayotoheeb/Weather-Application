var fetchWeather = "http://localhost:3000/weather?";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector("img");
const weatherCondition = document.querySelector(".weatherCondition");

const tempElement = document.querySelector(".temperature span");

const locationElement = document.querySelector(".place");

const dateElement = document.querySelector(".date");
const country = document.querySelector(".country");

const icon = document.querySelector(".icon");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dateElement.textContent =
  new Date().getDate() +
  ", " +
  monthNames[new Date().getMonth()].substring(0, 3);

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  locationElement.textContent = "Loading...";
  tempElement.textContent = "";
  weatherCondition.textContent = "";
  const locationApi = fetchWeather + "address=" + search.value;
  fetch(locationApi).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        locationElement.textContent = data.error;
      } else {
        locationElement.textContent = data.address.toUpperCase();
        tempElement.textContent = data.temperature + "C°";
        country.textContent = data.country;
        weatherCondition.textContent = data.description;
        icon.src = data.icon;
      }
    });
  });
});
