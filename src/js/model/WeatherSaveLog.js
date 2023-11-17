const weatherSaveLog = (() => {
    //
    const locationRecords = [];
    let lastQuery = '';
    let lastQueryResults = null;
    let currentTempUnit = 'F';

    const addLocation = (query, link) => {
        const add = {
            query, 
            link,
        };

        locationRecords.push(add);
    }

    const removeLocation = (location) => {
        for(let i = 0; i < locationRecords.length; ++i) {
            if (locationRecords[i] === location) {
                locationRecords.splice(i, 1);
                return;
            }
        }
    }

    const getLastQuery = () => lastQuery;
    const setLastQuery = (last) => { lastQuery = last };
    const getLastQueryResults = () => lastQueryResults;
    const setLastQueryResults = (results) => { lastQueryResults = results; };
    const getCurrentUnit = () => currentTempUnit;
    const toggleCurrentUnit = () => { currentTempUnit = (currentTempUnit === 'F' ? 'C' : 'F'); }


    return { addLocation, 
        removeLocation, 
        setLastQuery, 
        getLastQuery, 
        setLastQueryResults, 
        getLastQueryResults,
        getCurrentUnit,
        toggleCurrentUnit,
    };
})();

export default weatherSaveLog;