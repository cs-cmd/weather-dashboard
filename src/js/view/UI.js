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

        console.log(jsonData);

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
    }

    function toggleTempUnit() {
        currentTempUnit = currentTempUnit === 'F' ? 'C' : 'F'; 
    }

    // I - Imperial
    function loadTemperature(temp, feelsLike) {
        currrentTempDisplay.innerText = temp;
        feelsLikeTempDisplay.innerText = feelsLike;
    }

    return { createWeatherRecordPageItem, loadData };
})();

export default UI;