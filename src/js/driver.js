import weatherDataService from './model/WeatherDataService.js';
import Query from './model/Query.js';
import UI from './view/UI.js';

const queryForm = document.getElementById('query-form');
const searchBar = document.getElementById('queryBar')

queryForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const query = new Query(searchBar.value);
    const apiSubtype = 'current';

    const val = weatherDataService.getWeatherJSON(query, apiSubtype, true);
    val.then(formattedJson => {

        UI.createWeatherRecordPageItem(formattedJson);

        UI.loadData(formattedJson);
    })
    .catch(err => {
        console.log(err);
    })
})

