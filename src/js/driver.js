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
    const apiSubtype = 'current';

    runApiCall(query, apiSubtype);
});

refreshButton.addEventListener('click', () => {
    const lastQuery = weatherSaveLog.getLastQuery();

    if (lastQuery === '') {
        return;
    }

    runApiCall(lastQuery, 'current', false);
});


function runApiCall(query, apiSubtype, isFresh = true) {
    const val = weatherDataService.getWeatherJSON(query, apiSubtype, true);
    val.then(formattedJson => {

        if(isFresh) {
            UI.createWeatherRecordPageItem(formattedJson);
        }

        UI.loadData(formattedJson);

        weatherSaveLog.setLastQuery(query);
    })
    .catch(err => {
        console.log(err);
    });
}

