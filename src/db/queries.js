const pool = require('./pool');

//Songs

async function getAllSongs(){
    const { rows } = await pool.query("SELECT * FROM songs");
    return rows;
}

async function createSong(name, albumId, rating, genre, artistId){
    const { rows } = await pool.query(
        `INSERT INTO songs (name, album_id, rating, genre) 
        VALUES ($1, $2, $3, $4)
        RETURNING id;`, [name, albumId, rating, genre]
    );
    const songId = rows[0].id;

    for (const artist in artistId){
        await pool.query(
            `INSERT INTO song_artists (song_id, artist_id)
            VALUES ($1, $2)`, [songId, artist]
        );
    }
}

async function deleteSong(id) {
    await pool.query(`DELETE FROM songs WHERE id = ($1)`, [id]);
    await pool.query(`DELETE FROM song_artists WHERE song_id = ($1)`, [id]);
}

async function getAllSongArtists() {
    const { rows } = await pool.query(`
        SELECT songs.id, songs.name, songs.rating, songs.genre, albums.name AS album, artists.name AS artists
        FROM songs
        JOIN song_artists ON songs.id = song_artists.song_id
        JOIN artists ON song_artists.artist_id = artists.id
        JOIN albums ON songs.album_id = albums.id`
    );

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
    // Delete the artist's albums + songs
    const { rows } = await pool.query(`SELECT * FROM album_artists WHERE artist_id = ($1);`, [id]);
    //const { songRows } = await pool.query(`SELECT * FROM song_artists WHERE artist_id = ($1);`, [id]);
    
    for (const row of rows){
        await pool.query(`DELETE FROM albums WHERE id = ($1);`, [row.album_id]);
    }
    // for (const row of songRows){
    //     await pool.query(`DELETE FROM songs WHERE id = ($1);`, [row.song_id]);
    // }

    // Delete artist
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
    const {rows} = await pool.query(
        `SELECT albums.id, albums.name, albums.date_released, artists.name AS artists
        FROM albums
        JOIN album_artists ON albums.id = album_artists.album_id
        JOIN artists ON artists.id = album_artists.artist_id`
    );
    return rows;
}

async function createAlbum(name, date, artistList) {
    const { rows } = await pool.query(
        `INSERT INTO albums (name, date_released) 
        VALUES ($1, $2) 
        RETURNING (id);`,
        [name, date]
    );

    const albumId = rows[0].id;
    for (const id of artistList){
        await pool.query(
            `INSERT INTO album_artists (album_id, artist_id) 
            VALUES ($1, $2);`,
            [albumId, id]
        );
    };

}

async function deleteAlbum(id){
    await pool.query(`DELETE FROM albums WHERE id = ($1);`, [id]);
    await pool.query(`DELETE FROM songs WHERE id = ($1);`, [id]);

}

async function getAlbum(id){
    const { rows } = await pool.query(`SELECT * FROM albums WHERE id = ($1)`, [id]);
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
    getAllAlbumArtists,
    //songs
    createSong,
    deleteSong,
    getAllSongArtists
};

