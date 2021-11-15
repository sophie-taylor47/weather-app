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

  celciusTemperature = Math.round(response.data.main.temp);

  let temperatureMaxToday = Math.round(response.data.main.temp_max);
  let temperatureMaxTodayElement = document.querySelector("#max-temp");
  temperatureMaxTodayElement.innerHTML = `${temperatureMaxToday}°`;

  let temperatureMinToday = Math.round(response.data.main.temp_min);
  let temperatureMinTodayElement = document.querySelector("#min-temp");
  temperatureMinTodayElement.innerHTML = `${temperatureMinToday}°`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("icon");
  let iconImage = response.data.weather[0].icon;
  let iconDescription = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconImage}@2x.png`
  );
  iconElement.setAttribute("alt", iconDescription);

  getForecast(response.data.coord);
  changeIcon(response.data.weather[0].icon, description);

  let changeMainIcon = document.querySelector("#current-icon");
  let icon = response.data.weather[0].icon;
  if (icon === "04n" || icon === "04d") {
    changeMainIcon.innerHTML = "☁️";
  } else {
    if (icon === "03n" || icon === "03d") {
      changeMainIcon.innerHTML = "🌥";
    } else {
      if (icon === "13n" || icon === "13d") {
        changeMainIcon.innerHTML = "❄️";
      } else {
        if (icon === "50n" || icon === "50d") {
          changeMainIcon.innerHTML = "🌫";
        } else {
          if (icon === "02n" || icon === "02d") {
            changeMainIcon.innerHTML = "⛅️";
          } else {
            if (icon === "01d") {
              changeMainIcon.innerHTML = "☀️";
            } else {
              if (icon === "01n") {
                changeMainIcon.innerHTML = "🌙 ";
              } else {
                if (icon === "09n" || icon === "09d") {
                  changeMainIcon.innerHTML = "🌧";
                } else {
                  if (icon === "10n" || icon === "10d") {
                    changeMainIcon.innerHTML = "🌦";
                  } else {
                    if (icon === "11n" || icon === "11d") {
                      changeMainIcon.innerHTML = "🌩";
                    } else {
                      if (description === "tornado") {
                        changeMainIcon.innerHTML = "🌪";
                      } else {
                        if (
                          description === "thunderstorm with light rain" ||
                          description === "thunderstorm with rain" ||
                          description === "thunderstorm with heavy rain" ||
                          description === "thunderstorm with heavy drizzle"
                        ) {
                          changeMainIcon.innerHTML = "⛈";
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
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
  celciusClick.classList.add("active");
  fahrenheitClick.classList.remove("active");
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = celciusTemperature;
}

function convertTempFahrenheit(event) {
  event.preventDefault();
  celciusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = Math.round(fahrenheitTemp);
}

celciusTemperature = null;

let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", convertTempFahrenheit);

let celciusClick = document.querySelector("#celcius");
celciusClick.addEventListener("click", convertTempCelsius);

//5dayForecast
function displayForecast(response) {
  let weatherForecast = response.data.daily;
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index === 0) {
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col-4">
                <div class="day today" id="today" > <strong> Today </strong>
               </div>
                <div class="weatherEmoji"> 
                ${changeIcon(
                  forecastDay.weather[0].icon,
                  forecastDay.weather[0].description
                )} </div>
                <div class="highlow">
                  <span>
                    <strong> <span id="today-highest"> ${Math.round(
                      forecastDay.temp.max
                    )}</span>° </strong>
                  </span>
                  <span> <span id="today-lowest"> ${Math.round(
                    forecastDay.temp.min
                  )}</span>°</span>
                </div>
              </div>
            `;
    } else {
      if (index === 1) {
        forecastHTML =
          forecastHTML +
          ` 
              <div class="col-4">
                <div class="day today" id="today" > Tommorow
               </div>
                <div class="weatherEmoji"> 
                ${changeIcon(
                  forecastDay.weather[0].icon,
                  forecastDay.weather[0].description
                )} </div>
                <div class="highlow">
                  <span>
                    <strong> <span id="today-highest"> ${Math.round(
                      forecastDay.temp.max
                    )}</span>° </strong>
                  </span>
                  <span> <span id="today-lowest"> ${Math.round(
                    forecastDay.temp.min
                  )}</span>°</span>
                </div>
              </div>
            `;
      } else {
        if (index > 0 && index < 5) {
          forecastHTML =
            forecastHTML +
            ` 
              <div class="col-4">
                <div class="day today" id="today" > ${formatDay(
                  forecastDay.dt
                )} </div>
                <div class="weatherEmoji"> 
                ${changeIcon(
                  forecastDay.weather[0].icon,
                  forecastDay.weather[0].description
                )} </div>
                <div class="highlow">
                  <span>
                    <strong> <span id="today-highest"> ${Math.round(
                      forecastDay.temp.max
                    )}</span>° </strong>
                  </span>
                  <span> <span id="today-lowest"> ${Math.round(
                    forecastDay.temp.min
                  )}</span>°</span>
                </div>
              </div>
            `;
        }
      }
    }
  });

  forecast.innerHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cda7455f017a25e76c2aa1f8943d682c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//displayWeatherIcon
function changeIcon(icon, description) {
  let emoji = "";

  if (icon === "04n" || icon === "04d") {
    emoji = "☁️";
  } else if (icon === "03n" || icon === "03d") {
    emoji = "🌥";
  } else if (icon === "13n" || icon === "13d") {
    emoji = "❄️";
  } else if (icon === "50n" || icon === "50d") {
    emoji = "🌫";
  } else if (icon === "02n" || icon === "02d") {
    emoji = "⛅️";
  } else if (icon === "01d") {
    emoji = "☀️";
  } else if (icon === "01n") {
    emoji = "🌙 ";
  } else if (icon === "09n" || icon === "09d") {
    emoji = "🌧";
  } else if (icon === "10n" || icon === "10d") {
    emoji = "🌦";
  } else if (icon === "11n" || icon === "11d") {
    emoji = "🌩";
  } else if (description === "tornado") {
    emoji = "🌪";
  } else if (
    description === "thunderstorm with light rain" ||
    description === "thunderstorm with rain" ||
    description === "thunderstorm with heavy rain" ||
    description === "thunderstorm with heavy drizzle"
  ) {
    emoji = "⛈";
  }

  return emoji;
}
