const UI = (() => {
    const recentSearchLog = document.getElementById('recent-searches');

    const createWeatherRecordPageItem = (weatherRecord) => {
        const recordPageItem = document.createElement('div');
        recordPageItem.classList.add('weather-record');
        console.log(weatherRecord.location);
        recordPageItem.innerText = weatherRecord.location;
        
        const mostRecentSearch = recentSearchLog.firstElementChild;

        if (mostRecentSearch) {
            recentSearchLog.insertBefore(recordPageItem, mostRecentSearch);
        } else {
            recentSearchLog.appendChild(recordPageItem);
        }
    } 

    return { createWeatherRecordPageItem };
})();

export default UI;