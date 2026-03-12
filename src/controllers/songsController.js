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
            res.status(400).render("songs", {
                title: "Songs",
                albums: await db.getAllAlbums(),
                artists: await db.getAllArtists(),
                songs: Object.values(songs)
            }) 
        }
        const { name, albumId, artistId, genre, rating } = matchedData(req);
        res.send(artistId);
        const artistList = [].concat(Number(artistId) || artistId.map(id=>{Number(id)}));
        //await db.createSong(name, albumId, rating, genre, artistList);
        res.redirect('/');
    
    }
]

async function deleteSong(id) {
    await db.deleteSong(id);
}

module.exports = {
    getAllSongs,
    createSong,
    deleteSong
};