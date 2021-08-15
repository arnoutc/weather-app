const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
              .options({
                  a: {
                      demand: true,
                      alias: 'address',
                      describe: 'Address to fetch weather for',
                      string: true
                  }
              })
              .help()
              .alias('help','h')
              .argv;

 var encodedAddress = encodeURIComponent(argv.address);
 var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDrl8TcumK_JR8rnR2J0ZHKM9nuo5xFqDk`;

 axios.get(geocodeURL).then((response) => {
     if(response.data.status === 'ZERO_RESULTS'){
         throw new Error('Unable to find that address.');
     }
     console.log(response.data);

     let address = response.data.results[0].formatted_address;
     console.log(`formatted_address ${address}`);

     let lat = response.data.results[0].geometry.location.lat;
     console.log(`lat is ${lat}`);
     let lng = response.data.results[0].geometry.location.lng;
     console.log(`lng is ${lng}`);
     //tomorrow.io let url = `https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=temperature&timesteps=1h&units=metric&apikey=N5AHZm2vUKsvzQCtuBhDaapJtQI48dHx`;
    let url = `https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=temperature&timesteps=1h&units=metric&apikey=N5AHZm2vUKsvzQCtuBhDaapJtQI48dHx`;

     //openweather API let url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&${lon}&APPID=a9201668aa8b7c949cbd9024a85818b8`
     //let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&${lng}&APPID=a9201668aa8b7c949cbd9024a85818b8`;
     //let url = `http://api.openweathermap.org/data/2.5/weather?q=Cochabamba,bolivia&APPID=a9201668aa8b7c949cbd9024a85818b8`;
     return axios.get(url);
    }).then((response) => {
       //console.log(`response is ${response}`);
       //tomorrow.io let temperature = response.data.timelines[0].intervals[0].values.temperature;
       console.log(response);
       let temperature = response.data.data.timelines[0].intervals[0].values.temperature;

       //openweather API let temperature = response.main.temp
       //console.log(response);
       //openweather API: let temperature = response.data.main.temp;

       
        console.log(`It's currently ${temperature}`);
    }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  });



