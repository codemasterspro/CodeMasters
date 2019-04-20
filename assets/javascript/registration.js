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

  $(`#register`).click(function () {
      event.preventDefault();

      // var username = $(`#inputUsername`).val().trim();
      var email = $(`#inputEmail`).val().trim();
      var password = $(`#inputPassword`).val().trim();
      // var inputConfirmPassword = $(`#inputConfirmPassword`).val().trim();

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