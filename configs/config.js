const admin = require('firebase-admin');
const credentials = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const auth = admin.auth();
const db = admin.firestore();
const dbUsers = db.collection('users');
const dbFoods = db.collection('foods');
const dbPlaces = db.collection('placeConts');

module.exports = {
  admin,
  credentials,
  auth,
  db,
  dbUsers,
  dbFoods,
  dbPlaces,
};
