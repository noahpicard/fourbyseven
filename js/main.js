function loadScript(urls, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = urls[0];

    var short = urls.slice(1, urls.length);
    var next = () => loadScript(short, callback);
    if (short.length === 0) {
      next = callback;
    }

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = next;
    script.onload = next;

    // Fire the loading
    head.appendChild(script);
}

var state = null;
var ctx = null;
var activeTimers = {};

function main() {
  init()
}

function getCurrentWeekNumber() {
  currentdate = new Date();
  var numberOfDays = Math.floor((currentdate) / (24 * 60 * 60 * 1000));
  var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
  console.log(`The week number of the current date (${currentdate}) is ${result}.`);
  return result; // Change this to the index of your puzzle for testing
}

function getCurrentPuzzleData() {
  var index = getCurrentWeekNumber();
  return puzzleList[index % puzzleList.length];
}

function init() {
  var currentPuzzleData = getCurrentPuzzleData();
  console.log(currentPuzzleData);

  var weekCount = getCurrentWeekNumber() % 100;

  console.log(document.getElementById("letter-count"));
  document.getElementById("puzzle-title").innerHTML="Week " + weekCount + ": " + currentPuzzleData["title"];
  document.getElementById("puzzle-image").src=currentPuzzleData["image"];
  document.getElementById("letter-count").innerHTML="("+currentPuzzleData["answer"].length + " letters)";

  function checkAnswer() {
    var guess = document.getElementById("puzzle-answer").value.toLowerCase();
    console.log(guess);
    if (guess === currentPuzzleData["answer"]) {
      document.getElementById("answer-positive").innerHTML = "CORRECT!";
      document.getElementById("answer-negative").innerHTML = "";
    } else {
      document.getElementById("answer-positive").innerHTML = "";
      document.getElementById("answer-negative").innerHTML = "Incorrect.";
    }
  }

  document.getElementById("submit-button").addEventListener("click", checkAnswer);
}

var onLoad = function() {
  window.onload = (event) => {
    console.log('loaded!');
    main();
  }
};

loadScript(["js/puzzles.js"], onLoad);
