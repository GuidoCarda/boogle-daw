"use strict";


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
