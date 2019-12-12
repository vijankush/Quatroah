// import needed sdks
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// init app
admin.initializeApp();
const db = admin.firestore();

// import other dependencies
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });

// set up expressjs
const app = express();

/**
 * Helper function to get today's date
 */
const getTodayDate = function () {
    var today = new Date();
    today.setDate(today.getDate() - 1);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
// https://github.com/firebase/functions-samples/tree/master/authorized-https-endpoint
const validateFirebaseIdToken = async (req, res, next) => {
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }
};

// enable middleware
app.use(cors);
app.use(cookieParser);
// app.use(validateFirebaseIdToken);

// test endpoint
app.get('/api', (req, res) => {
    res.send("Welcome to API!");
});

// get nba teams
app.get('/api/teams/nba', async (req, res) => {
    const snapshot = await db.collection('nba').orderBy('abb').get();
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send(snapshot.docs.map(doc => doc.data()));
});

// get nfl teams
app.get('/api/teams/nfl', async (req, res) => {
    const snapshot = await db.collection('nfl').orderBy('abb').get();
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send(snapshot.docs.map(doc => doc.data()));
});

// get nhl teams
app.get('/api/teams/nhl', async (req, res) => {
    const snapshot = await db.collection('nhl').orderBy('abb').get();
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send(snapshot.docs.map(doc => doc.data()));
});

// get predictions
app.get('/api/predictions/:year', validateFirebaseIdToken, async (req, res) => {
    const year = req.params['year'];
    const date = req.query['date'] ? req.query['date'] : getTodayDate();

    const snapshot = await db.collection(`predictions-${year}`)
        .where('date', '==', date)
        .orderBy('team1').get();

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    if (snapshot) res.send(snapshot.docs.map(doc => doc.data()));
});

// get predictions
app.get('/api/predictions/:year/all', validateFirebaseIdToken, async (req, res) => {
    const year = req.params['year'];
    const snapshot = await db.collection(`predictions-${year}`).orderBy('date').limit(100).get();
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    if (snapshot) res.send(snapshot.docs.map(doc => doc.data()));
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.api = functions.https.onRequest(app);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
});