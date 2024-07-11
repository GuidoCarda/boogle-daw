var $playerForm = $(".player-form");
var $intro = $(".intro");
var $game = $(".game");

function handlePlayerSubmit(e) {
  e.preventDefault();
  var input = e.target.elements[0];
  var currentPlayer = input.value.trim();

  if (currentPlayer.length < 3) {
    return alert("El nombre debe tener minimo 3 caracteres");
  }

  $intro.classList.add("hidden");
  $game.classList.add("visible");

  console.log("El nombre es valido " + currentPlayer);
}

$playerForm.addEventListener("submit", handlePlayerSubmit);

var $timer = $(".timer");
var timer_options = [60, 120, 180];

function timer(time = 10) {
  var intervalRef;
  var remainingTime = time;

  if (!intervalRef) {
    intervalRef = setInterval(function () {
      $timer.textContent = remainingTime;

      if (remainingTime <= 0) {
        return clearInterval(intervalRef);
      }

      remainingTime = remainingTime - 1;
    }, 1000);
  }
}

timer();
