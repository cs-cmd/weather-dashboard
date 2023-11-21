import weatherSaveLog from '../model/WeatherSaveLog.js';

const UI = (() => {
    // F, C
    let currentTempUnit = 'F';

    // display elements for current temperature display
    const currrentTempDisplay = document.getElementById('curr-temp');
    const weatherConditionDisplay = document.getElementById('weather-condition');
    const feelsLikeTempDisplay = document.getElementById('feels-like-temp');
    const currentTempSymbol = document.getElementById('curr-temp-symbol');
    const feelsLikeSymbol = document.getElementById('feels-like-symbol');

    // loading icon page element
    const loadingIcon = document.getElementById('loading-icon');

    // location information display
    const locationNameDisplay = document.getElementById('location-name');
    const locationRegionDisplay = document.getElementById('location-region');
    const locationLonLatDisplay = document.getElementById('location-lon-lat');

    // last update display
    const lastUpdatedDisplay = document.getElementById('last-updated');

    // last day button clikced
    let lastClickedDrilldownButton = null;

    // resets certain UI elements
    const resetUIElements = () => {
        const forecastDrilldown = document.querySelector('.forecast-drilldown');
        forecastDrilldown.classList.remove('dropped');
    }

    // loads data to dashboard
    const loadData = (jsonData) => {
        weatherSaveLog.setLastQueryResults(jsonData);
        const location = jsonData.location;
        const current = jsonData.current;
        const astronomy = jsonData.astronomy;
        const forecastDays = jsonData.forecast.forecastday;

        resetUIElements();

        // load location and current temperature
        loadTemperature({ 
            temp: current.temp_f, 
            feelslike: current.feelslike_f,
            unit: 'F',
        });
        
        weatherConditionDisplay.innerText = current.condition.text;
        locationNameDisplay.innerText = location.name;

        // get either location country or region, whichever is not null
        let displayRegion = '';
        if (location.region === '') {
            displayRegion = location.country;
        } else {
            displayRegion = location.region;
        }

        locationRegionDisplay.innerText = displayRegion;

        // formatted longitutde and latitude
        let longLatFormatted = `${location.lon}, ${location.lat}`;
        locationLonLatDisplay.innerText = longLatFormatted;
        
        // last update of weather
        lastUpdatedDisplay.innerText = current.last_updated;

        // load forecast data
        const forecastCards = document.querySelectorAll('section.forecast > .forecast-button');
        
        // loads next three days to forecast days
        for(let i = 0; i < forecastDays.length && i < forecastCards.length; ++i) {
            loadForecast(forecastDays[i], forecastCards[i]);
        }
    }

    // toggles temperature unit
    function toggleTempUnit() {
        // if falsy, return
        if (!weatherSaveLog.getLastQueryResults()) {
            return;
        }

        const currentJson = weatherSaveLog.getLastQueryResults().current;

        // toggle unit and get new current unit
        const newUnit = weatherSaveLog.toggleCurrentUnit();

        let temps = {};
        switch(newUnit) {
            case 'C': 
                temps = {
                    temp: currentJson.temp_c,
                    feelslike: currentJson.feelslike_c,
                };
                break;
            case 'F': 
                temps = {
                    temp: currentJson.temp_f,
                    feelslike: currentJson.feelslike_f,
                }
                break;
            default:
                console.log(`:: Error: weather type: ${newUnit} is invalid. ::`);
                return;
        }

        temps = {
            unit: newUnit,
            ...temps,
        }

        loadTemperature(temps);
    }

    // load temperature into display elements
    function loadTemperature(temps) {
        currrentTempDisplay.innerText = temps.temp;
        feelsLikeTempDisplay.innerText = temps.feelslike;
        currentTempSymbol.innerText = temps.unit;
        feelsLikeSymbol.innerText = temps.unit;
    }

    // load forecast days
    function loadForecast(day, button) {
        const headerEle = button.querySelector('.day-date');
        headerEle.innerText = day.date;

        button.addEventListener('click', () => {
            loadForecastDayData(day);
            changeHourDrilldownButton(button);
        })
    }

    // load hourly forecast into drilldown
    function loadForecastDayData(forecastDayJson) {
        resetUIElements();

        if (!forecastDayJson) {
            console.log(':: Error: forecastDayJson is null; returning, ::');
            return;
        }

        const forecastDrilldown = document.querySelector('.forecast-drilldown');

        // if container isn't empty, clear
        if (forecastDrilldown.children.length !== 0) {
            Array.from(forecastDrilldown.children).forEach(e => e.remove());
        }        

        // get hours array
        const forecastHours = forecastDayJson.hour;

        // create a div for each hour and add to drilldown
        for(let i = 0; i < forecastHours.length; ++i) {
            const hourDiv = createForecastHourCard(forecastHours[i]);

            forecastDrilldown.appendChild(hourDiv);
        }

        // add class
        forecastDrilldown.classList.add('dropped');

        // scrolls to left-most spot on scrollbar
        forecastDrilldown.scrollTo(0, 0);
    }

    // creates card for hour of a forecast
    function createForecastHourCard(forecastHourJson) {
        const hourDiv = document.createElement('div');
        
        // format time
        const formattedTime = formatDateTimeString(forecastHourJson.time);
        
        const conditionIconLink = forecastHourJson.condition.icon;
        const conditionIconElement = document.createElement('img');
        conditionIconElement.src = conditionIconLink;
        conditionIconElement.draggable = false;

        hourDiv.innerText = formattedTime;
        hourDiv.classList.add('forecast-hour');

        hourDiv.appendChild(conditionIconElement);

        return hourDiv;
    } 

    // format time
    // API uses 24-hour clock
    function formatDateTimeString(timeString) {
        const timeIndex = timeString.search(/[0-9]{2}:[0-9]{2}/);
        const time = timeString.slice(timeIndex, timeIndex+5);
        
        let hour = time.slice(0, 2);
        const minute = time.slice(3);
        // AM or PM
        let ampm = 'AM';
        
        // if hour is 0, set to 12, or if hour is greater than 12, subtract 12 and 
        // set to PM
        if(hour == 0) {
            hour = '12';
        } else if (hour > 12) {
            hour = hour - 12;
            ampm = 'PM';
        }

        return `${hour}:${minute} ${ampm}`;
    }

    // toggle loading icon
    function toggleLoading() {
        loadingIcon.classList.toggle('is-running');
    }

    // change the button 
    function changeHourDrilldownButton(button) {
        if(lastClickedDrilldownButton) {
            lastClickedDrilldownButton.classList.remove('selected-button');
        }

        console.log(button)
        button.classList.add('selected-button');
        lastClickedDrilldownButton = button;
        return;
    }

    return { 
        loadData, 
        toggleLoading,
        toggleTempUnit, 
        changeHourDrilldownButton
    };
})();

export default UI;