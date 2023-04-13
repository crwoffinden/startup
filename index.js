const express = require('express');
const app = express();

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the application's static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let songs = [];

//Upload New Song FIXME validate this you could be way off
apiRouter.post('/songs', (req, res) => {
    songs.unshift(req.body);
    res.send(songs);
});

//Get New Songs
apiRouter.get('/newSongs', (_req, res) => {
    const newSongs = getNewSongs();
    res.send(newSongs);
});

//Get Popular Songs
apiRouter.get('/popularSongs', (_req, res) => {
    const popularSongs = findPopularSongs();
    res.send(popularSongs);
});

function getNewSongs() {
    const newSongs = [];
    for (let i = 0; i < songs.length; ++i) {
        if (songs[i] !== "null") {
            console.log('song ' + i + ' of ' + songs.length);
            newSongs.push(songs[i]);
        }
    }
    if (newSongs.length > 100) newSongs.length = 100;
    return newSongs;
}

function findPopularSongs() {
    const popularSongs = [];
    const popularity = [];
    const date = new Date();
    for (let i = 0; i < songs.length; ++i) {
        pop = songs[i].listens / ((date - songs[i].date) / 86400000); //FIXME validate
        for (let j = 0; j < popularity.length; ++j) {
            if (pop > popularity[j]) {
                popularity.splice(j, 0, pop);
                popularSongs.splice(j, 0, songs[i]);
                break;
            }
        }
        popularity.push(pop);
        popularSongs.push(songs[i]);
    }
    if (popularSongs.length > 100) popularSongs.length = 100;
    return popularSongs;
}

