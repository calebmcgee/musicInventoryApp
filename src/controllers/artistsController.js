const db = require('../db/queries');
const {body, matchedData, validationResult } = require('express-validator');

// Get all artists
async function getAllArtists(req, res) {
    res.render("artists", {title: "Artists", artists: await db.getAllArtists()});
}
// Delete all artists
async function deleteAllArtists(req, res) {
    await db.deleteAllArtists();
    res.redirect("/");
}

async function deleteArtist(req, res) {
    const artistId = parseInt(req.params.artistId);
    await db.deleteArtist(artistId);
    res.redirect("/artists");
}
// Get artist info
async function getArtist(req, res){
    const artistId = req.params.artistId;
    res.render('artistInfo', { artist: await db.getArtist(artistId), songs: []});
}

// Create New Artist
const validateArtist = [
    body("name").trim()
    .notEmpty().withMessage(`Must enter value artist name.`),
    body("city").trim()
    .notEmpty().withMessage(`Must enter value for city.`)
];
const postArtist = [
    validateArtist,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("artists", {
                title: "Artists",
                artists: await db.getAllArtists(),
                errors: errors.array()
            });
        }
        const { name, city } = matchedData(req);
        await db.createArtist(name, city);
        res.redirect("/artists");
}];

module.exports = {
    getAllArtists,
    deleteAllArtists,
    deleteArtist,
    postArtist,
    getArtist
};