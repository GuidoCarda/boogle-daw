var $playerForm = $(".player-form");
var $intro = $(".intro");
var $game = $(".game");
var $wordsList = $(".words-list");
var $currentWord = $(".current-word");

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

function displayNewWord(word) {
  var $word = document.createElement("li");
  $word.textContent = word;

  $wordsList.append($word);
}
$playerForm.addEventListener("submit", handlePlayerSubmit);
$cells.forEach(function ($cell) {
  $cell.addEventListener("click", function (e) {
    if (e.target.classList.contains("selected")) {
      $currentWord.textContent = $currentWord.textContent.slice(
        0,
        $currentWord.textContent.length - 1
      );
    } else {
      $currentWord.textContent += e.target.textContent;
    }
    e.target.classList.toggle("selected");
  });
});

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
