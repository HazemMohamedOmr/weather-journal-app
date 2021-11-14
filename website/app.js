/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f3ce3a3b496f60edda9cc2d388b9a724';

// Event listener to add function to existing HTML DOM element

document.getElementById('btn-submit').addEventListener('click', (e)=>{
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    getWebAPIData(baseURL, zipCode, apiKey)
    .then((data)=>{
        postData('/weatherInfo',
            {'main': data.main, 'sys': data.sys, 'wind': data.wind, 'name': data.name, 'date': newDate, 'userRes': userResponse})
        .then(()=>{
            updateUI("/data");
        })
    })
});

/* Function to GET Web API Data*/

const getWebAPIData = async (baseURL, zipCode, apiKey) =>{
    const req = await fetch(baseURL+zipCode+apiKey);
    try {
        const data = await req.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to POST data */

const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

/* Function to GET Project Data */

const getProjectData = async(url='') =>{ 
    const request = await fetch(url);
    try {
        const allData = await request.json();
        return allData;
    }
    catch(error) {
        console.log("error", error);
    }
}

const updateUI = async (url)=>{
    let data = await getProjectData(url);
    document.getElementById('country').innerText = data.sys.country;
    document.getElementById('name').innerText = data.name;
    document.getElementById('temp-curr').innerText = data.main.temp;
    document.getElementById('temp-max').innerText = data.main.temp_max;
    document.getElementById('temp-min').innerText = data.main.temp_min;
    document.getElementById('date').innerText = data.date;
    document.getElementById('wind-speed').innerText = data.wind.speed;
    document.getElementById('wind-deg').innerText = data.wind.deg;
    document.getElementById('opinion').innerText = data.userRes;
}