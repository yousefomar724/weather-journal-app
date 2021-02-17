// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// Listen Port
const port = 3333;

const setupServer = app.listen(port, checkServer);

function checkServer(){
    console.log(`server running on localhost: ${port}`);
}


// Post route
app.post('/push', pushData);

function pushData(request, response){
    console.log(request.body);

    newEntryData = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content
    }

    projectData.push(newEntryData);
}


// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(request, response){
    response.send(projectData);
    projectData = [];
}