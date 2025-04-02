document.addEventListener("DOMContentLoaded", function () {
  const tabContents = document.querySelectorAll('.tab-content');
  const tabLinks = document.querySelectorAll('.tab-link');

  function activateTab(tabName) {
    // Remove active classes from all tabs and content sections
    tabLinks.forEach(link => {
      if (link.getAttribute("href") === "#" + tabName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    tabContents.forEach(content => {
      if (content.id === tabName) {
        content.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });
  }

  function handleHashChange() {
    // Get current hash (without the # symbol)
    const hash = window.location.hash.substring(1);
    if (hash) {
      activateTab(hash);
    } else {
      // Default tab if no hash present
      activateTab("about");
    }
  }

  // Listen for hash changes
  window.addEventListener("hashchange", handleHashChange);

  // Activate the correct tab on page load
  handleHashChange();
});
