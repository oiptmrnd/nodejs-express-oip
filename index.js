// Example of using ExpressJS to expose your service as a REST API server;
// NOTE: This is the most basic structure for demonstration purpose. Everything is in a single js file. 
// For more complex use case, you need to modularize your code :) 


const express = require('express');
const axios = require('axios');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;


// When client requesting GET http://localhost:3000 it will be handled here.
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

// When client is requesting GET http://localhost:3000/corona-data it will be handled here
app.get('/corona-data', (req, res) => {

    axios({
        method: 'GET',
        baseURL: 'https://api.oip.tmrnd.com.my',
        url: 'app/t/opendata.oip.tm.com.my/coronatracker/1.0.0/country',
        params: {
            startDate: '2020-08-25',
            endDate: '2020-08-27',
            countryCode: 'MY'
        },
        headers: {
            Authorization : 'Bearer <YOUR_TOKEN>'
        }
    }).then((result) => {
        console.log(result.data);
        res.status(200).json(result.data);

    }).catch(error => {
        console.error('Error Has Occured');
        console.log(error);
        res.status(500).json(error.message);
    });
});

// Start the service
server.listen(port, () => {
    console.log('Server is listening to port ' + port);
})