require('dotenv').config();
const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
    params: {q: 'drake'},
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'genius.p.rapidapi.com'
    }
};
axios.request(options).then((response) => {
    console.log('*********connected to API***********')
    console.log('this is array' , response.data.response.hits);
}).catch((error) => {
    console.error('There was an error retrieving response from API', error);
});

// console.log(new Date("Mon Sep 26 2022 14:58:54 GMT-0700 (Pacific Daylight Time)").toISOString())