const admin = require("firebase-admin");
const servAcc = require("../.firebase/firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(servAcc),
});

const auth = admin.auth();
const db = admin.firestore();
const dbUsers = db.collection("users");
const dbFoods = db.collection("foods");
const dbPlaces = db.collection("places");

module.exports = {
  admin,
  auth,
  db,
  dbUsers,
  dbFoods,
  dbPlaces,
};
