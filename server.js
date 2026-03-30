const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/artists', async (req, res) => {
  const name = req.query.name;
  const { data } = await axios.get(`https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}`);
  const artists = data.data.map((artist) => ({
    id: artist.id.toString(),
    name: artist.name,
    image: artist.picture_xl || artist.picture_medium || '',
    followers: artist.nb_fan,
    genres: artist.genres_data?.data.map((g) => g.name).join(', ') || ''
  }));
  res.json({ artists });
});

app.get('/api/albums/:id', async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(`https://api.deezer.com/artist/${id}/top?limit=50`);
  const albums = data.data.map((album) => ({
    id: album.album.id.toString(),
    name: album.album.title,
    image: album.album.cover_xl || album.album.cover_medium || '',
    release_date: album.album.release_date
  }));
  res.json({ albums });
});

app.get('/api/tracks/:id', async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(`https://api.deezer.com/album/${id}`);
  const tracks = data.tracks.data.map((track) => ({
    id: track.id.toString(),
    name: track.title,
    duration_ms: track.duration * 1000,
    preview_url: track.preview
  }));
  res.json({ tracks });
});

app.listen(3000, () => {
  console.log('Backend Deezer démarré sur http://localhost:3000');
});
