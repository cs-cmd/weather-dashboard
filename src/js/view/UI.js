import weatherSaveLog from '../model/WeatherSaveLog.js';

const UI = (() => {
    // F, C
    let currentTempUnit = 'F';

    const recentSearchLog = document.getElementById('recent-searches');

    const currrentTempDisplay = document.getElementById('curr-temp');
    const weatherConditionDisplay = document.getElementById('weather-condition');
    const feelsLikeTempDisplay = document.getElementById('feels-like-temp');
    const currentTempSymbol = document.getElementById('curr-temp-symbol');
    const feelsLikeSymbol = document.getElementById('feels-like-symbol');


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

    const resetUIElements = () => {
        const forecastDrilldown = document.querySelector('.forecast-drilldown');
        forecastDrilldown.classList.remove('dropped');
    }

    const loadData = (jsonData) => {
        weatherSaveLog.setLastQueryResults(jsonData);
        const location = jsonData.location;
        const current = jsonData.current;
        const astronomy = jsonData.astronomy;
        const forecastDays = jsonData.forecast.forecastday;

        resetUIElements();

        // load location and current temperature
        loadTemperature({ 
            temp: current.temp_f, 
            feelslike: current.feelslike_f,
            unit: 'F',
        });
        
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
        const forecastCards = document.querySelectorAll('section.forecast > .forecast-button');
        console.log(forecastCards);
        for(let i = 0; i < forecastDays.length && i < forecastCards.length; ++i) {
            loadForecast(forecastDays[i], forecastCards[i]);
        }

    }

    function toggleTempUnit() {
        if (!weatherSaveLog.getLastQueryResults()) {
            return;
        }

        const currentJson = weatherSaveLog.getLastQueryResults();

        weatherSaveLog.toggleCurrentUnit();
        const newUnit = weatherSaveLog.getCurrentUnit();

        let temps = {};
        switch(newUnit) {
            case 'C': 
                temps = {
                    temp: currentJson.temp_c,
                    feelslike: currentJson.feelslike_c,
                };
                break;
            case 'F': 
                temps = {
                    temp: currentJson.temp_f,
                    feelslike: currentJson.feelslike_f,
                }
                break;
            default:
                console.log(`:: Error: weather type: ${newUnit} is invalid. ::`);
                return;
        }

        temps = {
            unit: newUnit,
            ...temps,
        }

        loadTemperature(temps);
    }

    function loadTemperature(temps) {
        currrentTempDisplay.innerText = temps.temp;
        feelsLikeTempDisplay.innerText = temps.feelslike;
        currentTempSymbol.innerText = temps.unit;
        feelsLikeSymbol.innerText = temps.unit;
    }

    function loadForecast(day, pageItem) {
        const dayTitle = pageItem.querySelector('.day-date');
        dayTitle.innerText = day.date;
        console.log('addig onclick');

        pageItem.addEventListener('click', () => {
            loadForecastDayData(day);
        })
    }

    function loadForecastDayData(forecastDayJson) {
        resetUIElements();

        if (!forecastDayJson) {
            console.log('json null');
            return;
        }

        const forecastDrilldown = document.querySelector('.forecast-drilldown');

        if (forecastDrilldown.children.length !== 0) {
            Array.from(forecastDrilldown.children).forEach(e => e.remove());
        }        

        const forecastHours = forecastDayJson.hour;

        for(let i = 0; i < forecastHours.length; ++i) {
            const hourDiv = createForecastHourCard(forecastHours[i]);

            forecastDrilldown.appendChild(hourDiv);
        }

        forecastDrilldown.classList.add('dropped');
        // scrolls to left-most spot on scrollbar
        forecastDrilldown.scrollTo(0, 0);
    }

    function createForecastHourCard(forecastHourJson) {
        const hourDiv = document.createElement('div');
        hourDiv.innerText = forecastHourJson.time;
        hourDiv.classList.add('forecast-hour');

        return hourDiv;
    } 

    return { createWeatherRecordPageItem, loadData };
})();

export default UI;