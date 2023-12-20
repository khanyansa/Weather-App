function searchInput(event){
    event.preventDefault();
    let search = document.querySelector("#search");
    let city = document.querySelector("#city");
    city.innerHTML = `${search.value}`;
    let apiKey = "7d5e465e50dd35604cbo84t0af1a9ca6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${search.value}&key=${apiKey}&units=metric`;



    axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response){
    let city = document.querySelector("#city");
    city.innerHTML = response.data.city;
    let temperature = document.querySelector(".degrees");
    let roundedTemperature = Math.round(response.data.temperature.current);
    temperature.innerHTML = roundedTemperature;
    let feelsLike = document.querySelector("#real-feels");
    let roundedFeelsLike = Math.round(response.data.temperature.feels_like);
    feelsLike.innerHTML = roundedFeelsLike;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.temperature.humidity;
    let windSpeed = document.querySelector("#speed");
    let roundedSpeed = Math.round( response.data.wind.speed);
    windSpeed.innerHTML = roundedSpeed;
    let pressure = document.querySelector("#pressure");
    pressure.innerHTML =response.data.temperature.pressure;
    let description = document.querySelector(".description");
    description.innerHTML = response.data.condition.description;
    let icon = document.querySelector("#icon");
    icon.innerHTML =`<img src = "${response.data.condition.icon_url}"/>`;

    getForecast(response.data.city);
    
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchInput );

let currentDate = new Date();
let day = currentDate.toLocaleString("default", {weekday: "long"});
let time = currentDate.toLocaleString("default", {hour: "2-digit", minute: "2-digit", hour12: false})
let date =document.querySelector("#date");
date.innerHTML = `${day}, ${time}`;



function displayForecast(response){
    let forecast = document.querySelector("#forecast-container");

    
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index){
        if (index < 4)
        forecastHtml = forecastHtml +` <p class="day">${formatDay(day.time)}</p>
                        <p class="conditions"><strong><img src="${day.condition.icon_url}"/></strong></p>
                        <p class="temperatures"><strong>${Math.round(day.temperature.maximum)} / </strong> ${Math.round(day.temperature.minimum)} <strong>&#176C</strong></p>`;

    });
    
    forecast.innerHTML = forecastHtml;

}
displayForecast();

function formatDay(timeStamp){
    let date = new Date(timeStamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function getForecast(city){
    let apiKey =  "7d5e465e50dd35604cbo84t0af1a9ca6";
    let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(forecastUrl).then(displayForecast);
}

