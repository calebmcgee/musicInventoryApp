const { Router } = require('express');
const { getAllSongs, createSong, deleteSong} = require('../controllers/songsController');

const songsRouter = Router();

songsRouter.get('/', getAllSongs);

songsRouter.post('/', createSong);

songsRouter.post('/delete/:id', deleteSong);

module.exports = songsRouter;