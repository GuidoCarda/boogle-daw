"use strict";

var RANKING_KEY = "ranking";

var $ranking = $(".ranking");
var $rankingOrder = $(".ranking-order");
var $closeRanking = $(".close", $ranking);
var $openRanking = $(".ranking-btn");

function formatDateTime(date) {
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return (
    date.getDate() +
    "-" +
    date.getMonth() +
    "-" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    minutes
  );
}

function orderByScore(entryA, entryB) {
  return entryB.score - entryA.score;
}

function orderByDate(entryA, entryB) {
  return new Date(entryB.date) - new Date(entryA.date);
}

function getRanking() {
  return JSON.parse(window.localStorage.getItem(RANKING_KEY)) || [];
}

function addToRanking(entry) {
  var ranking = getRanking();
  ranking.push(entry);
  ranking.sort(orderByScore);
  window.localStorage.setItem(RANKING_KEY, JSON.stringify(ranking));
}

function openRanking() {
  var ranking = getRanking();
  ranking.sort(orderByScore);
  displayRanking(ranking);
  $ranking.showModal();
}

function displayRanking(ranking) {
  var $players = $(".players", $ranking);

  $players.innerHTML = "";

  if (ranking.length) {
    for (var i = 0; i < ranking.length; i++) {
      var player = ranking[i];
      var $li = document.createElement("li");

      $li.innerHTML += "<span class='name'>" + player.name + "</span>";
      $li.innerHTML +=
        "<span class='date'>" +
        formatDateTime(new Date(player.date)) +
        "</span>";
      $li.innerHTML += "<span class='score'>" + player.score + "</span>";

      $players.append($li);
    }
  } else {
    var $li = document.createElement("li");
    $li.textContent = "Aun no hay registros";
    $players.append($li);
  }
}

function closeRanking() {
  $ranking.close();
  $rankingOrder.value = "score";
}

function handleRankingOrder(e) {
  var criteria = e.target.value;
  var ranking = getRanking();
  ranking.sort(criteria === "score" ? orderByScore : orderByDate);
  displayRanking(ranking);
}

$openRanking.addEventListener("click", openRanking);
$closeRanking.addEventListener("click", closeRanking);
$rankingOrder.addEventListener("change", handleRankingOrder);
