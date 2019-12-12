/**
 * Helper function to get today's date
 */
function getTodayDate() {
    var today = new Date();
    today.setDate(today.getDate() - 1);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

async function renderPredictions(user) {
    // get the current games
    const token = await user.getIdToken();
    const results = await axios({
        method: 'get',
        url: 'https://quatroah.web.app/api/predictions/2020',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const predictions = results.data;

    // add results to div
    predictions.forEach((prediction) => {
        // const team1 = teams.find(o => o.abb === prediction['team1']);
        // const team2 = teams.find(o => o.abb === prediction['team2']);
        const percent1 = parseFloat(prediction.raptor_prob1 * 100).toFixed(2);
        const percent2 = parseFloat(prediction.raptor_prob2 * 100).toFixed(2);
        // let t1 = "NBA_Logos-master/" + team1['loc'].toLowerCase() + ".png";
        // let t2 = "NBA_Logos-master/" + team2['loc'].toLowerCase() + ".png";

        $('#predictionsFeed').append(`<div class="card-content scoreCards" style="text-align: center">
                    <span>
                        ${prediction['team1']} (${percent1}%) vs. ${prediction['team2']} (${percent2}%)
                    </span>
                </div>`);
    });
}

// define teams var
let teams = [];

$(document).ready(async () => {
    // get list of nba teams
    // const results = await axios({
    //     method: 'get',
    //     url: 'https://quatroah.web.app/api/teams/nba'
    // });
    // teams = results.data;

    // set call back for signing in and out
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) { // user signed in
            renderPredictions(user);
        } else {
            $('#predictionsFeed').html('Log in to continue!');
        }
    });
});
