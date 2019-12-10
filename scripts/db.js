// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const serviceAccount = require("./quatroah-firebase-adminsdk-75jw9-299700a0ad");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quatroah.firebaseio.com"
});

module.exports = admin.firestore();