const pool = require('./pool');

//Songs

async function getAllSongs(){
    const { rows } = await pool.query("SELECT * FROM songs");
    return rows;
}
//Artists
async function createArtist(name, city) {
    await pool.query(`INSERT INTO artists (name, city) VALUES ($1, $2);`,[name, city]);
}

async function getAllArtists(){
    const { rows } = await pool.query("SELECT * FROM artists");
    return rows;
}

async function deleteAllArtists(){
    await pool.query("DELETE FROM artists");
}

async function deleteArtist(id){
    await pool.query(`DELETE FROM artists WHERE id = ($1)`, [id]);
}

//Albums 
async function getAllAlbums(){
    const { rows } = await pool.query("SELECT * FROM albums");
    return rows;
}

module.exports = {
    getAllAlbums,
    getAllArtists,
    getAllSongs,
    createArtist,
    deleteAllArtists,
    deleteArtist
};

