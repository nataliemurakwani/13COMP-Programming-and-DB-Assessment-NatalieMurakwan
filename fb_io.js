/*****************************************************/
// fb_io.js
// Written by ???   2021
/*****************************************************/
MODULENAME = "fb_io.js"
lg_logIt_console(MODULENAME + '/n---------------', 'blue');
/*****************************************************/
// fb_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/*****************************************************/
function fb_initialise() {
  console.log('fb_initialise: ');
  var firebaseConfig = {
    apiKey: "AIzaSyBIqRpPTYkVzx48UlloPUOkhNXTHPWPRlg",
    authDomain: "comp-2023-nataliemurakwani.firebaseapp.com",
    databaseURL: "https://comp-2023-nataliemurakwani-default-rtdb.firebaseio.com",
    projectId: "comp-2023-nataliemurakwani",
    storageBucket: "comp-2023-nataliemurakwani.appspot.com",
    messagingSenderId: "910519346125",
    appId: "1:910519346125:web:fb7d8fae33a4eb7d155a84",
    measurementId: "G-QCBM3QLV35"
  };
  /**************************************************/
  //INITIALIZE FIREBASE
  /**************************************************/
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log(firebase);
    database = firebase.database();
  }
}
/*****************************************************/
// fb_login(_dataRec)
// Called by setup
// Login to Firebase
// Input:  n/a
// Return: n/a
/*****************************************************/
function fb_login(_dataRec) {
  console.log('fb_login: ');
  firebase.auth().onAuthStateChanged(newLogin);
  function newLogin(user) {
    if (user) {
      /*****************************************************/
      // USER IS SIGNED IN, SAVE GOOGLE LOGINS DETAILS
      /*****************************************************/
      _dataRec.uid = user.uid;
      _dataRec.email = user.email;
      _dataRec.name = user.displayName;
      _dataRec.photoURL = user.photoURL;
      sessionStorage.setItem('uid', user.uid);
      sessionStorage.setItem('name', user.displayName);
      sessionStorage.setItem('photoURL', user.photoURL);
      sessionStorage.setItem('email', user.email);
      loginStatus = 'logged in';
      console.log('fb_login: status = ' + loginStatus);
      fb_readRec(DETAILS, user.uid, _dataRec, fb_procRecUserDetails)
      fb_readRec(ADMIN, user.uid, _dataRec, fb_procRecAdmin)
    }
    else {
      /*****************************************************/
      // USER NOT SIGNED IN, REDIRECT TO GOOGLE LOGIN
      /*****************************************************/
      loginStatus = 'logged out';
      console.log('fb_login: status = ' + loginStatus);
      var provider = new firebase.auth.GoogleAuthProvider();
      /*****************************************************/
      //firebase.auth().signInWithRedirect(provider); // Another method
      /*****************************************************/
      firebase.auth().signInWithPopup(provider).then(function(result) {
        _dataRec.uid = result.user.uid;
        _dataRec.email = result.user.email;
        _dataRec.name = result.user.displayName;
        _dataRec.photoURL = result.user.photoURL;
        sessionStorage.setItem('uid', result.user.uid);
        sessionStorage.setItem('name', result.user.displayName);
        sessionStorage.setItem('photoURL', result.user.photoURL);
        sessionStorage.setItem('email', result.user.email);
        loginStatus = 'logged in via popup';
        console.log('fb_login: status = ' + loginStatus);
        fb_readRec(DETAILS, user.uid, _dataRec, fb_procRecUserDetails)
        fb_readRec(ADMIN, user.uid, _dataRec, fb_procRecAdmin)
      })
        /*****************************************************/
        // Catch errors
        /*****************************************************/
        .catch(function(error) {
          if (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            loginStatus = 'error: ' + error.code;
            console.log('fb_login: error code = ' + errorCode + '    ' + errorMessage);
          }
        });
    }
  }
}
/*****************************************************/
//    END OF MODULE
/*****************************************************/