const weatherDataService = (() => {
    const baseUrl = 'https://api.weatherapi.com/v1';
    const key = '3f2e84dd6a2b4533a01145609231311';

    const getWeatherJSON = async (query) => {
        const queryValue = query.formatQuery();
        const currDate = new Date();
        const formattedDate = `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDay()}`;

        const forecastLink = `${baseUrl}/forecast.json?key=${key}&q=${queryValue}&days=3&alerts=yes`;
        const astronomyLink = `${baseUrl}/astronomy.json?key=${key}&q=${queryValue}&dt=${formattedDate}`;
        
        // return new Promise((resolve, reject) => fetch(link, { mode: 'cors' }))
        return Promise.race( [ createTimeoutPromise(), 
            //fetch(link, { mode: 'cors' }) 
            Promise.all( [fetch(forecastLink, { mode: 'cors' }),
                          fetch(astronomyLink, { mode: 'cors' })  ])
    ] )
        .then(response => {
            return Promise.all([ response[0].json(),
                                response[1].json()]);
        })
        .then(responseJson => {
            const weatherJson = {
                location: formatLocationData(responseJson[0]),
                current: formatCurrentWeatherData(responseJson[0]),
                forecast: formatForecastData(responseJson[0]),
                astronomy: formatAstronomyData(responseJson[1]),
            };

            return weatherJson;

            // format location
            // format current
            // format astronomy
            // format forecase
        });
    }

    const formatLocationData = (object) => {
        const { localtime_epoch, ...json } = object.location; 
        return json;
    }
    
    // formats data for the current day/time
    const formatCurrentWeatherData = (object) => {
        const currentJson = object.current;

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
    const formatAstronomyData = (object) => {
        const astronomyJson = object.astronomy;

        const json = {
            ...astronomyJson,
        };

        return json;
    }

    // formats forecast data
    const formatForecastData = (object) => {
        const forecastJson = object.forecast;

        // find index of next hour
        // get forecast days for today's date for that hour only, then

        const json = {
            ...forecastJson,
        };

        return json;
    }

    // Rejects with a time out after 10 seconds
    const createTimeoutPromise = () => {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')),10000);
        });
    }

    return {
        getWeatherJSON,
    }
})();

export default weatherDataService;