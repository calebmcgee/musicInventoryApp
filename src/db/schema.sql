-- Many to One, Many has the primary key (Many songs, one album = songs should reference albums)
-- Many to Many requires join table

-- Set search_path so schema is created within database not username
SET search_path TO public;

CREATE TABLE artists (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    city TEXT NOT NULL
);

CREATE TABLE albums (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    date_released DATE
);

CREATE TABLE songs (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    album_id INTEGER REFERENCES albums(id),
    genre TEXT,
    rating INTEGER CHECK (rating BETWEEN 0 AND 10)
);

CREATE TABLE song_artists(
    song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    PRIMARY KEY (song_id, artist_id)
);

CREATE TABLE album_artists(
    album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    PRIMARY KEY (album_id, artist_id)
);