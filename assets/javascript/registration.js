$(document).ready(function(){


// Initialize Firebase
  var config = {
      apiKey: "AIzaSyAoTRv2CX3wDHmmS9JbO11uO_28ZQokOyM",
      authDomain: "run-source-60b00.firebaseapp.com",
      databaseURL: "https://run-source-60b00.firebaseio.com",
      projectId: "run-source-60b00",
      storageBucket: "run-source-60b00.appspot.com",
      messagingSenderId: "270692521090"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  $(`#register`).click(function() {
      event.preventDefault();

      var email = $(`#inputEmail`).val().trim();
      var password = $(`#inputPassword`).val().trim();

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {

          console.log(error);
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
      });

      username = $(`#inputUsername`).val("");
      email = $(`#inputEmail`).val("");
      password = $(`#inputPassword`).val("");
      inputConfirmPassword = $(`#inputConfirmPassword`).val("");

  });

  $(`#signin`).click(function() {
      event.preventDefault();

      var email = $(`#inputEmail`).val().trim();
      var password = $(`#inputPassword`).val().trim();

      firebase.auth().signInWithEmailAndPassword(email, password).then(function (action) {
          console.log("YOU LOGGED IN SUCCESFULL PUSHING YOU TO THE HOME PAGE")
          window.location.href = 'map.html';

      }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(error);
          return error;

      });

      password = $(`#inputPassword`).val("")

  })

  $(`#facebook`).click(function() {

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        console.log(token);
        
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        console.log(email);
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(credential);
        // ...
      });
  });

  $(`#logout`).click(function () {

      firebase.auth().signOut().then(function () {
          // Sign-out successful.
          console.log("you've signed out");
          window.location.href = 'login.html';
      }).catch(function (error) {
          // An error happened.
      });
  });
});