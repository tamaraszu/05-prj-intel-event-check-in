//Get all needed DOM elements
const from = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//track attendance
let count = 0; 
const maxCount = 50;

//Handle form submissions
from.addEventListener("submit", function(event){
  event.preventDefault();

  //get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //increment count
  count++
  console.log("Total check-ins:", count);

  //update progress bar
  const percentage = Math.round(count / maxCount * 100) + "%";
  console.log("Progress: " + percentage);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  const current = parseInt(teamCounter.textContent);
  console.log("Previous team count:", current);

  const newTotal = current + 1;
  console.log("New");
});