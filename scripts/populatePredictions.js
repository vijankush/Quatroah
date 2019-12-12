const SEASON = '2020';

/** needed libraries */
const csv = require('csv-parser');
const fs = require('fs');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const serviceAccount = require('./quatroah-firebase-adminsdk-75jw9-36f2b65dd9');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quatroah.firebaseio.com"
});

const db = admin.firestore();

// iterate over each row
fs.createReadStream('nba_elo_latest.csv')
    .pipe(csv())
    .on('data', async (row) => {
        // format document name
        const doc = `game_${row['date']}_${row['team1']}_${row['team2']}`;
        console.log('Processing document ', doc);

        // add game predictions to database
        await db.collection(`predictions-${SEASON}`).doc(doc).set({
            'team1': row['team1'],
            'team2': row['team2'],
            'elo_prob1': row['elo_prob1'],
            'elo_prob2': row['elo_prob2'],
            'carm-elo_prob1': row['carm-elo_prob1'],
            'carm-elo_prob2': row['carm-elo_prob2'],
            'raptor_prob1': row['raptor_prob1'],
            'raptor_prob2': row['raptor_prob2']
        }).then(function (ref) {
            console.log(doc, " document written with ID: ", ref.id);
        }).catch(function (error) {
            console.error("Error adding document", doc, ": ", error);
        });
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
