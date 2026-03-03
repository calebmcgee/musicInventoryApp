const db = require('../db/queries');

async function getAllAlbums(req, res) {
    res.render("albums", {title: "Albums", albums: db.getAllAlbums()});
}


module.exports = {
    getAllAlbums,
};