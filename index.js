const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//Get Profile
secureApiRouter.post('/profile', async (req, res) => {
	const profile = await DB.getProfile(req.body.user);
	res.send(profile);
});

//Upload New Song
secureApiRouter.post('/songs', async (req, res) => {
  await DB.addSong(req.body);
  const songs = await DB.getNewSongs();
  res.send(songs);
});

//Add Listen
secureApiRouter.post('/listens', async (req, res) => {
  	await DB.addListen(req.body);
  	const songs = await DB.getNewSongs();
  	res.send(songs);
});

//Post Message
secureApiRouter.post('/message', async(req, res) => {
  	await DB.addMessage(req.body);
    const userMessages = await DB.getUserMessages(req.body.user);
    res.send(userMessages);
});

//Add Favorite
secureApiRouter.post('/addFavorite', async(req, res) => {
	await DB.addFavorite(req.body.user, req.body.favorite);
	const favorites = await DB.getFavoritedPeople(req.body.user);
	res.send(favorites);
});

//Remove Favorite
secureApiRouter.post('/removeFavorite', async(req, res) => {
	await DB.removeFavorite(req.body.user, req.body.unfavorite);
	const favorites = await DB.getFavoritedPeople(req.body.user);
	res.send(favorites);
})

//Get New Songs
secureApiRouter.get('/newSongs', async (_req, res) => {
    const newSongs = await DB.getNewSongs();
    /*newSongs = newSongs.reverse();
    if (newSongs.length > 100) newSongs.length = 100; See if database did it's job*/
    res.send(newSongs);
});

//Get Popular Songs
secureApiRouter.get('/popularSongs', async (_req, res) => {
    const songList = await DB.getPopularSongs();
    const popularSongs = findPopularSongs(songList);
    res.send(popularSongs);
});

//Get Songs by User
secureApiRouter.post('/userSongs', async (req, res) => {
  	const songs = await DB.getSongsByUser(req.body.user);
  	res.send(songs);
});

//Get Favorited People
secureApiRouter.post('/getFavorites', async (req, res) => {
	const favorites = await DB.getFavoritedPeople(req.body.user);
	res.send(favorites);
})

//Get Songs by Favorited People
secureApiRouter.post('/songsByFavorites', async (req, res) => {
	const songsByFavorites = await DB.getSongsByFavoritedUsers(req.body.user);
	res.send(songsByFavorites);
});

//Get a User's Messages
secureApiRouter.post('/getMessages', async (req, res) => {
    const messages = await DB.getUserMessages(req.body.user);
    res.send(messages);
});

//Update Profile
secureApiRouter.post('/updateProfile', async (req, res) => {
	await DB.updateProfile(req.body);
	const profile = await DB.getProfile(req.body.user);
	res.send(profile);
});

function findPopularSongs(songs) {
    const popularSongs = [];
    const popularity = [];
    const date = new Date();
    for (let i = 0; i < songs.length; ++i) {
		const releaseDate = new Date(songs[i].date);
        const pop = songs[i].listens / ((date - releaseDate) / 86400000);
        var j;
		for (j = 0; j < popularity.length; ++j) {
            if (pop > popularity[j]) {
                popularity.splice(j, 0, pop);
                popularSongs.splice(j, 0, songs[i]);
                break;
            }
        }
		if (j === popularity.length) {
			popularity.push(pop);
        	popularSongs.push(songs[i]);
		}   
    }
    if (popularSongs.length > 100) popularSongs.length = 100;
    return popularSongs;
}

