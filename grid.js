// Constants for grid
const GRID_SPACING = 50;
const GLOW_RADIUS = 150;

// Get the grid container and mouse glow element
const gridContainer = document.createElement('div');
gridContainer.id = 'grid-container';
document.body.appendChild(gridContainer);

const mouseGlow = document.createElement('div');
mouseGlow.id = 'mouse-glow';
document.body.appendChild(mouseGlow);

// Create grid
const createGrid = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let x = 0; x <= width; x += GRID_SPACING) {
    for (let y = 0; y <= height; y += GRID_SPACING) {
      // Add a dot at grid intersections
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      gridContainer.appendChild(dot);

      // Add horizontal and vertical lines
      if (x < width) {
        const lineH = document.createElement('div');
        lineH.classList.add('line', 'horizontal');
        lineH.style.left = `${x}px`;
        lineH.style.top = `${y}px`;
        lineH.style.width = `${GRID_SPACING}px`;
        gridContainer.appendChild(lineH);
      }
      if (y < height) {
        const lineV = document.createElement('div');
        lineV.classList.add('line', 'vertical');
        lineV.style.left = `${x}px`;
        lineV.style.top = `${y}px`;
        lineV.style.height = `${GRID_SPACING}px`;
        gridContainer.appendChild(lineV);
      }
    }
  }
};

// Mouse move handler to update glow position and fisheye effect
const handleMouseMove = (event) => {
  const { clientX, clientY } = event;

  // Move the mouse glow (it stays invisible now)
  mouseGlow.style.left = `${clientX - GLOW_RADIUS / 2}px`;
  mouseGlow.style.top = `${clientY - GLOW_RADIUS / 2}px`;

  // Update grid element opacity and scale for fisheye effect
  const gridElements = document.querySelectorAll('.dot, .line');
  gridElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const distance = Math.hypot(rect.x + rect.width / 2 - clientX, rect.y + rect.height / 2 - clientY);

    // Adjust opacity based on proximity to the mouse
    const opacity = Math.max(0, 1 - distance / GLOW_RADIUS);
    element.style.opacity = opacity.toFixed(2);

    // Apply fisheye effect by scaling grid elements based on proximity to the mouse
    const scale = 1 + Math.max(0, 1 - distance / (GLOW_RADIUS / 2)); // Increase scale based on proximity
    element.style.transform = `scale(${scale})`;
  });
};

// Attach event listeners
window.addEventListener('resize', () => {
  gridContainer.innerHTML = ''; // Clear the grid
  createGrid(); // Recreate on resize
});

window.addEventListener('mousemove', handleMouseMove);

// Initialize the grid on load
createGrid();
