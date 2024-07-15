var $playerForm = $(".player-form");
var $intro = $(".intro");
var $game = $(".game");
var $wordsList = $(".words-list");
var $board = $(".board");
var $cells = $$(".board-cell");
var $currentWord = $(".current-word");

var currentWord = {};

var board = [
  ["a", "b", "a", "a"],
  ["a", "a", "d", "a"],
  ["a", "a", "d", "a"],
  ["z", "z", "z", "z"],
];

function initBoard(board) {
  $rows = $$(".board-row");
  $rows.forEach(function ($row, rowIndex) {
    for (let index = 0; index < $row.children.length; index++) {
      $row.children[index].textContent = board[rowIndex][index];
    }
  });
}

initBoard(board);

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

function isValidWord(word) {
  return word.length > 2;
}

function handleMouseOver(e) {
  var cell = e.target;
  var row = cell.parentElement;
  var board = row.parentElement;

  var cellIndex = Array.prototype.indexOf.call(row.children, cell);
  var rowIndex = Array.prototype.indexOf.call(board.children, row);

  var validMoves = getValidMoves(rowIndex, cellIndex);
  validMoves.forEach(setValidCell);
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

function getLastLetterPos() {
  var lastLetterPos;
  for (var letterPos in currentWord) {
    if (currentWord.hasOwnProperty(letterPos)) {
      lastLetterPos = letterPos;
    }
  }
  return lastLetterPos;
}

// letterPositions = 'row-col'

function handleCellClick(e) {
  var cell = e.target;
  var row = cell.parentElement;
  var board = row.parentElement;

  var cellIndex = Array.prototype.indexOf.call(row.children, cell);
  var rowIndex = Array.prototype.indexOf.call(board.children, row);

  var selectedPos = rowIndex + "-" + cellIndex;
  var selectedLetter = e.target.textContent;

  var lastLetterPos;
  var isValidPos;

  if ($currentWord.textContent.length > 0) {
    lastLetterPos = getLastLetterPos();

    console.log(lastLetterPos);

    var validMoves = getValidMoves(
      Number(lastLetterPos[0]),
      Number(lastLetterPos[2])
    );

    isValidPos = Array.prototype.indexOf.call(validMoves, cell);

    if (isValidPos === -1 && lastLetterPos !== selectedPos) {
      console.log("Invalid movement! 1");
    }
  }

  if (e.target.classList.contains("selected")) {
    if (lastLetterPos === selectedPos) {
      delete currentWord[selectedPos];
      e.target.classList.toggle("selected");
    }
    $currentWord.textContent = getObjectValues(currentWord).join("");
  } else {
    if (isValidPos === -1 && lastLetterPos !== selectedPos) {
      console.log("Invalid movement! 2");

      return;
    }
    currentWord[selectedPos] = selectedLetter;
    $currentWord.textContent += selectedLetter;
    e.target.classList.toggle("selected");
  }
}

$cells.forEach(function ($cell) {
  $cell.addEventListener("click", handleCellClick);
});

function getObjectValues(obj) {
  var values = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }
  return values;
}

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
