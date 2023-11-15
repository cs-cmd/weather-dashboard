const weatherDataService = (() => {
    const baseUrl = 'https://api.weatherapi.com/v1';

    const getWeatherJSON = async (query, apiSubtype, getLocation = false) => {
        const link = formatLink(query, apiSubtype);
        const formatter = resolveFormatter(apiSubtype);
        
        // error in processing, return
        if (!formatter) {
            console.log(`:: Error: formatter function is undefined or null. ::`);
            return;
        }

        console.log(link);

        // return new Promise((resolve, reject) => fetch(link, { mode: 'cors' }))
        return Promise.race( [ createTimeoutPromise(), fetch(link, { mode: 'cors' }) ] )
        .then(response => response.json())
        .then(responseJson => {
            if(responseJson.error) {
                throw new Error(`${responseJson.error.code} - ${responseJson.error.message}`);
            }
            
            let jsonData = formatter(responseJson);

            if(getLocation) {
                let location = formatLocationData(responseJson.location);
                jsonData = { location, current: jsonData };
            }

            return jsonData;
        });
    }

    // formats the link 
    const formatLink = (query, caller) => {
        let ext = '';

        let key = '3f2e84dd6a2b4533a01145609231311';
        ext = `${baseUrl}/${caller}.json?key=${key}&q=${query.formatQuery()}`;

        return ext;
    }

    const resolveFormatter = (apiSubtype) => {
        let formatterFunction = null;
        switch(apiSubtype) {
            case 'current':     
                formatterFunction = formatCurrentWeatherData;
                break;
            case 'forecast':
                formatterFunction = formatForecastData;
                break;
            case 'astronomy':
                formatterFunction = formatAstronomyData;
                break;
            default:
                console.log(`:: Error: no valid subtype of type '${apiSubtype}'. ::`);
                return;
        }
        return formatterFunction;
    }

    const formatLocationData = (object) => {
        const { localtime_epoch, ...json } = object; 
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

        const json = {};

        return json;
    }

    // formats forecast data
    const formatForecastData = (object) => {
        const forecastJson = object.forecast;

        const json = {};

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