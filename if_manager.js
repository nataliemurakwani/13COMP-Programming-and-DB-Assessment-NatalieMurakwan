/*****************************************************/
// ???
// Written by ???   2022
/*****************************************************/
MODULENAME = "if_manager.js"
lg_logIt_console(MODULENAME + '/n---------------', 'blue');

/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
const DETAILS = "userDetails";
const GUESSTHENUMBER = "guessTheNumber";
const LOBBY = "lobby";
const SCORE = "scores";
const ADMIN = "admin";
var loginStatus = ' ';
var readStatus = ' ';
var writeStatus = ' ';

var userDetails = {
  uid: 'n/a',
  email: 'n/a',
  name: 'n/a',
  gameName: 'n/a',
  photoURL: 'n/a',
  age: 'n/a',
  gender: 'n/a',
  phone: 'n/a',
  city: 'n/a',
  suburb: 'n/a',
  streetNum: 'n/a',
  streetName: 'n/a',
  postCode: 'n/a'
};

var userJoin = {
  p2_gameName: 'n/a',
  p2_wins: 'n/a',
  p2_losses: 'n/a',
  p2_uid: 'n/a'
}

var userScores = {
  gameName: 'n/a',
  wins: 'n/a',
  losses: 'n/a',
  p2_gameName: 'n/a',
  p2_wins: 'n/a',
  p2_losses: 'n/a'
}
var adminStatus = "n/a"

var dbArray = [];
var lobbyArray = [];
var gn_gameArray = [];
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
var game = "n/a";

function setup() {
  console.log("setup");
  createCanvas(0, 0);
}
function if_load() {
  console.log("if_load")
  fb_initialise();
  userDetails.uid = sessionStorage.getItem('uid');
  userDetails.name = sessionStorage.getItem('name');
  userDetails.photoURL = sessionStorage.getItem('photoURL');
  userDetails.email = sessionStorage.getItem('email');
  userDetails.gameName = sessionStorage.getItem('gameName');
  adminStatus = sessionStorage.getItem("admin")
  userScores.wins = sessionStorage.getItem("wins")
  userScores.losses = sessionStorage.getItem("losses")


};

function if_loginBtn() {
  console.log("if_loginBtn");
  fb_initialise();
  fb_login(userDetails);
}
/*****************************************************/
// draw()
/*****************************************************/
function draw() {
  if (game == "bb") {
    bb_draw()
  }
  else if (game == "ttt") {
    ttt_draw()
  }
}
/*****************************************************/
//    END OF MODULE
/*****************************************************/