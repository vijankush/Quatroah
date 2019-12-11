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

async function latestmatches() {
    // get today's date
    var today = new Date();
    today.setDate(today.getDate());
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

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
        $('#scores').append(`<li class="py-2"><i class="icon-check text-info mr-2"></i> <span>` + matchup.home_team.full_name +
            ` vs. ` + matchup.visitor_team.full_name +
            `</span></li>`);
    });
    // for (let i=0; i<10; i++) {
    //     var home_logo = teamLogos(data[i].home_team.name);
    //     var url = "b" + home_logo + ".png" 
    //     console.log(home_logo);
    //     console.log(url);
    //     $latest.append(`<li class="py-2"><i class="icon-check text-info mr-2"></i> <span>`+ data[i].home_team.full_name + ` vs. `+ data[i].visitor_team.full_name + `</span></li>`);
    // }
}

// append latest headlines
async function latestNews() {
    var today = new Date();
    today.setDate(today.getDate());
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    let results = await axios({
        method: 'get',
        url: 'https://newsapi.org/v2/everything?' +
        'sources=bleacher-report&' +
        'q=NBA&' +
        'from=' +today +
        'sortBy=popularity&' +
        'apiKey=8f3a0442a29d4456b8eb58c8f5b8e6d4'
    });

    console.log(results.data);
    for(let i =0; i <5; i++){
        let link = results.data.articles[i].url;
        $('#miniNewsFeed').append(`<li class="py-2"><i class="icon-check text-info mr-2"></i> <span> 
        <a href="link">
        ${results.data.articles[i].title} </a> </span></li>`);
    }

}

function initialize() {
    latestmatches();
    latestNews();
}

$(document).ready(initialize());