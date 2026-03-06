const { Router } = require('express');
const { getAllArtists, deleteAllArtists, postArtist, getArtist, deleteArtist} = require('../controllers/artistsController');
const artistsRouter = Router();

artistsRouter.get('/', getAllArtists);

artistsRouter.post('/', postArtist);

artistsRouter.post('/deleteAllArtists', deleteAllArtists);

artistsRouter.post('/delete/:artistId', deleteArtist);

artistsRouter.get('/:artistId', getArtist);

module.exports = artistsRouter;