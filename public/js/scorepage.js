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

async function getMatches(){
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
            'dates[]': dates,
            'per_page': 25
        }
    });
    // add results to div
    const matchups = results.data.data;
    matchups.forEach((matchup) => {
        $('#scoreFeed').append(`<div class="card scoreCards" ><i class="icon-check text-info mr-2"></i> <span>` 
        + matchup.home_team.full_name +
            ` vs. ` + matchup.visitor_team.full_name +
            `</span></div>`);
    });

}


function initialize() {
    getMatches();
}

$(document).ready(initialize());