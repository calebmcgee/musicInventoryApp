function getAllArtists(req, res) {
    res.render("artists", {title: "Artists"});
}


module.exports = {
    getAllArtists,
};