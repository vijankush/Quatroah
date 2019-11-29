// see if user has signed in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // user signed in
        
    } else { // user signed out

    }
});

$(document).ready(() => {
    // login button click handler
    $('#login').on('click', function () {
        const email = $('#lemail').val();
        const pword = $('#lpword').val();

        if (email != '' && pword != '') {
            firebase.auth().signInWithEmailAndPassword(email, pword).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            });
        } else {
            $('#lemail').addClass('is-danger');
            $('#lpword').addClass('is-danger');
        }
    });

    // sign up button click handler
    $('#setup').on('click', function () {
        const email = $('#email').val();
        const pword = $('#pword').val();

        if (email != '' && pword != '') {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            });
        } else {
            $('#email').addClass('is-danger');
            $('#pword').addClass('is-danger');
            $('#rpword').addClass('is-danger');
        }
    });

    // tabs click handler
    $('.tabs li').on('click', function () {
        var tab = $(this).data('tab');

        $('.tabs li').removeClass('is-active');
        $(this).addClass('is-active');

        $('.tab-content').removeClass('is-active');
        $('.tab-content[data-tab="' + tab + '"]').addClass('is-active');
    });

    // view first tab automatically
    $('.tabs li').first().addClass('is-active');
    $('.tab-content[data-tab="1"]').addClass('is-active');
});

/**
 * Helper function to determine if a string is an email
 * 
 * @param {*} str The string to test 
 */
function isEmail(str) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(str);
  }