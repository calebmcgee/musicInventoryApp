const db = require('../db/queries');
const { body, validationResult , matchedData} = require('express-validator');

async function getAllSongs(req, res) {
    const rows = await db.getAllSongArtists();
    const songs = {};
    rows.forEach(row => {
        if(!songs[row.id]){
            songs[row.id] = {
                id : row.id,
                name: row.name,
                genre: row.genre,
                rating: row.rating,
                artists: [],
                album: row.album
            }
        }
        songs[row.id].artists.push(row.artists);
    })
    res.render("songs", {
        title: "Songs",
        albums: await db.getAllAlbums(),
        artists: await db.getAllArtists(),
        songs: Object.values(songs)
    });
}
const songValidator = [
    body("name").trim()
    .notEmpty().withMessage("Must enter a song name."),
    body("albumId")
    .notEmpty().withMessage("Must select an album, choose single if none."),
    body("artistId")
    .custom(value => {
        return value && (Array.isArray(value) ? value.length > 0 : true );
    })
    .withMessage("Must select at least 1 artist."),
    body("genre")
    .notEmpty().withMessage("Must select a genre."),
    body("rating")
    .isInt({min: 1, max: 10}).withMessage("Must enter rating from 1-10.")

]

const createSong = [
    songValidator,
    async (req,res) => {
        const error = validationResult(req);

        const rows = await db.getAllSongArtists();
        const songs = {};
        rows.forEach(row => {
                if(!songs[row.id]){
                    songs[row.id] = {
                    id : row.id,
                    name: row.name,
                    genre: row.genre,
                    rating: row.rating,
                    artists: [],
                    album: row.album
                }
            }
        songs[row.id].artists.push(row.artists);
        })

        if(!error.isEmpty){
            return res.status(400).render("songs", {
                title: "Songs",
                albums: await db.getAllAlbums(),
                artists: await db.getAllArtists(),
                songs: Object.values(songs)
            }) 
        }
        const { name, albumId, artistId, genre, rating } = matchedData(req);
        const artistList = [].concat(artistId).map(Number);
        await db.createSong(name, artistList, albumId, genre, rating);
        res.redirect('/songs');
    
    }
]

async function deleteSong(req, res) {
    await db.deleteSong(Number(req.params.id));
    res.redirect('/songs');
}

module.exports = {
    getAllSongs,
    createSong,
    deleteSong
};