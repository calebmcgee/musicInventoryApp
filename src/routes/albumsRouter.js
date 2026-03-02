const { Router } = require('express');
const { getAllAlbums, } = require('../controllers/albumsController');
const albumsRouter = Router();

albumsRouter.get('/', getAllAlbums);

module.exports = albumsRouter;