const weatherSaveLog = (() => {
    //
    const locationRecords = [];
    let lastQuery = '';

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
    const setLastQuery = (last) => ( lastQuery = last );

    return { addLocation, removeLocation, setLastQuery, getLastQuery };
})();

export default weatherSaveLog;