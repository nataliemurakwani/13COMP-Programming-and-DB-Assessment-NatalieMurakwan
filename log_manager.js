
MODULENAME = "log_manager.js"

var lg_logIt = true;
lg_logIt_console(MODULENAME + '/n---------------', 'blue');
p_debug.textContext = lg_logIt;

function lg_logIt_console(_text, _colour) {
  if (lg_logIt == true) {
    console.log("%c" + _text, "color:" + _colour);
  }
}

document.addEventListener("keydown", function(event) {
  console.log("Key pressed: " + event.key);
  if (event.key == "n") {
    lg_logIt == true
    console.log(p_debug.textContext = lg_logIt);
  }
  else {
    lg_logIt == false;
    console.log("false")
  }
});

// Save data to session storage
sessionStorage.setItem("lg_logIt", "p_debug.textContext = lg_logIt");

// Get data from session storage
var data = sessionStorage.getItem("lg_logIt");

// Remove data from session storage
//sessionStorage.removeItem("p_debug.textContext = lg_logIt");

// Clear all data from session storage
//sessionStorage.clear();
/*****************************************************/
//    END OF MODULE
/*****************************************************/
