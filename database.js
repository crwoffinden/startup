const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);

const userCollection = client.db('startup').collection('user');
const personCollection = client.db('startup').collection('person');
const songCollection = client.db('startup').collection('song');
const messageCollection = client.db('startup').collection('message');
const favoritesCollection = client.db('startup').collection('favorites');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  await personCollection.insertOne({user: email, name: "Firstname Lastname", bio: "This is where you tell us about yourself."});
  await favoritesCollection.insertOne({user: email, favorites: []});

  return user;
}

async function getProfile(user) {
	var person;
	const cursor = personCollection.find({user: user});
	for await (const doc of cursor) {
		person = doc;
	}
	return person;
}

function addSong(song) {
  songCollection.insertOne(song);
}

function addListen(song) {
  const filter = {creator: song.creator, title: song.title, date:song.date};
  const update = {$set:{listens: song.listens}};
  songCollection.updateOne(filter, update);
}

function addMessage(message) {
  messageCollection.insertOne(message);
}

async function addFavorite(user, likedPerson) {
	const query = {user: user};
	const cursor = favoritesCollection.find(query);
	var favoritesList;
	for await (const doc of cursor) {
		favoritesList = doc.favorites;
	}
	await favoritesList.push(likedPerson);
	await favoritesCollection.updateOne({user: user}, {$set:{favorites: favoritesList}});
}

async function removeFavorite(user, unlikedPerson) {
	var favoritesList = [];
  	const cursor = favoritesCollection.find({user: user}, {favorites: 1});
	  for await (const doc of cursor) {
		favoritesList = doc.favorites;
	}
  	const newFavorites = favoritesList.filter(favoritesList => favoritesList != unlikedPerson);
  	favoritesCollection.updateOne({user: user}, {$set:{favorites: newFavorites}});
}

async function getNewSongs() {
  const query = {};
  const options = {
    sort: {date: -1},
    limit: 100
  };
  const cursor = songCollection.find(query, options);
  return cursor.toArray();
}

function getPopularSongs() { //TODO validate
  const cursor = songCollection.find();
  return cursor.toArray();
}

async function getSongsByUser(user) {
  	const query = {creator: user};
  	const options = {sort: {date: -1}};
  	const cursor = songCollection.find(query, options);
	const songs = await cursor.toArray();
  	return songs;
}

async function getFavoritedPeople(user) {
	let favorites = [];
	const  cursor = favoritesCollection.find({user: user});
	for await (const doc of cursor) {
		favorites = doc.favorites;
	}
	return favorites;
}

async function getSongsByFavoritedUsers(user) {
	let favorites = [];
	const cursor = favoritesCollection.find({user: user});
	for await (const doc of cursor) {
		favorites = doc.favorites;
	}
	const options = {
		sort: {date: -1},
		limit: 100
	};
	const songsByFavorites = await songCollection.find({creator: {$in: favorites}}, options);
	return await songsByFavorites.toArray();
}

function getUserMessages(user) {
  const query = {user: user};
  const options = {sort: {date: 1}};
  const cursor = messageCollection.find(query, options);
  return cursor.toArray();
}

function updateProfile(user) {
  const filter = {user: user.user};
  const update = {$set: {"name": user.name, "bio": user.bio}};
  personCollection.updateOne(filter, update);
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getProfile,
  addSong,
  addListen,
  addMessage,
  addFavorite,
  removeFavorite,
  getNewSongs,
  getPopularSongs,
  getSongsByUser,
  getFavoritedPeople,
  getSongsByFavoritedUsers,
  getUserMessages,
  updateProfile
};