// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

// Track attendance
let count = 0;
const maxCount = 50;

// Handle form submissions
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment count
  count++;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;

  // Update attendee count display
  attendeeCount.textContent = count;

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Build and show the personalized greeting
  const message = `🎉 Welcome, ${name}! You have checked in! 🌱`;
  greeting.textContent = message;
  greeting.style.display = "block";

  // Reset the form
  form.reset();
});