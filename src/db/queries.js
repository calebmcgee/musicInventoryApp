const pool = require('./pool');

//Songs

async function getAllSongs(){
    const { rows } = await pool.query("SELECT * FROM songs");
    return rows;
}

async function createSong(name, artistId, albumId, genre, rating){
    const { rows } = await pool.query(
        `INSERT INTO songs (name, album_id, rating, genre) 
        VALUES ($1, $2, $3, $4)
        RETURNING id;`, [name, albumId, rating, genre]
    );
    const songId = rows[0].id;

    for (const artist of artistId){
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
    // Delete the artist's songs
    await pool.query(
        `DELETE FROM songs
        WHERE id IN (
        SELECT song_id FROM song_artists WHERE artist_id = ($1)
        )`, [id]
    );
    // Delete the artist's albums
    await pool.query(
        `DELETE FROM albums
        WHERE id IN (
        SELECT album_id FROM album_artists WHERE artist_id = ($1)
        )`, [id]
    );


    // Delete artist
    await pool.query(`DELETE FROM artists WHERE id = ($1)`, [id]);
}

async function getArtist(id){
    const { rows } = await pool.query(`SELECT * FROM artists WHERE id = ($1)`, [id]);
    return rows[0];
}

async function getArtistSongs(id){
    const { rows } = await pool.query(
        `SELECT songs.name AS name 
        FROM artists
        JOIN song_artists ON artists.id = song_artists.artist_id
        JOIN songs ON song_artists.song_id = songs.id
        WHERE artists.id = ($1)`, [id]
    );
    return rows;
}

async function getArtistAlbums(id){
    const { rows } = await pool.query(
        `SELECT albums.name AS name 
        FROM artists
        JOIN album_artists ON artists.id = album_artists.artist_id
        JOIN albums ON album_artists.album_id = albums.id
        WHERE artists.id = ($1)`, [id]
    );

    return rows;
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
    await pool.query(`DELETE FROM songs WHERE album_id = ($1);`, [id]);
    await pool.query(`DELETE FROM albums WHERE id = ($1);`, [id]);
    

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
    getArtistSongs,
    getArtistAlbums,
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

