/**
 * Helper function to determine if a string is an email
 * 
 * @param {string} str The string to test 
 */
const isEmail = (str) => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(str);
}

/*
* Helper function to determine if a string is a phone number
* 
* @param {string} str The string to test 
*/
const isPhoneNumber = (str) => {
    var regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
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
    $('#fname').removeClass('is-danger');
    $('#lname').removeClass('is-danger');
    $('#phoneNumber').removeClass('is-danger');
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

firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        // automatically populate fields if user signed in
        $('div.container').removeClass('is-hidden');
        const uid = user.uid;
        await firebase.firestore().collection('users').doc(uid).get().then(function (doc) {
            if (doc.exists) {
                $('#fname').val(doc.data().firstName);
                $('#lname').val(doc.data().lastName);
                $('#phoneNumber').val(doc.data().phoneNum);
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                renderNotification('Server error');
                console.log("Document does not exist!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    } else {
        $('div.container').addClass('is-hidden');
        renderNotification('Please login!');
    }
});

$(document).ready(async () => {
    // save changes button click handler
    $('#save').on('click', async function () {
        // reset indicators
        resetStatus();

        // check if logged in
        if (firebase.auth().currentUser) {
            // retreive values
            // const email = $('#email').val();
            const fname = $('#fname').val();
            const lname = $('#lname').val();
            const number = $('#phoneNumber').val();

            // check if fname given
            if (fname == '') {
                $('#fname').addClass('is-danger');
                renderNotification('First name missing!');
                return;
            }

            // check if lname given
            if (lname == '') {
                $('#lname').addClass('is-danger');
                renderNotification('Last name missing!');
                return;
            }

            // check if correct email format
            // if (email === '' || !isEmail(email)) {
            //     $('#email').addClass('is-danger');
            //     renderNotification('Invalid email!');
            //     return;
            // }

            // check if correct number format
            if (number === '' || !isPhoneNumber(number)) {
                $('#phoneNumber').addClass('is-danger');
                renderNotification('Invalid phone number!');
                return;
            }

            // update database
            const uid = firebase.auth().currentUser.uid;
            await firebase.firestore().collection('users').doc(uid).update({
                firstName: fname,
                lastName: lname,
                phoneNum: number
            }).then(() => {
                renderNotification("Saved profile.", false);
            }).catch((err) => {
                renderNotification(err.message);
            });
        }
    });

    // remove notification
    $('.delete').click(() => {
        $('.notification').removeClass('is-danger is-success')
            .addClass('is-hidden')
            .contents().filter(isTextNode).remove();
    });
});