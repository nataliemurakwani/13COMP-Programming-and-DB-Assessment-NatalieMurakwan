/**************************************************************/
// gl_manager.js
// Game Lobby Page
// Written by Natalie Murakwani 2023
/**************************************************************/
MODULENAME = "gl_manager.js"
lg_logIt_console(MODULENAME + '/n---------------', 'blue');

var html_sortKey = '';

function gl_load(_path) {
  console.log("gl_load path=" + _path);
  fb_readRec(_path, userDetails.uid, userJoin, fb_procGnScore)
}
/*****************************************************/
// BUTTONFUNCTIONS()
/*****************************************************/
function gl_lobbyBackButton() {
  console.log('gl_lobbyBackButton');
  window.location.href = "gs_manager.html";
};
/*****************************************************/

/******************************************************/
// html_getData()
// Called by html GET DATA button
// Call fb_ readAll to read all firebase records in the path
// Input:  n/a
// Output: n/a */

function html_getData() {
  console.log("html_getData: ");
  fb_readAll(LOBBY + "/guessTheNumber/lobby1", dbArray, gl_processReadAll);

}

/**************************************************************/
// ad_processBBReadAll(_result, _dbRec)
// Called by db_readAll to handle result of read ALL BB records request.
// Save data & update display with record info
// Input:  read status "OK", data record just read. 
//         NOTE: this is the raw data, EG snapshot, NOT snapshot.val()
// Return:
/**************************************************************/
function gl_processReadAll(_result, _dbRec, _save) {
  console.log('gl_processReadAll: ', 'result = ' + _result);

  var childKey;
  var childData;
  var gl_adminArray = [];

  // Note: if read was successful, 1st input parameter must = "OK"       //<=======
  if (_result == 'OK') {
    _dbRec.forEach(function(childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      console.log(Object.keys(childData));

      // ENSURE THE FEILDS YOU PUSH INTO THE ARRAY OF OBJECTS            //<=======
      //  MATCH YOUR FIREBASE RECORDS FOR THE PATH                       //<=======
      _save.push({
        uid: childKey,
        gameName: childData.p1_gameName,
        losses: childData.p1_losses,
        name: childData.p1_name,
        wins: childData.p1_wins
      });
    });
    html_build()
  }
  console.log(_save);
};

/******************************************************/
// html_build()
// Called by html build button
// Calls function to build html table
// Input:  n/a
// Output: n/a
/*************************************************/
function html_build() {
  console.log("html_build: ");

  html_buildTableFunc("tb_userDetails", dbArray);
}

/******************************************************/
// html_reset()
// Called by html reset button
// resets html table & buttons
// Input:  n/a
// Output: n/a
/****************************************************/
function html_reset() {
  console.log("html_reset: ");

  document.getElementById("tb_userDetails").innerHTML = '';
  lobbyArray = [];

  var html_elements = document.querySelectorAll('.b_options');
  html_elements.forEach((element) => {
    element.classList.remove('w3-disabled');
  });
  html_elements = document.querySelectorAll('.b_part2');
  html_elements.forEach((element) => {
    element.classList.add('w3-disabled');
  });
}

/******************************************************/
// gl_lobbyDbDel()
// 
// 
// 
// 
/****************************************************/
function gl_lobbyDbDel(_key, _path) {
  console.log("html_reset: ");

}

/******************************************************/
// gl_generateUniqueId()
// 
// 
// 
// 
/****************************************************/
function gl_generateUniqueId(_key, _path) {
  console.log("gl_generateUniqueId: ");
  return Math.random().toString(36).substr(2, 9);
}


