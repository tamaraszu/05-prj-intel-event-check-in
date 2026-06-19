// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const attendeeList = document.getElementById("attendeeList");

const maxCount = 50;

// Load saved state from localStorage, or start fresh
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];
let teamCounts = JSON.parse(localStorage.getItem("teamCounts")) || {
  water: 0,
  zero: 0,
  power: 0,
};

// Save current state to localStorage
function saveState() {
  localStorage.setItem("attendees", JSON.stringify(attendees));
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
}

// Render the team counters
function renderTeamCounts() {
  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;
}

// Render the attendance count + progress bar
function renderAttendance() {
  attendeeCount.textContent = attendees.length;
  const percentage = Math.round((attendees.length / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
}

// Render the attendee list
function renderAttendeeList() {
  attendeeList.innerHTML = "";

  if (attendees.length === 0) {
    attendeeList.innerHTML = `<p class="empty-list">No check-ins yet. Be the first!</p>`;
    return;
  }

  const teamEmojis = { water: "🌊", zero: "🌿", power: "⚡" };

  [...attendees].reverse().forEach((attendee) => {
    const item = document.createElement("div");
    item.classList.add("attendee-item", attendee.team);
    item.innerHTML = `
      <span class="attendee-name">${attendee.name}</span>
      <span class="attendee-team">${teamEmojis[attendee.team]} ${attendee.teamName}</span>
    `;
    attendeeList.appendChild(item);
  });
}

// Initial render on page load
renderTeamCounts();
renderAttendance();
renderAttendeeList();

// Handle form submissions
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Save attendee
  attendees.push({ name, team, teamName });

  // Update team counter
  teamCounts[team]++;

  // Persist to localStorage
  saveState();

  // Re-render everything
  renderTeamCounts();
  renderAttendance();
  renderAttendeeList();

  // Check if we've reached the attendance goal
  if (attendees.length === maxCount) {
    const teams = [
      { name: "Team Water Wise 🌊", count: teamCounts.water },
      { name: "Team Net Zero 🌿", count: teamCounts.zero },
      { name: "Team Renewables ⚡", count: teamCounts.power },
    ];

    teams.sort((a, b) => b.count - a.count);
    const winner = teams[0];
    const isTie = teams[1].count === winner.count;

    const celebrationMessage = isTie
      ? `🎉 We hit 50 check-ins! It's a tie at the top — amazing work, everyone! 🎊`
      : `🎉 We hit 50 check-ins! Congrats to ${winner.name} for leading the way! 🏆`;

    greeting.textContent = celebrationMessage;
    greeting.style.display = "block";
  } else {
    const message = `🎉 Welcome, ${name}! You have checked in! 🌱`;
    greeting.textContent = message;
    greeting.style.display = "block";
  }

  // Reset the form
  form.reset();
});