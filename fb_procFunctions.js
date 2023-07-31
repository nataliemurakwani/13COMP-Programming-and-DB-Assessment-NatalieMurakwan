/*****************************************************/
// fb_procFunctions.js
// Written by Natalie Murakwani   2023
/*****************************************************/
MODULENAME = "fb_procFunctions.js"
lg_logIt_console(MODULENAME + '/n---------------', 'blue');
/*****************************************************/
// fb_procRecUserDetails(_dbData, _data)
// Processes a specific DB record
// Input:  DB data and where to save it
// Return:  
/*****************************************************/
function fb_procRecUserDetails(_dbData, _data) {
  console.log("fb_procRecUserDetails: start");

  if (_dbData != null) {
    console.log("fb_procRecUserDetails: record found");
    window.location.href = "gs_manager.html";
  }
  else {
    console.log("fb_procRecUserDetails: no record");
    window.location.href = "gm_registrationPage.html";
  }
};
/*****************************************************/
// fb_procReadJoin(_dbData, _data)
// Processes a specific DB record
// Input:  DB data and where to save it
// Return:  
/*****************************************************/
function fb_procReadJoin(_dbData, _data) {
  console.log("fb_procReadJoin: start");
  //IF READ OK
 window.location = "gn_game.html";
};
/*****************************************************/
// fb_procRecAdmin(_dbData, _data)
// Processes a admin DB record
// Input:  DB data and where to save it
// Return:  
/********************************************/
function fb_procRecAdmin(_dbData, _data) {
  console.log("fb_procRecAdmin: start");
  if (_dbData != null) {
    console.log("fb_procRecAdmin: record found");
    sessionStorage.setItem('admin', "y");
  }
  else {
    console.log("fb_procRecAdmin: no record");
    sessionStorage.setItem('admin', "n");

  }
};
/*****************************************************/
// fb_procGnScore(_dbData, _data,_readStatus)
// Processes a specific DB record
// Input:  DB data and where to save it
// Return:  
/********************************************/
function fb_procGnScore(_dbData, _data, _readStatus) {
  console.log("fb_procGnScore: start");

  sessionStorage.setItem('uid', userDetails.uid);
  sessionStorage.setItem('name', userDetails.name);
  sessionStorage.setItem('photoURL', userDetails.photoURL);
  sessionStorage.setItem('email', userDetails.email);

  if (_readStatus == "OK") {
    console.log("fb_procGnScore: record found");
    userScores.wins = _dbData.wins
    userScores.losses = _dbData.losses
  }
  else {
    console.log("fb_procGnScore: no record");
    userScores.wins = 0
    userScores.losses = 0
  }
  sessionStorage.setItem('wins', userScores.wins);
  sessionStorage.setItem('losses', userScores.losses);
  window.location.href = "gl_manager.html";
};
/*****************************************************/
// fb_procJoin()
// Processes a specific DB record
// Input:  DB data and where to save it
// Return:  
/********************************************/
function fb_procJoin(_dataRec) {
  console.log("fb_procJoin");
  fb_readOn(LOBBY + "/guessTheNumber/lobby1", key.uid, _dataRec,fb_procReadJoin)
}
/*****************************************************
/ END OF MODULE
/*****************************************************/