/******************************************************/
// html_buildTableFunc(_tableBodyID, _array)
// Called by html_build()
// Build html table rows from an array of objects
// Input:  html id of table body, array of objects
//  EG  [{name:   'bobby',
//        wins:    4,
//        draws:   1,
//        losses:  0,
//        UID:     zE45Thkj9#se4ThkP},
//       {name:   'car man',
//        wins:    9,
//        draws:   0,
//        losses:  0,
//        UID:     g7K456hledrj#gkij}]
// Output: n/a
/****************************************************/
function html_buildTableFunc(_tableBodyID, _save) {
  console.log("html_buildTableFunc: ");
  console.table(_save);

  // Get all the info on the table
  var html_table = document.getElementById(_tableBodyID);

  // Loop thu array; build row & add it to table
  for (i = 0; i < _save.length; i++) {
    // Back ticks define a temperate literal
    var row = `<tr>  
                <td>${_save[i].name}</td>
                <td class="w3-center">${_save[i].wins}</td>
                <td class="w3-center">${_save[i].gameName}</td>
                <td class="w3-center">${_save[i].losses}</td>
                 <td class="w3-center">${_save[i].uid}</td>
                <td><button class="b_join">Join</button></td>
              </tr>`
    html_table.innerHTML += row;
  }
}

/*--------------------------------------------------*/
// jQuery ready()
// Only runs when jQuery determines page is "ready"
// Adds to all rows inside tb_userDetails an onclick
//  function to get the current row's UID entry.
/*--------------------------------------------------*/
$(document).ready(function() {
  console.log('test join button');
  // code to read selected table row cell data (values).
  $("#tb_userDetails").on('click', '.b_join', function() {
    // get the current row
    var currentRow = $(this).closest("tr");
    console.log('currentRow: ' + currentRow);
    // get current row's 1st TD value
    var p1_uid = currentRow.find("td:eq(4)").text();
    console.log("html_buildTableFunc: uid = " + p1_uid);

    //Making sure the value is correct 
    if (p1_uid) {
      userJoin.p2_name = userDetails.name;
      userJoin.p2_gameName = userDetails.name;
      userJoin.p2_uid = userDetails.uid
      userJoin.p2_wins = userScores.wins
      userJoin.p2_losses = userScores.losses

      fb_updatedWriteRec(LOBBY + "/guessTheNumber/lobby1", p1_uid,
        userJoin, fb_procJoin)
    }
  })
});
/*--------------------------------------------------*/
// jQuery ready()
// Only runs when jQuery determines page is "ready"
// Adds to all rows inside tb_userDetails an onclick
//  function to get the current row's UID entry.
/*--------------------------------------------------*/
$(document).ready(function() {
  //Create a new lobby/game
  $("#b_newGame").click(function() {
    var gameName = $("#tb_gameName").val();
    var lobbyId = gl_generateUniqueId();

    if (gameName) {
      var newLobby = {
        p1_name: userDetails.name,
        p1_gameName: gameName,
        p1_uid: userDetails.uid,
        p1_Wins: userScores.wins,
        p1_losses: userScores.losses,
      };

      fb_writeRec(LOBBY + "/guessTheNumber/lobby1", lobbyId, newLobby, function() {
        var html_table = document.getElementById("tb_userDetails");

        var row = `<tr>  
                    <td>${newLobby.p1_name}</td>
                    <td class="w3-center">${newLobby.p1_wins}</td>
                    <td class="w3-center">${newLobby.p1_gameName}</td>
                    <td class="w3-center">${newLobby.p1_losses}</td>
                    <td class="w3-center">${lobbyId}</td>
                    <td><button class="b_join">Join</button></td>
                  </tr>`;
        html_table.innerHTML += row;
      });
    };
  });
});





/*****************************************************
function createNewLobby() {
  //generate ID
  var newLobbyId = gl_generateUniqueId();
  // prepare the data for the new lobby
  var newLobbyData = {
    created_at: firebase.database.ServerValue.TIMESTAMP,
    lobby_name: "",
    game_type: "",
    players: []
  };

  //Create the new lobby in DB
  firebase.database().ref(LOBBY + "/guessTheNumber/lobby1" + newLobbyId).set(newLobbyData)
    .then(function() {
      console.log("New lobby created with ID: " + newLobbyId);
    })
    .catch(function(error) {
      console.error("Failed to create new lobby: " + error);
    });
}
//listener for the "New Game" button
$("#_newGame").on("click", function() {
  createNewLobby();
});
});
/*****************************************************/

/*****************************************************/
//    END OF MODULE
/*****************************************************/