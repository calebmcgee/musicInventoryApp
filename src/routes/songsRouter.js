const { Router } = require('express');
const { getAllSongs, } = require('../controllers/songsController');

const songsRouter = Router();

songsRouter.get('/', getAllSongs);

module.exports = songsRouter;