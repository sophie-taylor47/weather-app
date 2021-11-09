// Date
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    hour = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

let now = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(now);

//Weather
function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let celciusTemp = Math.round(response.data.main.temp);
  let currentTemp = Math.round(celciusTemp);
  let degree = document.querySelector("#temperature");
  degree.innerHTML = currentTemp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "cda7455f017a25e76c2aa1f8943d682c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

//currentlocation
function searchLocation(position) {
  let apiKey = "cda7455f017a25e76c2aa1f8943d682c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location-button");
currentLocationBtn.addEventListener("click", getCurrentLocation);

searchCity("London");

//ConvertTemperature
function convertTempCelsius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = Math.round(celciusTemp);
}

function convertTempFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celciusTemp * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemp;
}

let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", convertTempFahrenheit);

let celciusClick = document.querySelector("#celcius");
celciusClick.addEventListener("click", convertTempCelsius);
