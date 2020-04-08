var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("h1").text("Level " + level);
  btnPressed("#" + gamePattern[gamePattern.length - 1]);
  level++;
  console.log(gamePattern);
}

function animateBtn(soundFile, btnId) {
  var audio = new Audio(soundFile);
  audio.play();
  $("#" + btnId).toggleClass("pressed");
  setTimeout(function() {
    $("#" + btnId).toggleClass("pressed");
  }, 100);
}

function btnPressed(btnId) {
  switch ($(btnId).attr("id")) {
    case "red":
      animateBtn("sounds/red.mp3", "red");
      break;
    case "blue":
      animateBtn("sounds/blue.mp3", "blue");
      break;
    case "green":
      animateBtn("sounds/green.mp3", "green");
      break;
    case "yellow":
      animateBtn("sounds/yellow.mp3", "yellow");
      break;
  }
}

function checkAnswer(currentLevel){
  return gamePattern[currentLevel] === userClickedPattern[currentLevel];
}

$(document).keypress(function(event) {
  if (level === 1) {
    console.log(event)
    setTimeout(function(){nextSequence();}, 1000);
  }
});

var i = 0;
var result;
$(".btn").click(function(event) {
  btnPressed(event.target); //event.target or this
  userClickedPattern.push($(event.target).attr("id"));
  result = checkAnswer(i);
  i++;
  if(i >= gamePattern.length && result != false){
    userClickedPattern = [];
    i = 0;
    setTimeout(function(){nextSequence();}, 1000);
  }
  if(result === false){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").toggleClass("game-over");
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 100);
    userClickedPattern = [];
    i = 0;
    gamePattern = [];
    level = 1;
  }
  console.log(userClickedPattern);
});
