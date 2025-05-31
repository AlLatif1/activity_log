// Toggle Settings Section
function toggleSettings() {
    const settings = document.getElementById("settings-section");
    settings.classList.toggle("hidden");
  }
  
  // Toggle Rating Section
  function toggleRating() {
    const rating = document.getElementById("rateButton");
    rating.classList.toggle("hidden");
  }
  
  // Change the title of the log dynamically
  function changeTitle() {
    const newTitle = document.getElementById("newTitle").value.trim();
    if (newTitle) {
      document.getElementById("logTitle").textContent = newTitle;
      localStorage.setItem("logTitle", newTitle);
    }
  }
  
  // Save log entry to localStorage
  function saveLog() {
    const logInput = document.getElementById("logInput").value.trim();
    if (logInput) {
      let logs = JSON.parse(localStorage.getItem("logs")) || [];
      logs.push(logInput);
      localStorage.setItem("logs", JSON.stringify(logs));
      document.getElementById("logInput").value = "";
      renderLogs();
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
  
      // Hover and click effects
      star.addEventListener("mouseover", () => highlightStars(i));
      star.addEventListener("mouseout", () => {
        const savedRating = parseInt(localStorage.getItem("rating")) || 0;
        highlightStars(savedRating);
      });
      star.addEventListener("click", () => {
        localStorage.setItem("rating", i);
        highlightStars(i);
      });
  
      ratingDiv.appendChild(star);
    }
  
    const savedRating = parseInt(localStorage.getItem("rating")) || 0;
    highlightStars(savedRating);
  }
  
  // Highlight stars up to given index
  function highlightStars(count) {
    const stars = document.querySelectorAll("#starRating .star");
    stars.forEach((star, index) => {
      if (index < count) {
        star.classList.add("hover");
      } else {
        star.classList.remove("hover");
      }
    });
  }
  
  // Initialize everything on page load
  window.onload = function () {
    const savedTitle = localStorage.getItem("logTitle");
    if (savedTitle) {
      document.getElementById("logTitle").textContent = savedTitle;
    }
  
    setupRating();
    renderLogs();
  };
  