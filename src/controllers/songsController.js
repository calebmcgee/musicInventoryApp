function getAllSongs(req, res) {
    res.render("songs", {title: "Songs"});
}


module.exports = {
    getAllSongs,
};