const weatherDataService = (() => {
    // create Enum-like structure for handling caller type
    const CallerType = Object.freeze({
        Current: 1,
        Forecast: 2,
        Astronomy: 3,
    });

    const baseUrl = 'https://api.weatherapi.com/v1';

    const getWeatherJSON = async (queryArg, callerType = CallerType.Current) => {
        const [ link, formatter ] = formatLinkAndFormatter(queryArg, callerType);

        // error in processing, return
        if (!formatter) {
            console.log(`:: Error: formatter function is undefined or null. ::`);
            return;
        }
        
        return Promise.race( [ fetch(link, {mode: 'cors' }), createTimeoutPromise() ] )
        .then(response => response.json())
        .then(json => formatter(json));
    }

    // formats the link 
    const formatLinkAndFormatter = (query, caller) => {
        let ext = '';
        let formatterFunction = null;

        let apiType = '';
        switch(caller) {
            case CallerType.Current:
                apiType = 'current.json';
                formatterFunction = formatCurrentWeatherData;
                break;
            case CallerType.Forecast:
                apiType = 'forecast.json';
                formatterFunction = formatForecastData;
                break;
            case CallerType.Astronomy:
                apiType = 'astronomy.json';
                formatterFunction = formatAstronomyData;
                break;
            default:
                console.log(`:: Error: no CallerType of type '${caller}'. ::`);
                return;
        }

        let key = '3f2e84dd6a2b4533a01145609231311';
        ext = `${baseUrl}/${apiType}?key=${key}&q=${query}`;

        return [ ext, formatterFunction ];
    }

    // formats data for the current day/time
    const formatCurrentWeatherData = (object) => {
        const json = {
            location: object.location.name,
        };

        return json;
    }

    // formats astronomical data for use
    const formatAstronomyData = (object) => {
        const json = {};

        return json;
    }

    // formats forecast data
    const formatForecastData = (object) => {
        const json = {};

        return json;
    }

    // Rejects with a time out after 5 seconds
    const createTimeoutPromise = () => {
        return new Promise((_, reject) => {
            setTimeout(() => reject('Timeout'), 5000);
        });
    }

    return {
        getWeatherJSON,
    }
})();

export default weatherDataService;