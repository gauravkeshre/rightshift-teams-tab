var dotenv = require ('dotenv').config({path: __dirname + '/../.env'});
const nodemon = require('nodemon');
const ngrok = require('ngrok');

const port  = process.env.PORT || 3000;

let url = null;

nodemon ({
    script: 'server/server.js',
    ext: 'js'
}).on('start', async () => {
    console.log('app.js just started')
    if (!url) {
        const url = await ngrok.connect({
            proto: "http",
            addr: port
        });
        console.log(`Your app is listening on ${url}`);
        process.env.HOST_NAME = removeHttp(url);
        const makeTeamsPayload = require('./makePackage.js');
    }
  }).on('quit', async () => {
    console.log('killing app.js')
  })
  
function removeHttp(url) {
    return url.replace(/^https?:\/\//, '');
}