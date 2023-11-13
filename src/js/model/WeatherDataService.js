const weatherDataService = (() => {
    const CallerType = Object.freeze({
        Current: 1,
        Forecast: 2,
        Astronomy: 3,
    });

    const baseUrl = 'https://api.weatherapi.com/v1';

    const getCurrentJSON = async (query) => {
        const link = formatLink(query, CallerType.Current);

        fetch(link, {mode:'cors'}).then((e) => {
            e.json().then((e) => {
                console.log(e);
            })
        })
    };

    const getForecastJSON = async (query) => {
        const link = formatLink(query, CallerType.Forecast);
    };

    const getAstronomyJSON = async (query) => {
        const ext = formatLink(query, CallerType.Astronomy);
    };

    const formatLink = (query, caller) => {
        let ext = '';

        let apiType = '';
        switch(caller) {
            case CallerType.Current:
                apiType = 'current.json';
                break;
            case CallerType.Forecast:
                apiType = 'forecast.json';
                break;
            case CallerType.Astronomy:
                apiType = 'astronomy.json';
                break;
            default:
                console.log(`:: Error: no CallerType of type '${caller}'. ::`);
                return;
        }

        let key = '3f2e84dd6a2b4533a01145609231311';
        ext = `${baseUrl}/${apiType}?key=${key}&${query}`;

        return ext;
    }

    return {
        getCurrentJSON,
        getForecastJSON,
        getAstronomyJSON,
    }
})();

export default weatherDataService;