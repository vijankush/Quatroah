/** Redirect timeout in milliseconds */
const REDIRECT_TIMEOUT = 1000;

/**
 * Helper function to determine if a string is an email
 * 
 * @param {string} str The string to test 
 */
const isEmail = (str) => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(str);
}

/**
 * Helper function to determine if node is a text node
 * 
 * @param {*} _ 
 * @param {*} el Element node
 */
const isTextNode = (_, el) => el.nodeType === Node.TEXT_NODE;

function resetStatus() {
    // remove input indicators
    $('#lemail').removeClass('is-danger');
    $('#lpword').removeClass('is-danger');
    $('#email').removeClass('is-danger');
    $('#pword').removeClass('is-danger');
    $('#rpword').removeClass('is-danger');

    // remove notification
    $('.notification').removeClass('is-danger is-success')
        .addClass('is-hidden')
        .contents().filter(isTextNode).remove();
}

/**
 * Helper function to render a notification
 * 
 * @param {string} msg String to display
 */
function renderNotification(msg, isError = true) {
    const box = $('.notification');
    box.removeClass('is-hidden');

    // add msg
    box.append(msg);

    // add correct class if error
    if (isError)
        box.addClass('is-danger');
    else
        box.addClass('is-success');
}

// see if user has signed in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // user signed in
        renderNotification('User logged in!', false);
        setTimeout(() => { window.location.href = './'; }, REDIRECT_TIMEOUT); // redirect after timeout
    }
});

$(document).ready(() => {
    // login button click handler
    $('#login').on('click', function () {
        // reset indicators
        resetStatus();
        // retreive values
        const email = $('#lemail').val();
        const pword = $('#lpword').val();

        // check if correct email format
        if (email === '' || !isEmail(email)) {
            $('#lemail').addClass('is-danger');
            return;
        }
        // check if correct password format
        if (pword === '') {
            $('#lpword').addClass('is-danger');
            return;
        }

        // try signing in
        firebase.auth().signInWithEmailAndPassword(email, pword).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            renderNotification(errorMessage);
            console.log(errorCode);
        });

        
    });

    // sign up button click handler
    $('#signup').on('click', function () {
        // reset indicators
        resetStatus();

        // retreive values
        const email = $('#email').val();
        const pword = $('#pword').val();
        const rpword = $('#rpword').val();
        const fName =$('#fName').val();
        const lName = $('#lName').val();
        const phoneNumber = $('#phoneNumber').val();
        
        // check if correct email format
        if (email === '' || !isEmail(email)) {
            $('#email').addClass('is-danger');
            return;
        }

        // check if correct password format
        if (pword === '') {
            $('#pword').addClass('is-danger');
            return;
        }

        // check if matching password
        if (pword !== rpword) {
            $('#rpword').addClass('is-danger');
            return;
        }

        // create new user
        firebase.auth().createUserWithEmailAndPassword(email, pword).then((userCredential) => {
            // other way: firebase.auth().currentUser.uid
            firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                firstName: fName,
                lastName: lName,
                phoneNum: phoneNumber
            });
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            renderNotification(errorMessage);
            console.log(errorCode);
        });


    });

    // tabs click handler
    $('.tabs li').on('click', function () {
        var tab = $(this).data('tab');

        $('.tabs li').removeClass('is-active');
        $(this).addClass('is-active');

        $('.tab-content').removeClass('is-active');
        $('.tab-content[data-tab="' + tab + '"]').addClass('is-active');
    });

    // view specified tab automatically
    if (window.location.hash === '#signup') {
        $('.tabs li').last().addClass('is-active');
        $('.tab-content[data-tab="2"]').addClass('is-active');
    } else {
        $('.tabs li').first().addClass('is-active');
        $('.tab-content[data-tab="1"]').addClass('is-active');
    }
});