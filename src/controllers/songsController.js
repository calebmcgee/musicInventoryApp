const db = require('../db/queries');

function getAllSongs(req, res) {
    res.render("songs", {title: "Songs", songs: db.getAllSongs()});
}


module.exports = {
    getAllSongs,
};