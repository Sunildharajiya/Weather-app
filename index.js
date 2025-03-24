//clock
function updateDateTime() {
            let now = new Date();
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let dateStr = now.toLocaleDateString('en-US', options);

            let hours = now.getHours();
            let minutes = now.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            let timeStr = `${hours}:${minutes} ${ampm}`;
            document.getElementById('datetime').innerHTML = `${dateStr} - ${timeStr}`;
        }

        updateDateTime();
        setInterval(updateDateTime, 1000);  

// OpenWeather API Key
const apiKey = "dfb2a22143fc9bc685d3da5fe245d12d"; 

// Function to fetch weather data
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Select elements
            let cityElement = document.querySelector(".details h1");
            let tempElement = document.querySelector(".temp");
            let weatherElement = document.querySelector(".details p");
            let windElement = document.querySelector(".windspeed");
            let iconElement = document.querySelector(".material-symbols-outlined");

            // Check if data is valid
            if (data.main) {
                cityElement.textContent = data.name.toUpperCase();
                tempElement.textContent = `${data.main.temp} °C`;
                weatherElement.textContent = data.weather[0].description;
                windElement.textContent = `Windspeed: ${data.wind.speed} km/h`;

                // Change weather icon dynamically
                let weatherCondition = data.weather[0].main.toLowerCase();
                if (weatherCondition.includes("cloud")) {
                    iconElement.textContent = "cloud";
                } else if (weatherCondition.includes("rain")) {
                    iconElement.textContent = "rainy";
                } else if (weatherCondition.includes("clear")) {
                    iconElement.textContent = "clear";
                } else {
                    iconElement.textContent = "cloudy_day";
                }
            } else {
                alert("City not found! Please enter a valid city.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Try again later.");
        });
}

// Fetch default weather data for Ahmedabad on page load
document.addEventListener("DOMContentLoaded", () => {
    getWeather("Ahmedabad");
});

// Event listener for user input
document.getElementById("get-city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Trigger search on Enter key press
        let city = event.target.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});



