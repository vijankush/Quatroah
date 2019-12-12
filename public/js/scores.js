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

async function getMatches() {
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    var dd = String(weekAgo.getDate()).padStart(2, '0');
    var mm = String(weekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = weekAgo.getFullYear();
    weekAgo = yyyy + '-' + mm + '-' + dd;

    // get the current games
    const results = await axios({
        method: 'get',
        url: 'https://www.balldontlie.io/api/v1/games',
        params: {
            'start_date': weekAgo, 
            'end_date': getTodayDate(),
            'per_page': 35
        }
    });
    // add results to div
    const matchups = results.data.data;
    matchups.forEach((matchup) => {
            if(matchup.period != 0){
                let t1 = "NBA_Logos-master/" + matchup.home_team.city.toLowerCase() + ".png";
                let t2 = "NBA_Logos-master/" + matchup.visitor_team.city.toLowerCase() + ".png";

                $('#scoreFeed').append(`<div class="card-content scoreCards" style="text-align: center">
                <img src="${t1}" alt="Avatar" class="md-avatar rounded-circle">
                <span>
                    ${matchup.home_team.full_name} vs. ${matchup.visitor_team.full_name}</span>
                <img src="${t2}" alt="Avatar" class="md-avatar rounded-circle">
                    <span style="font-size: 16px; text-transform: uppercase"> <br />
                    ${matchup.status}: ${matchup.time}
                    ${matchup.home_team_score} - ${matchup.visitor_team_score}
                    <br />
                        ${new Date(matchup.date)}
                    </span>
                </div>`);
            }
            // } else{
            //     $('#scoreFeed').append(`<div class="card scoreCards"><i class="icon-check text-info mr-2"></i> <span>` +
            //     matchup.home_team.full_name +
            //         ` vs. ` + matchup.visitor_team.full_name + `<br>`+` Tip-Off: `+ matchup.status+ 
            //         "   on " + matchup.date.substring(0,10)+
            //         `</span></div>`);
            // }
    });
}

$(document).ready(() => {
    getMatches();
});