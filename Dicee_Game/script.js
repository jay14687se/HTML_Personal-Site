window.onload = loadPage();
window.onhashchange = refreshMe();

function loadPage(){
  var header = document.querySelector("h1").innerHTML = "Refresh Me";
}

function refreshMe(){
  var images = document.querySelectorAll(".dice");
  var randNum1 = Math.floor(Math.random()*6)+1;
  var randNum2 = Math.floor(Math.random()*6)+1;

  images[0].setAttribute("src", "images/dice"+ randNum1 +".png");
  images[1].setAttribute("src", "images/dice"+ randNum2 +".png");
  var header = document.querySelector("h1");
  if(randNum1 > randNum2) {
    header.innerHTML = "<i class='fas fa-flag flag'></i>  Player 1 Wins!"
  } else if(randNum1 < randNum2) {
    header.innerHTML = "Player 2 Wins!  <i class='fas fa-flag flag'></i>"
  } else {
    header.innerHTML = "Draw!"
  }
}

//<i class="fas fa-pennant flag"></i>
