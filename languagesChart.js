async function fetchLanguages() {
    const username = "SamuelWang05"; // GitHub username
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    
    let languageStats = {};

    try {
        const reposResponse = await fetch(reposUrl);
        const repos = await reposResponse.json();

        for (const repo of repos) {
            const langUrl = repo.languages_url;
            const langResponse = await fetch(langUrl);
            const languages = await langResponse.json();

            for (const [language, bytes] of Object.entries(languages)) {
                if (languageStats[language]) {
                    languageStats[language] += bytes;
                } else {
                    languageStats[language] = bytes;
                }
            }
        }

        return languageStats;
    } catch (error) {
        console.error("Error fetching languages:", error);
    }
}

async function displayChart() {
    const languageData = await fetchLanguages();

    const labels = Object.keys(languageData);
    const data = Object.values(languageData);

    const ctx = document.getElementById("languagesChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ["#f87171", "#60a5fa", "#facc15", "#4ade80", "#a78bfa"],
            }]
        }
    });
}

displayChart();
