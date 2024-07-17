// Add event listener to dark button
document.addEventListener("DOMContentLoaded", function() {
  const darkBtn = document.querySelector(".dark-btn");
  darkBtn.addEventListener("click", function() {
    // Toggle dark mode
    document.body.classList.toggle("dark-mode");
  });
});

// Add animation to overlay
document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.querySelector(".overlay");
  overlay.style.opacity = 0;
  setTimeout(function() {
    overlay.style.opacity = 1;
  }, 500);
});
