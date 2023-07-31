/**************************************************************/
// gs_manager.js
// Game selection Page
// Written by Natalie Murakwani 2023
/**************************************************************/
MODULENAME = "gs_manager.js"
lg_logIt_console(MODULENAME + '/n---------------', 'blue');

/*****************************************************/
// BUTTONFUNCTIONS()
/*****************************************************/
function gs_gnButton() {
  console.log('gs_gnButton');
 gl_load(SCORE + "/guessTheNum");
};

function gs_siButton() {
  console.log('gs_siButton');
    window.location.href = "si_game.html";
};

function gs_gnInstrButton() {
  console.log('gs_gnInstrButton');
    window.location.href = "gn_instructions.html";
};

function gs_siInstrButton() {
  console.log('gs_siInstrButton');
    window.location.href = "si_instructions.html";
};
/*****************************************************/
//    END OF MODULE
/*****************************************************/