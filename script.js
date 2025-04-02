document.addEventListener("DOMContentLoaded", function () {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabLinks = document.querySelectorAll(".tab-link");

  function activateTab(tabName) {
    tabContents.forEach(content => {
      content.classList.toggle("active", content.id === tabName);
    });
    tabLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + tabName);
    });
  }

  // Handle clicks on tab links
  tabLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const tabName = this.getAttribute("href").substring(1);
      activateTab(tabName);
      history.pushState(null, "", "#" + tabName); // Update URL without scrolling
    });
  });

  // Check if there's a hash in the URL on page load
  let initialHash = window.location.hash.substring(1);
  if (initialHash && document.getElementById(initialHash)) {
    activateTab(initialHash);
  } else {
    activateTab("about"); // Default tab on first load
    history.replaceState(null, "", " "); // Remove hash without scrolling
  }

  // Handle manual hash changes (if user edits the URL)
  window.addEventListener("hashchange", function () {
    const newHash = window.location.hash.substring(1);
    if (newHash && document.getElementById(newHash)) {
      activateTab(newHash);
    }
  });

  // Ensure the page starts at the top on initial load
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", function () {
  const username = "SamuelWang05"; // Replace with your GitHub username
  const activityList = document.getElementById("activity-list");

  async function fetchGitHubActivity() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events/public`);
      if (!response.ok) throw new Error("Failed to fetch GitHub activity.");
      
      const data = await response.json();
      activityList.innerHTML = ""; // Clear previous content

      data.slice(0, 4).forEach(event => { // Limit to 4 events
        let emoji = "🤖"; // Default unknown event emoji
        let actionText = "Updated"; // Default action

        // Extract repository name (removes "username/")
        const repoName = event.repo.name.split("/")[1];
        const repoURL = `https://github.com/${event.repo.name}`;

        // Determine event type and corresponding emoji
        if (event.type === "PushEvent") {
          emoji = "🎯"; // Bullseye for push events
          actionText = "Pushed to";
        } else if (event.type === "PullRequestEvent") {
          emoji = "🔀";
          actionText = event.payload.action === "opened" ? "Opened a PR in" : "Updated a PR in";
        } else if (event.type === "IssuesEvent") {
          emoji = "🐛";
          actionText = event.payload.action === "opened" ? "Opened an issue in" : "Updated an issue in";
        } else if (event.type === "IssueCommentEvent") {
          emoji = "💬";
          actionText = "Commented on an issue in";
        }

        // Create list item
        const listItem = document.createElement("li");
        listItem.style.listStyleType = "none"; // Remove bullet points
        listItem.innerHTML = `${emoji} ${actionText} <a href="${repoURL}" target="_blank">${repoName}</a>`;

        activityList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching GitHub activity:", error);
      activityList.innerHTML = "<p>Unable to load recent activity.</p>";
    }
  }

  fetchGitHubActivity();
});