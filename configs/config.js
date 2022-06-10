const admin = require('firebase-admin');

admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();
const dbUsers = db.collection('users');
const dbFoods = db.collection('foods');
const dbPlaces = db.collection('places');

module.exports = {
  admin,
  auth,
  db,
  dbUsers,
  dbFoods,
  dbPlaces,
};
