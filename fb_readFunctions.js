/*****************************************************/
// fb_readFunctions.js
// Written by Natalie Murakwani   2023
/*****************************************************/
MODULENAME = "fb_readFunctions.js"
lg_logIt_console(MODULENAME + '/n---------------', 'blue');
/***************************************************/
// fb_readOn(_path, _key, _data, _procFunc)
// Read a DB record for the path
// Input:  path to read from & key, where to save it &
//  function to process it
// Return:
/****************************************************/
function fb_readOn(_path, _key, _data, _procFunc) {
  console.log('fb_readOn: path= ' + _path + '  key= ' + _key);

  readStatus = 'waiting';
  firebase.database().ref(_path + '/' + _key).on("value",
    gotRecord, readErr);

  function gotRecord(snapshot) {
    let dbData = snapshot.val();
    if (dbData == null) {
      readStatus = "no record";
    }
    else {
      readStatus = "OK";
      console.log(dbData);
      sessionStorage.setItem('uid', userDetails.uid);
      
    }
    _procFunc(dbData, _data);
  }
  function readErr(error) {
    readStatus = "failure";
    console.log(error);
  }
}
/*****************************************************/
// fb_readRec(_path, _key, _data, _procFunc)
// Read a DB record for the path
// Input:  path to read from & key, where to save it &
//  function to process it
// Return:
/*****************************************************/
function fb_readRec(_path, _key, _data, _procFunc) {
  console.log('fb_readRec: path= ' + _path + '  key= ' + _key);

  readStatus = 'waiting';
  firebase.database().ref(_path + '/' + _key).once("value",
    gotRecord, readErr);

  function gotRecord(snapshot) {
    let dbData = snapshot.val();
    if (dbData == null) {
      readStatus = "no record";
    }
    else {
      readStatus = "OK";
      console.log(dbData);
    }
    _procFunc(dbData, _data, readStatus);
  }
  function readErr(error) {
    readStatus = "failure";
    console.log(error);
  }
}
/*****************************************************/
// fb_readAll(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/*****************************************************/
function fb_readAll(_path, _data, _procFunc) {
  console.log('fb_readAll: path= ' + _path);

  readStatus = 'waiting';
  firebase.database().ref(_path).once("value",
    gotRecord, readErr);

  function gotRecord(snapshot) {
    let dbData = snapshot.val();
    if (dbData == null) {
      readStatus = "no record";
    }
    else {
      readStatus = "OK";
      _procFunc(readStatus, snapshot, _data);
      console.log(dbData);
    }
  }
  function readErr(error) {
    readStatus = "failure";
    console.log(error);
  }
}
/***************************************************/
// fb_viewUserDetails(_dbData, _data)
// Read userDetails Record
// Input:  path to read from and where to save it
// Return:
/****************************************************/
function fb_viewUserDetails(_dbData, _data) {
  console.log("fb_procRecUserDetails: start");
  let dbKeys = Object.keys(_dbData);
  console.log(dbKeys);
  let key = dbKeys[0];
  console.log(_dbData[key]);

  for (i = 0; i < dbKeys.length; i++) {
    let key = dbKeys[i];
    _data.push({
      name: _dbData[key].name,
      score:
        _dbData[key].score
    });
  }
  console.table(_data);
};
/***************************************************/
// fb_readAllLobby(_dbData, _data)
// Read all DB records 
// Input:  path to read from and where to save it
// Return:
/****************************************************/
function fb_readAllLobby(_dbData, _data) {
  console.log("fb_readAllLobby: start");
  let dbKeys = Object.keys(_dbData);
  console.log(dbKeys);
  let key = dbKeys[0];
  console.log(_dbData[key]);

  for (i = 0; i < dbKeys.length; i++) {
    let key = dbKeys[i];
    _data.push({
      name: _dbData[key].name,
      score:
        _dbData[key].score
    });
  }
  console.table(_data);
};
/***************************************************/
// END OF MODULE
/***************************************************/