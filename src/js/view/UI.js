import weatherSaveLog from '../model/WeatherSaveLog.js';

const UI = (() => {
    const recentSearchLog = document.getElementById('recent-searches');

    const currrentTempDisplay = document.getElementById('curr-temp');
    const weatherConditionDisplay = document.getElementById('weather-condition');
    const feelsLikeTempDisplay = document.getElementById('feels-like-temp');

    const createWeatherRecordPageItem = (weatherJson) => {
        const recordJson = {
            name: weatherJson.location.name,
            
        };

        const recordPageItem = document.createElement('div');
        recordPageItem.classList.add('weather-record');
        recordPageItem.innerText = recordJson.name;
        
        const mostRecentSearch = recentSearchLog.firstElementChild;

        if (mostRecentSearch) {
            recentSearchLog.insertBefore(recordPageItem, mostRecentSearch);
        } else {
            recentSearchLog.appendChild(recordPageItem);
        }

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button'
        deleteButton.addEventListener('click', () => {
            weatherSaveLog.removeLocation(recordJson);
        });

        // add to weather save log object
        weatherSaveLog.addLocation(recordJson);
    } 

    const loadData = (jsonData) => {
        console.log(jsonData);

        currrentTempDisplay.innerText = jsonData.temp_f;
        weatherConditionDisplay.innerText = jsonData.condition.text;
        feelsLikeTempDisplay.innerText = jsonData.feelslike_f;

        
    }

    return { createWeatherRecordPageItem, loadData };
})();

export default UI;