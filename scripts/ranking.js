"use strict";

var RANKING_KEY = "ranking";

var $ranking = $(".ranking");
var $closeRanking = $(".close", $ranking);
var $openRanking = $(".ranking-btn");

function formatDate(date) {
  return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
}

function getRanking() {
  return JSON.parse(window.localStorage.getItem(RANKING_KEY)) || [];
}

function addToRanking(entry) {
  var ranking = getRanking();
  ranking.push(entry);

  ranking.sort(function (entryA, entryB) {
    return entryB.score - entryA.score;
  });

  window.localStorage.setItem(RANKING_KEY, JSON.stringify(ranking));
}

function openRanking() {
  var $players = $(".players", $ranking);
  var ranking = getRanking();

  ranking.sort(function (entryA, entryB) {
    return entryB.score - entryA.score;
  });

  $players.innerHTML = "";

  if (ranking.length) {
    for (var i = 0; i < ranking.length; i++) {
      var player = ranking[i];
      var $li = document.createElement("li");

      $li.innerHTML += "<span class='name'>" + player.name + "</span>";
      $li.innerHTML +=
        "<span class='date'>" + formatDate(new Date(player.date)) + "</span>";
      $li.innerHTML += "<span class='score'>" + player.score + "</span>";

      $players.append($li);
    }
  } else {
    var $li = document.createElement("li");
    $li.textContent = "Aun no hay registros";
    $players.append($li);
  }

  $ranking.showModal();
}

function closeRanking() {
  $ranking.close();
}

$openRanking.addEventListener("click", openRanking);
$closeRanking.addEventListener("click", closeRanking);
