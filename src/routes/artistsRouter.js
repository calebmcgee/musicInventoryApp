const { Router } = require('express');
const { getAllArtists, deleteAllArtists, postArtist} = require('../controllers/artistsController');
const artistsRouter = Router();

artistsRouter.get('/', getAllArtists);

artistsRouter.post('/', postArtist);

artistsRouter.post('/deleteAllArtists', deleteAllArtists);

module.exports = artistsRouter;