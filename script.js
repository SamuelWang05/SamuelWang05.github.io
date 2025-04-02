document.addEventListener("DOMContentLoaded", function () {
  const tabContents = document.querySelectorAll('.tab-content');
  const tabLinks = document.querySelectorAll('.tab-link');

  function activateTab(tabName) {
    // Toggle active class on tab links
    tabLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + tabName);
    });
    // Toggle active class on tab content sections
    tabContents.forEach(content => {
      content.classList.toggle("active", content.id === tabName);
    });
  }

  function handleHashChange() {
    let hash = window.location.hash.substring(1);
    if (!hash) {
      // Set default tab to "about" and update the URL
      hash = "about";
      history.replaceState(null, "", "#about");
    }
    activateTab(hash);
  }

  window.addEventListener("hashchange", handleHashChange);
  handleHashChange(); // Set the tab on initial load
});