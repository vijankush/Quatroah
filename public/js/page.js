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
function renderNavButtons(isLoggedIn) {
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

// see if user has signed in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // user signed in
        renderNavButtons(true);
    } else {
        renderNavButtons(false);
    }
});

$(document).ready(() => {
    // set signout handler
    $('.navbar').on('click', '#btn-signout', signOut);
});