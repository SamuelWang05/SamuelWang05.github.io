document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
  
    tabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetTab = this.getAttribute('data-tab');
  
        tabLinks.forEach(function (item) {
          item.classList.remove('active');
        });
        tabContents.forEach(function (item) {
          item.classList.remove('active');
        });
  
        this.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        targetContent.classList.add('active');
      });
    });
  });
  
  