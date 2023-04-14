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

}

function addMessage(message) {
  messageCollection.insertOne(message);
}

function getNewSongs() {
  const query = {};
  const options = {
    sort: {date: -1},
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
  const options = {sort: {date: -1}};
  const cursor = songCollection.find(query, options);
  return cursor.toArray();
}

function getFavoritedPeople() {

}

function getSongsByFavoritedUsers() {

}

function getUserMessages(user) {
  console.log("beginning");
  const query = {user: user};
  const options = {sort: {date: -1}};
  const cursor = messageCollection.find(query, options);
  console.log(cursor.toArray);
  return cursor.toArray();
}

function updateProfile() {

}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addSong,
  addListen,
  addMessage,
  getNewSongs,
  getPopularSongs,
  getSongsByUser,
  getFavoritedPeople,
  getSongsByFavoritedUsers,
  getUserMessages,
  updateProfile
};