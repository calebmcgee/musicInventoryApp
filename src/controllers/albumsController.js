const { validationResult, body, matchedData } = require('express-validator');
const db = require('../db/queries');

async function getAllAlbums(req, res) {
    res.render("albums", {title: "Albums", albums: await db.getAllAlbums(), artists: await db.getAllArtists()});
}

async function deleteAlbum(req, res){
    const id = parseInt(req.params.id);
    await db.deleteAlbum(id);
    res.redirect("/albums");
}

const albumValidator = [
    body("name").trim()
    .notEmpty().withMessage("Must enter value for album name."),
    body("artistId").trim(),
    body("dateReleased").trim()
];
const createAlbum = [
    albumValidator,
    async (req, res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).render("albums", {
                title: "Albums",
                albums: await db.getAllAlbums(), 
                artists: await db.getAllArtists(),
                errors: errors.array()
            });
        }
        const { name, artistId, dateReleased } = matchedData(req);
        await db.createAlbum(name, dateReleased, artistId);
        res.redirect("/");
}];

module.exports = {
    getAllAlbums,
    createAlbum,
    deleteAlbum
};