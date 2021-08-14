const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=temperature&timesteps=1h&units=metric&apikey=N5AHZm2vUKsvzQCtuBhDaapJtQI48dHx`,
        json: true
    }, (error, response, body) => {
        if(error){
          callback('Unable to connect to the Tomorrow.io server.');
        } else if(response.statusCode === 400) {
          callback('Unable to fetch weather.');
        } else if(response.statusCode === 200) {
          callback(undefined, {
            temperature: body.data.timelines[0].intervals[0].values.temperature
          });
        }
       
    });
    
}

module.exports.getWeather = getWeather;