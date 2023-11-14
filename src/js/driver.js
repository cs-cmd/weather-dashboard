import weatherDataService from './model/WeatherDataService.js';
import Query from './model/Query.js';
import UI from './view/UI.js';

const queryForm = document.getElementById('query-form');
const searchBar = document.getElementById('queryBar')

queryForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const query = new Query(searchBar.value);

    const help = weatherDataService.getWeatherJSON(query.formatQuery());
    
    help.then(formattedJson => {
        UI.createWeatherRecordPageItem(formattedJson);
    })
    .catch(err => {

    })
})

