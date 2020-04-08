
for(var i = 0; i < document.querySelectorAll(".drum").length; i++){
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    switch (this.innerHTML) {
      case "w":
        selectSound("sounds/crash.mp3", this.innerHTML);
        break;
      case "a":
        selectSound("sounds/kick-bass.mp3", this.innerHTML);
        break;
      case "s":
        selectSound("sounds/snare.mp3", this.innerHTML);
        break;
      case "d":
        selectSound("sounds/tom-1.mp3", this.innerHTML);
        break;
      case "j":
        selectSound("sounds/tom-2.mp3", this.innerHTML);
        break;
      case "k":
        selectSound("sounds/tom-3.mp3", this.innerHTML);
        break;
      case "l":
        selectSound("sounds/tom-4.mp3", this.innerHTML);
        break;
    }
  });
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      // selectSound("sounds/crash.mp3");
      document.querySelector("button.w").click();
      break;
    case "a":
      // selectSound("sounds/kick-bass.mp3");
      document.querySelector("button.a").click();
      break;
    case "s":
      // selectSound("sounds/snare.mp3");
      document.querySelector("button.s").click();
      break;
    case "d":
      // selectSound("sounds/tom-1.mp3");
      document.querySelector("button.d").click();
      break;
    case "j":
      // selectSound("sounds/tom-2.mp3");
      document.querySelector("button.j").click();
      break;
    case "k":
      // selectSound("sounds/tom-3.mp3");
      document.querySelector("button.k").click();
      break;
    case "l":
      // selectSound("sounds/tom-4.mp3");
      document.querySelector("button.l").click();
      break;
  }
})

function selectSound(mp3File, keyClass){
  var audio = new Audio(mp3File);
  audio.play();
  btnAnimation(keyClass);
}

function btnAnimation(currentKey){
  var activeBtn = document.querySelector("." + currentKey);
  activeBtn.classList.add("pressed");
  setTimeout(function(){activeBtn.classList.remove("pressed");}, 100);
}
