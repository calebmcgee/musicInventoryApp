const { validationResult, body, matchedData } = require('express-validator');
const db = require('../db/queries');

async function getAllAlbums(req, res) {
    //Code required to display multiple artists for each album
    const albums = {};
    const rows = await db.getAllAlbumArtists();
    
    rows.forEach(row =>{    
        if(!albums[row.id]){
            albums[row.id] = {
                id: row.id,
                name : row.name,
                date_released: row.date_released,
                artists: []
            }
        }
        albums[row.id].artists.push(row.artists);
    });

    res.render("albums", {title: "Albums", albums: Object.values(albums), artists: await db.getAllArtists()});
}

async function deleteAlbum(req, res){
    const id = parseInt(req.params.id);
    await db.deleteAlbum(id);
    res.redirect("/albums");
}

const albumValidator = [
    body("name").trim()
    .notEmpty().withMessage("Must enter value for album name."),
    body("artistId")
    .custom(value => {
        return value && (Array.isArray(value) ? value.length > 0 : true);
    })
    .withMessage("Must select at least one album artist."),
    body("dateReleased")
    .notEmpty().withMessage("Must enter value for album release date.")
];

const createAlbum = [
    albumValidator,
    async (req, res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            //Code required to display multiple artists for each album
            const albums = {};
            const rows = await db.getAllAlbumArtists();
            rows.forEach(row =>{    
                if(!albums[row.id]){
                    albums[row.id] = {
                        id: row.id,
                        name : row.name,
                        date_released: row.date_released,
                        artists: []
                    }
                }
                albums[row.id].artists.push(row.artists);
            });
            return res.status(400).render("albums", {
                title: "Albums", 
                albums: Object.values(albums), 
                artists: await db.getAllArtists(),
                errors: errors.array()
            });
        }
        const { name, artistId, dateReleased } = matchedData(req);
        const artistList = [].concat(artistId || []).map(Number);
        await db.createAlbum(name, dateReleased, artistList);
        res.redirect("/albums");
}];

module.exports = {
    getAllAlbums,
    createAlbum,
    deleteAlbum
};