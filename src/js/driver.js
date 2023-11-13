import weatherDataService from './model/WeatherDataService.js';
import Query from './model/Query.js';

const firstQuery = new Query('Denver');
console.log(firstQuery.formatQuery());

weatherDataService.getCurrentJSON(firstQuery.formatQuery());