const isEmail = (str) => {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(str);
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

  } else {

  }
});

$(document).ready(() => {
  // save changes button click handler
  $('#saveChanges').on('click', async function () {
    // retreive values
    const email = $('#emailChanges').val();
    const fname = $('#firstChanges').val();
    const lname = $('#lastChanges').val();
    const number = $('#phoneChanges').val();

    // check if fname given
    if (fname == '') {
      $('#fname').addClass('is-danger');
      // renderNotification('First name missing!');
      return;
    }

    // check if lname given
    if (lname == '') {
      $('#lname').addClass('is-danger');
      // renderNotification('Last name missing!');
      return;
    }

    // check if correct email format
    if (email === '' || !isEmail(email)) {
      $('#email').addClass('is-danger');
      // renderNotification('Invalid email!');
      return;
    }

    // check if correct number format
    if (number === '' || !isPhoneNumber(number)) {
      $('#phoneNumber').addClass('is-danger');
      // renderNotification('Invalid phone number!');
      return;
    }

    // other way: firebase.auth().currentUser.uid
    const uid = firebase.auth().currentUser.uid;
    await firebase.firestore().collection('users').doc(uid).update({
        firstName: fname,
        lastName: lname,
        phoneNum: number
    });


  });
  const uid = firebase.auth().currentUser.uid;
  await firebase.firestore().collection('users').doc(uid).get().then(function(doc) {
    if (doc.exists) {
       $('#emailChanges').val(doc.data().email);
       $('#firstChanges').val(doc.data().fname);
       $('#lastChanges').val(doc.data().lname);
       $('#phoneChanges').val(doc.data().number);
       // console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

});