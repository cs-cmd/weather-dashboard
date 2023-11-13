const weatherSaveLog = (() => {
    //
    const locationRecords = []

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
})