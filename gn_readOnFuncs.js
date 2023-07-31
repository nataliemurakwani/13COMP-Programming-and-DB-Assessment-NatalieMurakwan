/**************************************************************/
// gn_readOnFuncs.js
// Game selection Page
// Written by Natalie Murakwani 2023
/**************************************************************/

   // Create game data in Firebase database
     _dbRec.forEach(function(childSnapshot) {
       console.log("database")
      randomNumber,
      childKey = childSnapshot.key;
      childData = childSnapshot.val();

  function playerJoin(user) {
    if (user) {
      // user is signed in, so save Google login details
      _dataRec.uid = user.uid;
      _dataRec.email = user.email;
      _dataRec.name = user.displayName;
      _dataRec.photoURL = user.photoURL;
      loginStatus = 'logged in';
      console.log('fb_login: status = ' + loginStatus);
      
      
    }
  }
       // ENSURE THE FEILDS YOU PUSH INTO THE ARRAY OF OBJECTS            //<=======
      //  MATCH YOUR FIREBASE RECORDS FOR THE PATH                       //<=======
      gn_gameArray.push({
        name: childData.name,
        email: childData.email,
        // Left photoURL out as its so long the table will be too wide for the screen
        //photoURL:   childData.photoURL,  
        uid: childKey,
        P1gameName = childData.P2gameName,
        P1guess = childData.P2guess,
        P1lastGuessTime = childData.P2lastGuessTime,
        P1online = childData.P2online,
        P1photoUrL = childData.P2photoUrl,
        
    });
});



