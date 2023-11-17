import weatherSaveLog from '../model/WeatherSaveLog.js';

const UI = (() => {

    // F, C
    let currentTempUnit = 'F';

    const recentSearchLog = document.getElementById('recent-searches');

    const currrentTempDisplay = document.getElementById('curr-temp');
    const weatherConditionDisplay = document.getElementById('weather-condition');
    const feelsLikeTempDisplay = document.getElementById('feels-like-temp');
    
    const locationNameDisplay = document.getElementById('location-name');
    const locationRegionDisplay = document.getElementById('location-region');
    const locationLonLatDisplay = document.getElementById('location-lon-lat');

    const lastUpdatedDisplay = document.getElementById('last-updated');

    const createWeatherRecordPageItem = (weatherJson) => {
        const locationJson = {...weatherJson.location};

        const recordPageItem = document.createElement('div');
        recordPageItem.classList.add('weather-record');
        recordPageItem.innerText = locationJson.name;
        
        const mostRecentSearch = recentSearchLog.firstElementChild;

        if (mostRecentSearch) {
            recentSearchLog.insertBefore(recordPageItem, mostRecentSearch);
        } else {
            recentSearchLog.appendChild(recordPageItem);
        }

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button'
        deleteButton.addEventListener('click', () => {
            weatherSaveLog.removeLocation(locationJson);
        });

        // add to weather save log object
        weatherSaveLog.addLocation(locationJson);
    } 

    const loadData = (jsonData) => {
        const location = jsonData.location;
        const current = jsonData.current;
        const astronomy = jsonData.astronomy;
        const forecastDays = jsonData.forecast.forecastday;

        // load location and current temperature
        loadTemperature(current.temp_f, current.feelslike_f);
        
        weatherConditionDisplay.innerText = current.condition.text;

        locationNameDisplay.innerText = location.name;

        let displayRegion = '';
        if (location.region === '') {
            displayRegion = location.country;
        } else {
            displayRegion = location.region;
        }

        locationRegionDisplay.innerText = displayRegion;

        let longLatFormatted = `${location.lon}, ${location.lat}`;
        locationLonLatDisplay.innerText = longLatFormatted;
        
        lastUpdatedDisplay.innerText = current.last_updated;

        // load forecast data
        const forecastCards = document.querySelectorAll('section.forecast > .forecast-card');

        for(let i = 0; i < forecastDays.length && i < forecastCards.length; ++i) {
            loadForecast(forecastDays[i], forecastCards[i]);
        }

    }

    function toggleTempUnit() {
        currentTempUnit = currentTempUnit === 'F' ? 'C' : 'F'; 
    }

    // I - Imperial
    function loadTemperature(temp, feelsLike) {
        currrentTempDisplay.innerText = temp;
        feelsLikeTempDisplay.innerText = feelsLike;
    }

    function loadForecast(day, pageItem) {
        const dayTitle = pageItem.querySelector('.day-date');
        dayTitle.innerText = day.date;

        console.log(pageItem);
        pageItem.addEventListener('click', () => {
            loadForecastDayData(day);
        })
    }

    function loadForecastDayData(forecastDayJson) {
        if (!forecastDayJson) {
            return;
        }

        const forecastDrilldown = document.querySelector('.forecast-drilldown');

        if (forecastDrilldown.children.length !== 0) {
            Array.from(forecastDrilldown.children).forEach(e => e.remove());
        }        

        const forecastDay = forecastDayJson.date;
        const forecastHours = forecastDayJson.hour;

        for(let i = 0; i < forecastHours.length; ++i) {
            const hourDiv = createForecastHourCard(forecastHours[i]);
            forecastDrilldown.appendChild(hourDiv);
        }
    }

    function createForecastHourCard(forecastHourJson) {
        const hourDiv = document.createElement('div');
        hourDiv.innerText = forecastHourJson.time;
        return hourDiv;
    } 

    return { createWeatherRecordPageItem, loadData };
})();

export default UI;