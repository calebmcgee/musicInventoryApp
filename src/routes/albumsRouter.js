const { Router } = require('express');
const { getAllAlbums, createAlbum, deleteAlbum } = require('../controllers/albumsController');
const albumsRouter = Router();

albumsRouter.get('/', getAllAlbums);

albumsRouter.post('/', createAlbum);

albumsRouter.post('/delete/:id', deleteAlbum);

module.exports = albumsRouter;