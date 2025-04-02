document.addEventListener("DOMContentLoaded", function () {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabLinks = document.querySelectorAll(".tab-link");

  function activateTab(tabName) {
    // Toggle active classes on content sections
    tabContents.forEach(content => {
      content.classList.toggle("active", content.id === tabName);
    });
    // Toggle active classes on tab links
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
      // Update the URL hash without jumping
      history.pushState(null, "", window.location.pathname + window.location.search + "#" + tabName);
      window.scrollTo(0, 0); // Keep the page at the top
    });
  });

  // On page load, check if there's a hash in the URL
  let initialHash = window.location.hash.substring(1);
  if (initialHash && document.getElementById(initialHash)) {
    activateTab(initialHash);
  } else {
    // If no valid hash, default to "about" but remove the hash from URL so the page loads at the top.
    activateTab("about");
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  // Listen for manual hash changes (if someone changes it in the address bar)
  window.addEventListener("hashchange", function () {
    const newHash = window.location.hash.substring(1);
    if (newHash && document.getElementById(newHash)) {
      activateTab(newHash);
      window.scrollTo(0, 0);
    }
  });
});
