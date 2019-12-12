async function getMatches() {
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
            'per_page': 2
        }
    });
    // add results to div
    const matchups = results.data.data;
    // console.log(matchups);

    matchups.forEach((matchup) => {
        if(matchup.period != 0) {
            // $('#scoreFeed').append(`<div class="card scoreCards"><i class="icon-check text-info mr-2"></i> <span>` +
            // matchup.home_team.full_name + 
            //     ` vs. ` + matchup.visitor_team.full_name +`<br>`
            //      + matchup.status + ": " + matchup.home_team_score+  `--` + matchup.visitor_team_score+ " " 
            //      + 
            //     `</span></div>`);
            $('#scoreframe').prepend(`<div class="blog-slider__item swiper-slide">
                <div></div>
                <div class="blog-slider__img"><img src="assets/img/blog-1.jpg"></div>
                <div class="blog-slider__content"><span class="blog-slider__code"> ${matchup.home_team.full_name} </span><div class="blog-slider__title">BRO</div><div class="blog-slider__text">SHUT THE FUCK UP</div><a class="class=&quot;blog-slider__button" href="#">READ MORE</a></div>
            </div>`);
        }
    });
    $('#scoreframe').append(`<div class="blog-slider__pagination"></div>`);
}

$(document).ready(() => {
    getMatches();
});