// Toggle Settings Section
function toggleSettings() {
  const settings = document.getElementById("settings-section");
  if (settings) settings.classList.toggle("hidden");
}

// Toggle Rating Section
function toggleRating() {
  const rating = document.getElementById("rateButton");
  if (rating) rating.classList.toggle("hidden");
}

// Change the title of the log dynamically
function changeTitle() {
  const newTitleInput = document.getElementById("newTitle");
  const logTitle = document.getElementById("logTitle");
  if (newTitleInput && logTitle) {
    const newTitle = newTitleInput.value.trim();
    if (newTitle) {
      logTitle.textContent = newTitle;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("logTitle", newTitle);
      }
    }
  }
}

// Save log entry to localStorage
function saveLog() {
  const logInput = document.getElementById("logInput");
  if (logInput) {
    const logText = logInput.value.trim();
    if (logText) {
      let logs = JSON.parse(localStorage.getItem("logs")) || [];
      logs.push(logText);
      localStorage.setItem("logs", JSON.stringify(logs));
      logInput.value = "";
      renderLogs();
    }
  }
}

// Render saved logs on the page
function renderLogs() {
  const logList = document.getElementById("logList");
  if (!logList) return;

  logList.innerHTML = "";
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.forEach((log, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${log}`;
    logList.appendChild(li);
  });
}

// Setup star rating component
function setupRating() {
  const ratingDiv = document.getElementById("starRating");
  if (!ratingDiv) return;

  ratingDiv.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.innerHTML = "★";
    star.dataset.value = i;
    star.classList.add("star");

    // Hover and click events
    star.addEventListener("mouseover", () => highlightStars(i));
    star.addEventListener("mouseout", restoreSavedRating);
    star.addEventListener("click", () => {
      localStorage.setItem("rating", i);
      highlightStars(i);
    });

    ratingDiv.appendChild(star);
  }

  restoreSavedRating();
}

// Highlight stars up to given count
function highlightStars(count) {
  const stars = document.querySelectorAll("#starRating .star");
  stars.forEach((star, index) => {
    star.classList.toggle("hover", index < count);
  });
}

// Restore saved rating on mouseout
function restoreSavedRating() {
  const savedRating = parseInt(localStorage.getItem("rating")) || 0;
  highlightStars(savedRating);
}

// Initialize on page load
window.onload = function () {
  const savedTitle = localStorage.getItem("logTitle");
  const logTitle = document.getElementById("logTitle");
  if (savedTitle && logTitle) {
    logTitle.textContent = savedTitle;
  }

  setupRating();
  renderLogs();
};
