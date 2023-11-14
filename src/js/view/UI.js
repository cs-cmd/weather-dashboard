import weatherSaveLog from '../model/WeatherSaveLog.js';

const UI = (() => {
    const recentSearchLog = document.getElementById('recent-searches');

    const createWeatherRecordPageItem = (weatherJson) => {
        const recordJson = {
            name: weatherJson.location.name,
            
        };

        const recordPageItem = document.createElement('div');
        recordPageItem.classList.add('weather-record');
        recordPageItem.innerText = weatherRecord.location.name;
        
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
    }

    return { createWeatherRecordPageItem };
})();

export default UI;