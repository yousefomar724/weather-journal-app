/* Global Variables */

// My API keys for openweathermap API
const mainUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=f9cd6a0419771668ab7698bb2293bf7a';

// Adding function with event listener to an html element
const generateElmnt = document.getElementById('generate').addEventListener('click', generateResult)

const dateElmnt = document.getElementById('date');
const tempElmnt = document.getElementById('temp');
const contentElmnt = document.getElementById('content');
const feelingsElmnt = document.getElementById('feelings');

// New date Instance
let d = new Date();

// GenerateResult Function (Called by event listener)
function generateResult(e) {
    const zipCodeElmnt = document.getElementById('zip').value;
    feelingsElmnt.value;
    getTemp(mainUrl, zipCodeElmnt, apiKey).then(function(data) {
        console.log(data);

        // Push data to POST request
        pushData('/push', {
            date: d,
            temp: data.list[0].main.temp,
            content: feelingsElmnt
        })
        updateUserInterface();
    })
};

// Get API data Function
const getTemp = async (mainUrl, zip, key) => {
    const response = await fetch(mainUrl + zip + key)
    try{
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('error', error)
    }
}

// pushData function to POST data to server
const pushData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        const newEntryData = await response.json();
        console.log(newEntryData);
        return newEntryData;
    }catch(error) {
        console.log('error', error);
    }
}

// GET project data and update user inerface
const updateUserInterface = async () => {
    const request = await fetch('/all');
    try{
        const sendData = await request.json();
        dateElmnt.innerHTML = `The Date is: ${sendData[0].date}`;
        tempElmnt.innerHTML = `The Temperature is: ${sendData[0].temp}`;
        contentElmnt.innerHTML = `I Feel: ${sendData[0].content}`;
    }catch(error){
        console.log('error', error)
    }
}