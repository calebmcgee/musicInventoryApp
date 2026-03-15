SET search_path TO public;

-- Artists

INSERT INTO artists (name, city) VALUES
('Drake', 'Toronto'),
('Lil Baby', 'Atlanta'),
('SZA', 'St. Louis'),
('Lil Durk', 'Chicago'),
('Hxncho', 'New York'),
('J. Cole', 'Fayetteville');


-- Albums

INSERT INTO albums (name, date_released) VALUES
('Certified Lover Boy', '2021-09-03'),
('My Turn', '2020-02-28'),
('Ctrl', '2017-06-09'),
('The Voice', '2020-12-24'),
('Hxncho Debut', '2022-03-15'),
('KOD', '2018-04-20'),
('Collaborations Vol.1', '2021-11-12');

-- Songs

INSERT INTO songs (name, album_id, genre, rating) VALUES
('Way 2 Sexy', 1, 'Rap/Hip-Hop', 9),
('Girls Want Girls', 1, 'Rap/Hip-Hop', 8),
('On Me', 2, 'Rap/Hip-Hop', 8),
('Emotionally Scarred', 2, 'Rap/Hip-Hop', 9),
('Love Galore', 3, 'R&B', 10),
('The Weekend', 3, 'R&B', 9),
('Voice of the Heroes', 4, 'Rap/Hip-Hop', 8),
('Still Trappin', 4, 'Rap/Hip-Hop', 7),
('Intro Hxncho', 5, 'Rap/Hip-Hop', 6),
('Hxncho Anthem', 5, 'Rap/Hip-Hop', 7),
('ATM', 6, 'Rap/Hip-Hop', 9),
('Photograph', 6, 'Rap/Hip-Hop', 8),
('Drip Too Hard', 7, 'Rap/Hip-Hop', 9),
('Life Goes On', 7, 'Rap/Hip-Hop', 8);


-- Song-Artists

-- Singles
INSERT INTO song_artists (song_id, artist_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(8, 4),
(9, 5),
(10, 5),
(11, 6),
(12, 6);

-- Collab songs
INSERT INTO song_artists (song_id, artist_id) VALUES
(13, 1), -- Drake
(13, 2), -- Lil Baby
(14, 3), -- SZA
(14, 6); -- J. Cole


-- Album-Artists 

-- Single Albums
INSERT INTO album_artists (album_id, artist_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);

-- Collab Albums
INSERT INTO album_artists (album_id, artist_id) VALUES
(7, 1),
(7, 2),
(7, 3),
(7, 6);