document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  function activateTab(tabName) {
      // Remove 'active' class from all tabs and contents
      tabLinks.forEach(link => link.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Find the clicked tab and its content
      const targetLink = document.querySelector(`[data-tab="${tabName}"]`);
      const targetContent = document.getElementById(tabName);

      if (targetLink && targetContent) {
          targetLink.classList.add('active');
          targetContent.classList.add('active');
          history.pushState(null, '', `#${tabName}`); // Update URL without reloading
      }
  }

  // Handle tab clicks
  tabLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          e.preventDefault();
          const targetTab = this.getAttribute('data-tab');
          activateTab(targetTab);
      });
  });

  // Check URL hash on load (to persist selected tab)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
      activateTab(hash);
  } else {
      activateTab('about'); // Default tab
  }
});
