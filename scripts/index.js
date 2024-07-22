"use strict";

var $playerForm = $(".player-form");
var $intro = $(".intro");
var $game = $(".game");
var $endGame = $(".end-game");
var $board = $(".board");
var $cells = $$(".board-cell");
var $wordsList = $(".words-list");
var $currentWord = $(".current-word");
var $checkWord = $(".check-word");
var $score = $(".score");
var $alert = $(".alert");
var $timer = $(".timer");
var $restart = $(".restart");

var timer_options = [60, 120, 180];

var currentWord = {};
var score = 0;
var errors = 0;
var guessedWords = [];
var player;

var words = ["hola", "ola", "algo", "prueba"];

function getRandomLetter(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

function initBoard() {
  var $rows = $$(".board-row");
  var vowels = "aeiou";
  var consonants = "bcdfghjklmnpqrstvwxyz";
  var board = [[], [], [], []];
  var letters = [];

  var totalCells = 16;
  var vowelCount = Math.floor(totalCells * 0.4);
  var consonantCount = totalCells - vowelCount;

  for (var i = 0; i < vowelCount; i++) {
    letters.push(getRandomLetter(vowels));
  }

  for (var i = 0; i < consonantCount; i++) {
    letters.push(getRandomLetter(consonants));
  }

  letters.sort(function () {
    return 0.5 - Math.random();
  });

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < 4; j++) {
      board[i][j] = letters.pop();
    }
  }

  for (var i = 0; i < $rows.length; i++) {
    var $row = $rows[i];
    var $cells = $row.children;
    for (var j = 0; j < $cells.length; j++) {
      $cells[j].textContent = board[i][j];
    }
  }
}

function endGame() {
  var $result = $(".result", $endGame);
  var result = "No completaste ninguna palabra";

  if (guessedWords.length) {
    result =
      "Completaste " +
      guessedWords.length +
      " y sumaste un total de " +
      score +
      " puntos";
  }

  $result.textContent = result;

  $game.classList.remove("visible");
  $endGame.classList.add("visible");

  addToRanking({
    name: player,
    date: new Date(),
    score,
  });
}

function timer(time = 10) {
  var intervalRef;
  var remainingTime = time;

  $timer.textContent = remainingTime;
  $timer.classList.remove("ending");

  if (!intervalRef) {
    intervalRef = setInterval(function () {
      $timer.textContent = remainingTime;

      if (remainingTime <= 10) {
        $timer.classList.add("ending");
      }

      if (remainingTime <= 0) {
        endGame();
        return clearInterval(intervalRef);
      }

      remainingTime = remainingTime - 1;
    }, 1000);
  }
}

function newGame() {
  $intro.classList.add("hidden");
  $game.classList.add("visible");

  timer(timer_options[0]);
  initBoard();
}

function showAlert(message) {
  if ($alert.classList.contains("visible")) {
    $alert.classList.remove("visible");
  }

  $alert.textContent = message;
  $alert.classList.add("visible");

  setTimeout(function () {
    $alert.classList.remove("visible");
  }, 2000);
}

function handlePlayerSubmit(e) {
  e.preventDefault();
  var $input = e.target.elements[0];
  var currentPlayer = $input.value.trim();

  if (currentPlayer.length < 3) {
    return showAlert("El nombre debe tener minimo 3 caracteres");
  }

  player = currentPlayer;
  $playerForm.reset();
  newGame();
}

function displayNewWord(word, score) {
  var $word = document.createElement("li");
  var $score = document.createElement("span");
  $word.textContent = word;
  $score.textContent = score + "pts";

  $word.append($score);
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

function clearBoard() {
  $cells.forEach(function ($cell) {
    $cell.classList.remove("selected");
  });
}

function checkWord(word) {
  return fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(function (res) {
      if (!res.ok) {
        return false;
      }
      return res.json();
    })
    .then(function (data) {
      if (!data || !data.length) {
        return false;
      }
      return true;
    })
    .catch(function () {
      return false;
    });
}

function handleWordSubmit() {
  var word = getObjectValues(currentWord).join("");

  if (!isValidWord(word)) {
    showAlert("Debe contener al menos 3 letras");
  } else if (guessedWords.includes(word)) {
    showAlert("Ya ingresaste " + word);
  } else {
    checkWord(word).then(function (isValid) {
      if (isValid) {
        displayNewWord(word, WORD_LENGTH_POINTS[word.length]);
        guessedWords.push(word);
        score += WORD_LENGTH_POINTS[word.length];
        $score.textContent = score;
      } else {
        showAlert("Palabra invalida");
      }
    });
  }

  $currentWord.textContent = "";
  currentWord = {};
  clearBoard();
}

function getLastLetterPos() {
  // letterPositions = 'row-col'
  var lastLetterPos;
  for (var letterPos in currentWord) {
    if (currentWord.hasOwnProperty(letterPos)) {
      lastLetterPos = letterPos;
    }
  }
  return lastLetterPos;
}

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

    var validMoves = getValidMoves(
      Number(lastLetterPos[0]),
      Number(lastLetterPos[2])
    );

    isValidPos = Array.prototype.indexOf.call(validMoves, cell);

    if (isValidPos === -1 && lastLetterPos !== selectedPos) {
      console.log("Invalid movement! 1");
      return;
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

function getObjectValues(obj) {
  var values = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }
  return values;
}

function handleRestart() {
  $endGame.classList.remove("visible");
  $intro.classList.remove("hidden");
  $currentWord.textContent = "";
  $score.textContent = "0";
  $wordsList.innerHTML = "";
  currentWord = {};
  score = 0;
  errors = 0;
  guessedWords = [];
  clearBoard();
}

$cells.forEach(function ($cell) {
  $cell.addEventListener("click", handleCellClick);
});
$checkWord.addEventListener("click", handleWordSubmit);
$playerForm.addEventListener("submit", handlePlayerSubmit);
$cells.forEach(function ($cell) {
  $cell.addEventListener("mouseover", handleMouseOver);
  $cell.addEventListener("mouseout", handleMouseOut);
});

$restart.addEventListener("click", handleRestart);
