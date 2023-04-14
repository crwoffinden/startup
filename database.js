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

  return user;
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

function addFavorite(user, likedPerson) {
  const favoritesList = favoritesCollection.find({user: user}).favorites;
  favoritesList.append(likedPerson);
  favoritesCollection.updateOne({user: user}, {$set:{favorites: favoritesList}});
}

function removeFavorite(user, unlikedPerson) {
  const favoritesList = favoritesCollection.find({user: user}).favorites;
  const newFavorites = favoritesList.filter(favoritesList => favoritesList != unlikedPerson);
  favoritesCollection.updateOne({user: user}, {$set:{favorites: newFavorites}});
}

function getNewSongs() {
  const query = {};
  const options = {
    sort: {date: 1},
    limit: 100
  };
  const cursor = songCollection.find();
  return cursor.toArray();
}

function getPopularSongs() { //TODO validate
  const cursor = songCollection.find();
  return cursor.toArray();
}

function getSongsByUser(user) {
  	const query = {user: user};
  	const options = {sort: {date: 1}};
  	const cursor = songCollection.find(query, options);
  	return cursor.toArray();
}

function getFavoritedPeople(user) {
	const favorites = favoritesCollection.find({user: user}).favorites;
	return favorites;
}

function getSongsByFavoritedUsers() {

}

function getUserMessages(user) {
  const query = {user: user};
  const options = {sort: {date: 1}};
  const cursor = messageCollection.find(query, options);
  return cursor.toArray();
}

function updateProfile(user) {
  /*const filter = {email: user.email};
  const update = {$set{name: user.name, bio: user.bio}};
  userCollection.updateOne(filter, update);*/
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
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