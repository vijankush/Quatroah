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

/**
 * Helper function to get today's date
 */
function getTodayDate() {
    var today = new Date();
    today.setDate(today.getDate());
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

/**
 * Get upcoming matchups and add to page
 */
async function latestMatches() {
    // get today's date
    const today = getTodayDate();

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
        //console.log(matchup.status)
        if (matchup.period != 0) {
            $('#scores').append(`<div class="scoreCard"><i class="icon-check text-info mr-2"></i> <span>
                ${matchup.home_team.full_name} vs. ${matchup.visitor_team.full_name} <br />
                ${matchup.home_team_score} -- ${matchup.visitor_team_score}
                ${matchup.status}: ${matchup.time}
                </span></div>`);
        } else {
            $('#scores').append(`<div class="scoreCard"><i class="icon-check text-info mr-2"></i> <span>` +
                matchup.home_team.full_name +
                ` vs. ` + matchup.visitor_team.full_name + `<br>` + ` Tip-Off: ` + matchup.status
                + "  on " + matchup.date.substring(0, 9) +
                `</span></div>`);
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

    for (let i = 0; i < 5; i++) {
        let link = results.data.articles[i].url;
        //console.log(link)
        $('#miniNewsFeed').append(`<div class="card headlineCard newsCards""><i class="icon-check text-info mr-2"></i> <span> 
        <a href="${link}">
        ${results.data.articles[i].title} </a> </span></div>`);
    }
}

$(document).ready(() => {
    latestMatches();
    latestNews();
});