import weatherDataService from './model/WeatherDataService.js';
import Query from './model/Query.js';

console.log(firstQuery.formatQuery());

weatherDataService.getCurrentJSON(firstQuery.formatQuery());