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
