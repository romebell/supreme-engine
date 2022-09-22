const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
require('dotenv').config();
const axios = require('axios');

// routes
router.get('/', async (req, res) => {
    // get all of the songs from the db
    let songs = await db.song.findAll();
    songs = songs.map(s => s.toJSON()); // removes all of the unncessary data
    console.log(songs); // this shows me all of the song data -> previousValues
    // render the (songs/index) page
    res.render('songs/index', { songs: songs });
})

router.get('/search', (req, res) => {
    res.render('songs/search');
});

router.post('/new', async (req, res) => {
    // print req.body to view form inputs
    console.log('****** /new', req.body);
    // create song (for db)
    const newSong = await db.song.create({
        title: req.body.title,
        artist: req.body.artist,
        img: req.body.img,
        lyrics: req.body.lyrics,
        userId: parseInt(req.body.userId)
    });
    console.log(newSong.toJSON());
    // res.redirect to all favorite songs
    res.redirect('/songs');
});

router.post('/results', async (req, res) => {
    // get back the search item
    console.log('>>>>> SEARCH DATA', req.body);
    // use axios to find the results
    const options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/search',
        params: { q: req.body.search },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'genius.p.rapidapi.com'
        }
    };
    const response = await axios.request(options);
    console.log('yoooo, response >>>>', response.data.response.hits)

    // render the songs/results page 
    res.render('songs/results', { hits: response.data.response.hits });
})

module.exports = router;