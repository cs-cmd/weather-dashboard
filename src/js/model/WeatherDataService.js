const weatherDataService = (() => {
    const baseUrl = 'https://api.weatherapi.com/v1';
    const key = '3f2e84dd6a2b4533a01145609231311';

    const getWeatherJSON = async (query) => {
        const queryValue = query.formatQuery();
        const currDate = new Date();

        // format date for astronomy link
        const formattedDate = `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDay()}`;

        const forecastLink = `${baseUrl}/forecast.json?key=${key}&q=${queryValue}&days=3&alerts=yes`;
        const astronomyLink = `${baseUrl}/astronomy.json?key=${key}&q=${queryValue}&dt=${formattedDate}`;
        
        // retrieve either 
        return Promise.race( [ createTimeoutPromise(), 
            Promise.all( [fetch(forecastLink, { mode: 'cors' }),
                          fetch(astronomyLink, { mode: 'cors' })  ])
    ] )
        .then(response => {
            const responseCode = response[0].status;

            // if response code is anything other than success, throw new error
            if(responseCode !== 200) {
                throw new Error(`Error: ${responseCode}`);
            }

            // return json-ified response
            return Promise.all([ response[0].json(),
                                response[1].json()]);
        })
        .then(responseJson => {
            // full JSON of weather data
            const weatherJson = {
                location: formatLocationData(responseJson[0].location),
                current: formatCurrentWeatherData(responseJson[0].current),
                forecast: formatForecastData(responseJson[0].forecast),
                astronomy: formatAstronomyData(responseJson[1].astronomy),
            };

            return weatherJson;
        });
    }

    // format location data, excluding localtime_epoch item
    const formatLocationData = (locationJson) => {
        const { localtime_epoch, ...json } = locationJson; 
        return json;
    }
    
    // formats data for the current day/time
    const formatCurrentWeatherData = (currentJson) => {
        const json = {
            last_updated: currentJson.last_updated,
            temp_c: currentJson.temp_c,
            feelslike_c: currentJson.feelslike_c,
            temp_f: currentJson.temp_f,
            feelslike_f: currentJson.feelslike_f,
            condition: {...currentJson.condition},
        };

        return json;
    }

    // formats astronomical data for use
    const formatAstronomyData = (astronomyJson) => {
        const json = {
            ...astronomyJson,
        };

        return json;
    }

    // formats forecast data
    const formatForecastData = (forecastJson) => {
        const json = {
            ...forecastJson,
        };

        return json;
    }

    // Rejects with a time out after 10 seconds
    const createTimeoutPromise = () => {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')), 10000);
        });
    }

    return {
        getWeatherJSON,
    }
})();

export default weatherDataService;