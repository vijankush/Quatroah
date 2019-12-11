// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const serviceAccount = require('./quatroah-firebase-adminsdk-75jw9-299700a0ad');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quatroah.firebaseio.com"
});

const db = admin.firestore();

// populate nba teams
const nba = require('./nba');
nba.forEach((team) => {
  db.collection('nba').add({
    abb: team.abbreviation,
    name: team.name,
    simpleName: team.simpleName,
    loc: team.city
  }).then(function (ref) {
    console.log("NBA document written with ID: ", ref.id);
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
});

// populate nhl teams
const nhl = require('./nhl');
nhl.forEach((team) => {
  db.collection('nhl').add({
    abb: team.abbreviation,
    name: team.name,
    simpleName: team.simpleName,
    loc: team.city
  }).then(function (ref) {
    console.log("NHL document written with ID: ", ref.id);
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
});

// populate nfl teams
const nfl = require('./nfl');
nfl.forEach((team) => {
  db.collection('nfl').add({
    abb: team.abbreviation,
    name: team.name,
    simpleName: team.simpleName,
    loc: team.city,
    conf: team.conf,
    div: team.div
  }).then(function (ref) {
    console.log("NFL document written with ID: ", ref.id);
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
});