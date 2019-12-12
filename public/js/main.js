/** TEAMS WITH THEIR ABBREVIATIONS */
const ABBR_TEAMS = {
    '76ers': 'phi',
    'blazers': 'por',
    'bucks': 'mil',
    'bulls': 'chi',
    'cavaliers': 'cle',
    'celtics': 'bos',
    'clippers': 'lac',
    'grizzlies': 'mem',
    'hawks': 'atl',
    'heat': 'mia',
    'hornets': 'cha',
    'jazz': 'uta',
    'kings': 'sac',
    'knicks': 'nyk',
    'lakers': 'lal',
    'magic': 'orl',
    'mavericks': 'dal',
    'nets': 'bkn',
    'nuggets': 'den',
    'pacers': 'ind',
    'pelicans': 'nop',
    'pistons': 'det',
    'raptors': 'tor',
    'rockets': 'hou',
    'spurs': 'sas',
    'suns': 'phx',
    'thunder': 'okc',
    'timberwolves': 'min',
    'warriors': 'gsw',
    'wizards': 'was',
}

/** GET THE TOP N HEADLINES */
const TOP_N_HEADLINES = 5;

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

/**
 * Get upcoming matchups and add to page
 */
async function latestMatches() {
    // console.log(<TOR />);
    // get today's date
    var today = getTodayDate();
    // get the current games
    const results = await axios({
        method: 'get',
        url: 'https://www.balldontlie.io/api/v1/games',
        params: {
            'dates[]': today,
            'per_page': 5
        }
    });

    // add results to div
    const matchups = results.data.data;
    matchups.forEach((matchup) => {
        if (matchup.period != 0) {
            let t1 = "NBA_Logos-master/" + matchup.home_team.city.toLowerCase() + ".png";
            let t2 = "NBA_Logos-master/" + matchup.visitor_team.city.toLowerCase() + ".png";
            $('#scores').append(`<div>
            <img src="${t1}" alt="Avatar" class="md-avatar rounded-circle">
            <span>
                ${matchup.home_team.full_name} vs. ${matchup.visitor_team.full_name}</span>
            <img src="${t2}" alt="Avatar" class="md-avatar rounded-circle">
                <span style="font-size: 16px; text-transform: uppercase"> <br />
                ${matchup.status}: ${matchup.time}
                ${matchup.home_team_score} - ${matchup.visitor_team_score}
                </span>
            </div>`);
        } else {
            let t1 = "NBA_Logos-master/" + matchup.home_team.city.toLowerCase() + ".png";
            let t2 = "NBA_Logos-master/" + matchup.visitor_team.city.toLowerCase() + ".png";
            $('#scores').append(`<div>
            <img src="${t1}" alt="Avatar" class="md-avatar rounded-circle">
            <span>
                ${matchup.home_team.full_name} vs. ${matchup.visitor_team.full_name}</span>
            <img src="${t2}" alt="Avatar" class="md-avatar rounded-circle">
                <span style="font-size: 16px; text-transform: uppercase"><br />
                Tip-Off: ${matchup.status} on ${matchup.date.substring(0, 9)}</span></div>`);
        }
    });

}

/**
 * Get recent sports headlines and add to page
 */
async function latestNews() {
    // get today's date
    const today = getTodayDate();

    // get the latest news
    const results = await axios({
        method: 'get',
        url: 'https://newsapi.org/v2/everything',
        params: {
            'sources': 'bleacher-report',
            'q': 'NBA',
            'from': today,
            'sortBy': 'popularity',
            'apiKey': '8f3a0442a29d4456b8eb58c8f5b8e6d4'
        }
    });

    for (let i = 0; i < 6; i++) {
        let link = results.data.articles[i].url;
        //console.log(link)
        $('#miniNewsFeed').append(`<div class="card headlineCard newsCards"><span>
        <img src="${results.data.articles[i].urlToImage}" alt="Avatar" class="md-avatar rounded-circle size-1">
        <a href="${link}" target="_blank">
        ${results.data.articles[i].title} </a> </span></div>`);
    }
}

/**
 * Log the user out
 */
async function signOut() {
    await firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
        console.log("Failed to sign out!", error);
    });
}

/**
 * Render the login and signup buttons accordingly
 * 
 * @param {*} isLoggedIn True if the user is logged in, false otherwise
 */
function renderNavButtons(isLoggedIn = true) {
    let btns = '';

    if (isLoggedIn) {
        btns = '<a class="icon-btn" href="settings.html"> \
                    <span class="icon is-medium"> \
                        <i class="fa fa-cog"></i> \
                    </span> \
                </a> \
                <a id="btn-signout" class="button is-light is-outlined"> \
                    Sign Out \
                </a>';
    } else {
        btns = '<a class="button is-light" href="login.html"> \
                    Log in \
                </a> \
                <a class="button is-info" href="login.html#signup"> \
                    <strong>Sign up</strong> \
                </a>';
    }

    // append to html
    $('#nav-buttons > div').html(btns);
}

/**
 * Render user's favorite teams on the index accordingly
 * 
 * @param {*} isLoggedIn True if the user is logged in, false otherwise
 */
function renderFavTeams(isLoggedIn = true) {
    let teams = '';

    if (isLoggedIn) {
        teams = '';
    } else {
        teams = 'PLEASE<br /><br /> \
                    <a class="button is-large is-primary is-outlined" href="login.html">Login</a> \
                <br /><br />TO SEE YOUR FAVORITE TEAMS!';
    }

    // append to html
    $('#team-card .card-text').html(teams);
}

/**
 * Render predictions of recent games accordingly
 * 
 * @param {*} isLoggedIn True if the user is logged in, false otherwise
 */
async function renderPredictions(isLoggedIn = true) {
    $('#predict-card .card-text').html('');

    if (isLoggedIn) {
        // get the latest predictions
        const token = await firebase.auth().currentUser.getIdToken();
        const results = await axios({
            method: 'get',
            url: 'https://quatroah.web.app/api/predictions/2020',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // add results to div
        const predictions = results.data;
        predictions.forEach((prediction) => {
            const percent1 = parseFloat(prediction.raptor_prob1 * 100).toFixed(2);
            const percent2 = parseFloat(prediction.raptor_prob2 * 100).toFixed(2);
            $('#predict-card .card-text').append(`${prediction.team1} (${percent1}%)
            vs. ${prediction.team2} (${percent2}%) <hr />`);
        });
    } else {
        $('#predict-card .card-text').html('PLEASE<br /><br /> \
                    <a class="button is-large is-primary is-outlined" href="login.html">Login</a> \
                <br /><br />TO SEE GAME PREDICTIONS!');
    }
}

// see if user has signed in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // user signed in
        renderNavButtons();
        renderFavTeams();
        renderPredictions();
    } else {
        renderNavButtons(false);
        renderFavTeams(false);
        renderPredictions(false);
    }
});

$(document).ready(() => {
    // update index
    latestMatches();
    latestNews();

    // set signout handler
    $('.navbar').on('click', '#btn-signout', signOut);
});