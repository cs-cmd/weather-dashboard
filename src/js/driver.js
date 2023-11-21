import weatherDataService from './model/WeatherDataService.js';
import Query from './model/Query.js';
import UI from './view/UI.js';

const queryForm = document.getElementById('query-form');
const searchBar = document.getElementById('queryBar');
const toggleUnitButton = document.getElementById('toggle-unit-button');


queryForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const query = new Query(searchBar.value);

    runApiCall(query);
});

toggleUnitButton.addEventListener('click', () => {
    UI.toggleTempUnit();
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

