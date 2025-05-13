
const API = `API`;
let search = document.querySelector("#city");
let main = document.querySelector(".weather-info");

function getwhether(city) {
  let docurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API}`;
  fetch(docurl)
    .then(res => res.json())
    .then(data => {
      let lat = data[0].lat;
      let lon = data[0].lon;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
      return fetch(url);
    })
    .then(data => data.json()).catch(e =>{ console.log(e)} )
    .then(data => {
      console.log(data)
      // If-else to select image based on condition
      const weatherCondition = data.weather[0].main.toLowerCase();
let iconurl = "";
if (weatherCondition === "clear") {
  iconUrl = "wb_sunny"; // Clear sky
} else if (weatherCondition === "clouds") {
  iconUrl = "cloud"; // Clouds
} else if (weatherCondition === "rain") {
  iconUrl = "weather_snowy"; // Rain
} else if (weatherCondition === "drizzle") {
  iconUrl = ""; // Drizzle
} else if (weatherCondition === "thunderstorm") {
  iconUrl = "thunderstorm"; // Thunderstorm
} else if (weatherCondition === "snow") {
  iconUrl = "mode_cool"; // Snow
} else if (weatherCondition === "mist" || weatherCondition === "fog") {
  iconUrl = ""; // Mist/Fog
} else {
  iconUrl = ""; // Default icon
}

      main.innerHTML = `<div class="weather-info">
          <h2 id="city-name">${data.name} , ${data.sys.country}</h2>
          <p id="temperature"> ${data.main.temp}°C</p>
          <span class="material-symbols-outlined">${iconurl}</span>
          <p id="description">Description: ${data.weather[0].description}</p>
          <p>clouds : ${data.clouds.all}</p>
          <p>feels like : ${data.main.feels_like} °C</p>
          <p id="humidity">Humidity: ${data.main.humidity}%</p>
        
          <p id="wind-speed">Wind Speed: ${data.wind.speed} m/s</p>
        </div>
      `
    })
}
window.addEventListener("load",getwhether('Delhi,india'))

city.addEventListener("keydown",() => {
  getwhether(search.value)
})

