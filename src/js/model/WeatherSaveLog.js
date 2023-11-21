const weatherSaveLog = (() => {
    let lastQuery = '';
    let lastQueryResults = null;
    let currentTempUnit = 'F';

    const getLastQuery = () => lastQuery;
    const setLastQuery = (last) => { lastQuery = last };
    const getLastQueryResults = () => lastQueryResults;
    const setLastQueryResults = (results) => { lastQueryResults = results; };
    const getCurrentUnit = () => currentTempUnit;
    const toggleCurrentUnit = () => { 
        currentTempUnit = (currentTempUnit === 'F' ? 'C' : 'F'); 
        return currentTempUnit;
    }


    return { 
        setLastQuery, 
        getLastQuery, 
        setLastQueryResults, 
        getLastQueryResults,
        getCurrentUnit,
        toggleCurrentUnit,
    };
})();

export default weatherSaveLog;