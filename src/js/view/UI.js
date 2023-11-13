const UI = (() => {

    const createWeatherRecordPageItem = (weatherRecord) => {
        const recordPageItem = document.createElement('div');
        recordPageItem.classList.add('weather-record');
        recordPageItem.innerText = weatherRecord;
    } 
})();

export default UI;