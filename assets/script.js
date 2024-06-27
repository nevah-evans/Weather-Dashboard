const APIKey = "84ae5461ca0dd25d6c96a7e3edea8d1c";
const searchBtn = document.getElementById('submit');
const searchHistory = document.querySelector('.search-history')

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    renderSearchHistory();
    renderWeather();
});



function renderWeather() {

    const cityName = document.getElementById("search").value;

    fetchWeatherData(cityName);
};



function fetchWeatherData(cityName) {

    let lon = localStorage.getItem('longitude');
    let lat = localStorage.getItem('latitude');

    const fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
    fetch(fiveDay)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data', error);
        })

    const querURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;


    fetch(querURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data', error);
        })
};



function displayForecast(data) {

    const now = dayjs();
    document.getElementById('current-date').innerHTML = now.format('MM/DD/YYYY');

    for (let i = 0; i < 5; i++) {
        document.getElementById('date' + (i + 1)).innerHTML = now.add(i + 1, 'd').format('MM/DD/YYYY');
    }
    const fiveDayForecast = [];
    const fiveForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!fiveDayForecast.includes(forecastDate)) {
            return fiveDayForecast.push(forecastDate);
        }
    });

    for (let i = 0; i < fiveForecast.length; i++) {
        document.getElementById('temperature' + (i + 1)).innerHTML = `Temp: ${(fiveForecast[i].main.temp).toFixed(0)} °F`;
        document.getElementById('hum' + (i + 1)).innerHTML = `Humidity: ${fiveForecast[i].main.humidity} %`;
        document.getElementById('windy' + (i + 1)).innerHTML = `Wind: ${(fiveForecast[i].wind.speed).toFixed(0)} mph`;
        document.getElementById('icon' + (i + 1)).src = ` https://openweathermap.org/img/wn/${fiveForecast[i].weather[0].icon}.png`;
    }

}


function displayCurrentWeather(data) {

    localStorage.setItem('city', data.name);
    localStorage.setItem('longitude', data.coord.lon);
    localStorage.setItem('latitude', data.coord.lat);

    let icon = data.weather[0].icon;
    const weatherIcon = `https://openweathermap.org/img/wn/${icon}.png`;

    document.querySelector('#city-name').innerHTML = data.name;
    document.querySelector('#icon').src = weatherIcon;
    document.querySelector('#temp').innerHTML = 'Temp: ' + (data.main.temp).toFixed(0) + '°F';
    document.querySelector('#humidity').innerHTML = 'Humidity: ' + data.main.humidity + ' %';
    document.querySelector('#wind').innerHTML = 'Wind: ' + (data.wind.speed).toFixed(0) + ' mph';
}


function renderSearchHistory() {

    const history = localStorage.getItem('city');

    if (history) {
        const historyBtn = document.createElement('button');
        historyBtn.textContent = history;
        historyBtn.setAttribute('class', 'history-button');
        historyBtn.setAttribute('data-cityName', history);
        searchHistory.append(historyBtn);




        historyBtn.addEventListener('click', function (event) {

            const cityName = event.target.getAttribute('data-cityName');
            fetchWeatherData(cityName);
        });
    }
}