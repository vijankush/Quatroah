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
            'start_date':weekAgo, 
            'end_date': today,
            'per_page': 500
        }
    });
    // add results to div
    const matchups = results.data.data;
    var name = window.location.hash;
    name = name.replace(/%20/g, " ");
    name = name.substr(1);
    if (name == "Los Angeles Clippers") name = "LA Clippers";
    matchups.forEach((matchup) => {
            if(matchup.period == 4 && matchup.home_team.full_name == name || matchup.visitor_team.full_name == name){
                if (matchup.visitor_team_score > 0) {
                    $('#scoreFeed').append(`<div class="card scoreCards"><i class="icon-check text-info mr-2"></i> <span>` +
                    matchup.home_team.full_name + 
                        ` vs. ` + matchup.visitor_team.full_name +`<br>`
                            + matchup.status + ": " + matchup.time +  
                            + matchup.home_team_score+  `--` + matchup.visitor_team_score + 
                        `</span></div>`);
                    }
                }
                window.onhashchange = function() {
                    window.location.reload(1);
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
    // var team = window.location.hash;
    // console.count("team");

// $('#signup').on('click', async function () {
//     // reset indicators
//     resetStatus();

//     // retreive values
//     const email = $('#email').val();
//     const pword = $('#pword').val();
//     const rpword = $('#rpword').val();
//     const fname = $('#fname').val();
//     const lname = $('#lname').val();
//     const number = $('#phoneNumber').val();

//     // check if fname given
//     if (fname == '') {
//         $('#fname').addClass('is-danger');
//         renderNotification('First name missing!');
//         return;
//     }

//     // check if lname given
//     if (lname == '') {
//         $('#lname').addClass('is-danger');
//         renderNotification('Last name missing!');
//         return;
//     }

//     // check if correct email format
//     if (email === '' || !isEmail(email)) {
//         $('#email').addClass('is-danger');
//         renderNotification('Invalid email!');
//         return;
//     }

//     // check if correct number format
//     if (number === '' || !isPhoneNumber(number)) {
//         $('#phoneNumber').addClass('is-danger');
//         renderNotification('Invalid phone number!');
//         return;
//     }

//     // check if correct password format
//     if (pword === '') {
//         $('#pword').addClass('is-danger');
//         renderNotification('Password missing!');
//         return;
//     }

//     // check if matching password
//     if (pword !== rpword) {
//         $('#rpword').addClass('is-danger');
//         renderNotification('Passwords don\'t match!');
//         return;
//     }

//     // create new user
//     await firebase.auth().createUserWithEmailAndPassword(email, pword).then((userCredential) => {
//         // other way: firebase.auth().currentUser.uid
//         const uid = userCredential.user['uid'];
//         return firebase.firestore().collection('users').doc(uid).set({
//             firstName: fname,
//             lastName: lname,
//             phoneNum: number
//         });
//     }).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         renderNotification(errorMessage);
//         console.log(errorCode);
//     });
// });

// // tabs click handler
// $('.tabs li').on('click', function () {
//     var tab = $(this).data('tab');

//     $('.tabs li').removeClass('is-active');
//     $(this).addClass('is-active');

//     $('.tab-content').removeClass('is-active');
//     $('.tab-content[data-tab="' + tab + '"]').addClass('is-active');
// });

// // view specified tab automatically
// if (window.location.hash === '#Chicago Bulls') {
//     $('.tabs li').last().addClass('is-active');
//     $('.tab-content[data-tab="2"]').addClass('is-active');
// } else {
//     $('.tabs li').first().addClass('is-active');
//     $('.tab-content[data-tab="1"]').addClass('is-active');
// }
    getMatches();
});