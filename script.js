document.addEventListener("DOMContentLoaded", function () {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabLinks = document.querySelectorAll(".tab-link");

  function activateTab(tabName) {
    tabContents.forEach(content => {
      const isTarget = content.id === tabName;

      content.classList.toggle("active", isTarget);
      content.classList.toggle("visible", false); // reset fade-in

      if (isTarget) {
        // Allow a reflow so animation restarts
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            content.classList.add("visible");
          });
        });
      }
    });

    tabLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + tabName);
    });
  }

  // Handle tab link clicks
  tabLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const tabName = this.getAttribute("href").substring(1);
      activateTab(tabName);
      history.pushState(null, "", "#" + tabName);
    });
  });

  // Scroll to top on load
  window.scrollTo(0, 0);

  // Initial fade-in for top-level sections
  document.querySelectorAll(".fade-in").forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, index * 200); // Staggered fade-in
  });

  // Activate default or hash-specified tab
  const initialHash = window.location.hash.substring(1);
  if (initialHash && document.getElementById(initialHash)) {
    activateTab(initialHash);
  } else {
    activateTab("about");
    history.replaceState(null, "", " ");
  }

  // Listen for URL hash changes
  window.addEventListener("hashchange", function () {
    const newHash = window.location.hash.substring(1);
    if (newHash && document.getElementById(newHash)) {
      activateTab(newHash);
    }
  });
});

// GitHub activity section (unchanged)
document.addEventListener("DOMContentLoaded", function () {
  const username = "SamuelWang05";
  const activityList = document.getElementById("activity-list");

  async function fetchGitHubActivity() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events/public`);
      if (!response.ok) throw new Error("Failed to fetch GitHub activity.");

      const data = await response.json();
      activityList.innerHTML = "";

      data.slice(0, 4).forEach(event => {
        let emoji = "🤖";
        let actionText = "Updated";

        const repoName = event.repo.name.split("/")[1];
        const repoURL = `https://github.com/${event.repo.name}`;

        if (event.type === "PushEvent") {
          emoji = "🎯";
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

        const listItem = document.createElement("li");
        listItem.style.listStyleType = "none";
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