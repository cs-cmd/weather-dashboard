import weatherDataService from './model/WeatherDataService.js';
import Query from './model/Query.js';
import UI from './view/UI.js';
import weatherSaveLog from './model/WeatherSaveLog.js';

const queryForm = document.getElementById('query-form');
const searchBar = document.getElementById('queryBar');
const refreshButton = document.getElementById('refresh-button');


queryForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const query = new Query(searchBar.value);

    runApiCall(query);
});

refreshButton.addEventListener('click', () => {
    const lastQuery = weatherSaveLog.getLastQuery();

    if (lastQuery === '') {
        return;
    }

    runApiCall(lastQuery);
});

function runApiCall(query) {
    const weatherJson = weatherDataService.getWeatherJSON(query);
    
    UI.toggleLoading();

    weatherJson.then(weatherJson => {
        UI.loadData(weatherJson);
    }).catch(err => console.log(err))
    .finally(() => {
        UI.toggleLoading();
    });


}

