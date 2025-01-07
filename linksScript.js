document.addEventListener('DOMContentLoaded', function () {
    // Homepage fade-in effect
    const introElements = document.querySelectorAll('.intro img, .intro .text-container');
    introElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 500); // Delay each element by 500ms for smoother effect
    });
  
    // Connect page fade-in effect for link boxes
    const linkBoxes = document.querySelectorAll('.link-box');
  
    linkBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add('visible');
      }, index * 200); // Stagger by 200ms per box
    });
  });
  