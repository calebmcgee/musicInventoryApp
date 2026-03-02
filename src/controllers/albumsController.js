function getAllAlbums(req, res) {
    res.render("albums", {title: "Albums"});
}


module.exports = {
    getAllAlbums,
};