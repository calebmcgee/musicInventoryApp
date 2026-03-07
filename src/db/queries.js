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

async function getArtist(id){
    const { rows } = await pool.query(`SELECT * FROM artists WHERE id = ($1)`, [id]);
    return rows[0];
}

//Albums 
async function getAllAlbums(){
    const { rows } = await pool.query("SELECT * FROM albums");
    return rows;
}

async function getAllAlbumArtists(){
    const { rows } = await pool.query(`SELECT * FROM album_artists WHERE `)
}

async function createAlbum(name, date, artistId) {
    const { rows } = await pool.query(
        `INSERT INTO albums (name, date_released) 
        VALUES ($1, $2) 
        RETURNING (id);`,
        [name, date]
    );

    const albumId = rows[0];

    await pool.query(
        `INSERT INTO album_artists (album_id, artist_id) 
        VALUES ($1, $2);`,
        [albumId, artistId]
    );
}

async function deleteAlbum(id){
    await pool.query(`DELETE FROM albums WHERE id = ($1)`, [id]);
}

async function getAlbum(id){
    const { rows } = await pool.query(`SELECT * FROM album WHERE id = ($1)`, [id]);
    return rows[0];
}

module.exports = {
    getAllAlbums,
    getAllArtists,
    getAllSongs,
    //artists
    createArtist,
    deleteAllArtists,
    deleteArtist,
    getArtist,
    //albums
    createAlbum,
    deleteAlbum,
    getAlbum,
    getAllAlbumArtists
};

