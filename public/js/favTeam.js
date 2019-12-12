/**
 * Helper function to get today's date
 */
async function getTeamScore(user){
    if (user) {
        // automatically populate fields if user signed in
        $('div.container').removeClass('is-hidden');
        const uid = user.uid;
        var name;
        await firebase.firestore().collection('users').doc(uid).get().then(function (doc) {
            if (doc.exists) {
                name = doc.data().teams;
            } else {
                // doc.data() will be undefined in this case
                renderNotification('Server error');
                console.log("Document does not exist!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    } else {
        $('div.container').addClass('is-hidden');
        renderNotification('Please login!');
    }
    var today = new Date();
    today.setDate(today.getDate());
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() -7);
    var dd = String(weekAgo.getDate()).padStart(2, '0');
    var mm = String(weekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = weekAgo.getFullYear();
    weekAgo= yyyy + '-' + mm + '-' + dd;
    let dates = [weekAgo, today]

    // get the current games
    const results = await axios({
        method: 'get',
        url: 'https://www.balldontlie.io/api/v1/games',
        params: {
            'start_date':weekAgo, 
            'end_date': today,
            'per_page': 500
        }
    });
    // add results to div
    const matchups = results.data.data;

    if (name == "Los Angeles Clippers") name = "LA Clippers";
    matchups.forEach((matchup) => {
            if(matchup.period == 4 && matchup.home_team.full_name == name || matchup.visitor_team.full_name == name){
                if (matchup.visitor_team_score > 0) {
                    $('#teamFeed').append(`<div class="card scoreCards"><i class="icon-check text-info mr-2"></i> <span>` +
                    matchup.home_team.full_name + 
                        ` vs. ` + matchup.visitor_team.full_name +`<br>`
                            + matchup.status + ": " + matchup.time +  
                            + matchup.home_team_score+  `--` + matchup.visitor_team_score + 
                        `</span></div>`);
                }
            }
    });
}


$(document).ready(async () => {
    // set call back for signing in and out
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) { // user signed in
            getTeamScore(user);
        } else {
            $('#teamFeed').html('Log in to continue!');
        }
    });
});