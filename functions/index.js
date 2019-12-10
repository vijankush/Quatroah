// import needed sdks
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// init app
admin.initializeApp();
const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
});

// get nba teams
exports.teamsNba = functions.https.onRequest(async (req, res) => {
    const snapshot = await db.collection('nba').get();
    res.send(snapshot.docs.map(doc => doc.data()));
});