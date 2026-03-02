const { Router } = require('express');
const { getAllArtists, } = require('../controllers/artistsController');
const artistsRouter = Router();

artistsRouter.get('/', getAllArtists);

module.exports = artistsRouter;