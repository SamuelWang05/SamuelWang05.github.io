document.addEventListener('DOMContentLoaded', function () {
  // Homepage fade-in effect for intro elements
  const introElements = document.querySelectorAll('.intro img, .intro .text-container');
  introElements.forEach((element, index) => {
      setTimeout(() => {
          element.classList.add('visible');
      }, index * 500); // Delay each element by 500ms for smoother effect
  });

  // Fade-in effect for navigation, project cards, and tracking section
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element, index) => {
      setTimeout(() => {
          element.classList.add('visible');
      }, index * 300); // Stagger the fade-in effect by 300ms per element
  });

  // Connect page fade-in effect for link boxes
  const linkBoxes = document.querySelectorAll('.link-box');
  linkBoxes.forEach((box, index) => {
      setTimeout(() => {
          box.classList.add('visible');
      }, index * 200); // Stagger by 200ms per box
  });
});

GitHubCalendar(".calendar", "SamuelWang05", { responsive: true });