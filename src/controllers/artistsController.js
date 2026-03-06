const db = require('../db/queries');
const {body, matchedData, validationResult } = require('express-validator');

// Get
async function getAllArtists(req, res) {
    res.render("artists", {title: "Artists", artists: await db.getAllArtists()});
}
// Delete all artists
async function deleteAllArtists(req, res) {
    await db.deleteAllArtists();
    res.redirect("/artists");
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
    postArtist
};