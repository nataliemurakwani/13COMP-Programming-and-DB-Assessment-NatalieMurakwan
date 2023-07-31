/*****************************************************/
// fb_writeFunctions.js
// Written by Natalie Murakwani   2023
/*****************************************************/
MODULENAME = "fb_writeFunctions.js"
lg_logIt_console(MODULENAME + '/n---------------', 'blue');
/*****************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/*****************************************************/
function fb_writeRec(_path, _key, _data) {
  console.log('fb_WriteRec: path= ' + _path + '  key= ' + _key +
    '  data= ' + _data.name + '/' + _data.score);
  writeStatus = 'waiting';
  firebase.database().ref(_path + '/' + _key).set(_data,
    function(error) {
      if (error) {
        writeStatus = 'failure';
        console.log(error);
      }
      else {
        writeStatus = 'OK';
      }
    });
}
/*****************************************************/
// fb_updatedWriteRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/*****************************************************/
function fb_updatedWriteRec(_path, _key, _data, _procFunc) {
  console.log('fb_updatedWriteRec: path=' + _path + ' key=' + _key + '_data= ', _data);
   //update the data at the specified path and key
    
  firebase.database().ref(_path + '/' + _key).update(_data,
    function(error) {
      if (error) {
        writeStatus = 'failure';
        console.error(error);
        alert("firebase update error: " + error.message);
        _procFunc('failure')
      }
      else {
        console.log('Data successfully updated in firebase')
        _procFunc('OK');
      }
    });
}
/*****************************************************/
// END OF MODULE
/*****************************************************/