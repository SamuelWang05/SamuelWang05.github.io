document.addEventListener("DOMContentLoaded", function () {
    const username = "SamuelWang05"; // Replace with your GitHub username
    const activityList = document.getElementById("activity-list");

    fetch(`https://api.github.com/users/${username}/events`)
        .then(response => response.json())
        .then(data => {
            activityList.innerHTML = ""; // Clear previous content

            let count = 0; // Limit to 5 recent activities
            data.forEach(event => {
                if (count >= 5) return;

                let type = "";
                let repo = event.repo.name;
                let link = `https://github.com/${repo}`;
                let actionLink = "";
                
                if (event.type === "PushEvent") {
                    type = "🎯 Pushed changes";
                } else if (event.type === "PullRequestEvent") {
                    type = "🦾 Opened PR";
                    actionLink = `#${event.payload.pull_request.number}`;
                    link = event.payload.pull_request.html_url;
                } else if (event.type === "IssuesCommentEvent" || event.type === "IssueCommentEvent") {
                    type = "🗨️ Commented on";
                    actionLink = `#${event.payload.issue.number}`;
                    link = event.payload.issue.html_url;
                } else if (event.type === "ForkEvent") {
                    type = "🍴 Forked";
                } else {
                    return; // Skip unneeded events
                }

                let listItem = document.createElement("li");
                listItem.innerHTML = `${type} <a href="${link}" target="_blank">${actionLink}</a> in <a href="https://github.com/${repo}" target="_blank">${repo}</a>`;
                
                activityList.appendChild(listItem);
                count++;
            });
        })
        .catch(error => {
            console.error("Error fetching GitHub activity:", error);
            activityList.innerHTML = "<p>Could not load activity.</p>";
        });
});
