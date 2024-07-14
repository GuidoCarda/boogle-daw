var $playerForm = $(".player-form");
var $intro = $(".intro");
var $game = $(".game");
var $wordsList = $(".words-list");
var $board = $(".board");
var $cells = $$(".board-cell");
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

function setValidCell($cell) {
  $cell.classList.add("valid-cell");
}

function handleMouseOver(e) {
  var cell = e.target;
  var row = cell.parentElement;
  var board = row.parentElement;

  var cellIndex = Array.prototype.indexOf.call(row.children, cell);
  var rowIndex = Array.prototype.indexOf.call(board.children, row);

  var validMoves = getValidMoves(rowIndex, cellIndex);

  validMoves.forEach(setValidCell);

  console.log(validMoves);
}

function handleMouseOut() {
  var hoveredCells = document.querySelectorAll(".board-cell.valid-cell");
  for (var i = 0; i < hoveredCells.length; i++) {
    hoveredCells[i].classList.remove("valid-cell");
  }
}

function getValidMoves(rowIndex, cellIndex) {
  // [row, col]
  var directions = [
    [-1, -1], // Top-left
    [-1, 0], // Top
    [-1, 1], // Top-right
    [0, -1], // Left
    [0, 1], // Right
    [1, -1], // Bottom-left
    [1, 0], // Bottom
    [1, 1], // Bottom-right
  ];

  var validCells = [];
  var $rows = $$(".board-row");

  for (var i = 0; i < directions.length; i++) {
    var newRow = rowIndex + directions[i][0];
    var newCell = cellIndex + directions[i][1];

    if (newRow >= 0 && newRow < 4 && newCell >= 0 && newCell < 4) {
      var $cell = $rows[newRow].children[newCell];

      if ($cell.classList.contains("selected")) {
        continue;
      }

      validCells.push($rows[newRow].children[newCell]);
    }
  }

  return validCells;
}

$playerForm.addEventListener("submit", handlePlayerSubmit);
$cells.forEach(function ($cell) {
  $cell.addEventListener("mouseover", handleMouseOver);
  $cell.addEventListener("mouseout", handleMouseOut);
});
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
