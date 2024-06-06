const temp = document.getElementById("temp");
const date = document.getElementById("date-time");
const currentLocation = document.getElementById("location");
const condition = document.getElementById("condition");
const rain = document.getElementById("rain");
const mainIcon = document.getElementById("icon");
const uvIndex = document.querySelector(".uv-index");
const uvText = document.querySelector(".uv-text");
const windSpeed = document.querySelector(".wind-speed");
const sunRise = document.querySelector(".sunRise");
const sunSet = document.querySelector(".sunSet");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const humidityStatus = document.querySelector(".humidityStatus");
const airQuality = document.querySelector(".airQuality");
const airQualityStatus = document.querySelector(".air-quality-status");
const visibilityStatus = document.querySelector(".uv-index");

let currentCity = "";
let currentUnit = "c";
let hourlyOrWeek = "Week";

function getDateTime() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    hour = hour % 12;
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();

setInterval(() => {
    date.innerText = getDateTime();
}, 1000);

function getPublicIP() {
    fetch("https://geolocation-db.com/json/")
        .then((response) => response.json())
        .then((data) => {
            currentCity = data.city;
            getWeatherData(currentCity, currentUnit, hourlyOrWeek);
        })
        .catch((error) => {
            console.error("Error fetching public IP:", error);
        });
}

function getWeatherData(city, unit, hourlyOrWeek) {
    const apiKey = "JV66RWD8NDKJXYWV3724XV59J";
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            let today = data.currentConditions;

            if (unit === 'c') {
                temp.innerText = today.temp;
            } else {
                temp.innerText = celsiusToFahrenheit(today.temp);
            }
            currentLocation.innerText = data.resolvedAddress;
            condition.innerText = today.conditions;
            rain.innerText = "Perc - " + today.precip + "%";
            uvIndex.innerText = today.uvindex;
            windSpeed.innerText = today.windSpeed;
            humidity.innerText = today.humidity + "%";
            visibility.innerText = today.visibility;
            airQuality.innerText = today.windSpeed;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

function celsiusToFahrenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
}

getPublicIP();
