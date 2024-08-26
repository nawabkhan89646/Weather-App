// OpenWeatherMap API key and base URL
const apiKey = "00fdc9146b6fe532761504e0117ff1a3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Get references to the HTML elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Asynchronous function to fetch weather data for a given city
async function checkWeather(city) {
    // Fetch weather data from the API using the city name and API key
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if the city was not found (status code 404)
    if (response.status == 404) {
        // Display the error message and hide the weather info
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parse the JSON data from the response
        var data = await response.json();

        // Update the HTML elements with the weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km";

        // Set the appropriate weather icon based on the weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Display the weather info and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add event listener to the search button to check the weather when clicked
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
