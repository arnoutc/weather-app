const request = require('request');
var yargs = require('yargs');

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
var encodedAddress = encodeURIComponent(argv.address)

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDrl8TcumK_JR8rnR2J0ZHKM9nuo5xFqDk`,
    json: true
}, (error, response, body) => {
    if(error){
        console.log('Unable to connect Google servers.');
    } else if (body.status === 'ZERO_RESULTS'){
        console.log('Unable to find that address.');
    } else if (body.status === 'OK'){
        //console.log(JSON.stringify( body, undefined, 2));
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
});