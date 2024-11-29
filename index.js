// script.js
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// Optional dark-theme styling
document.styleSheets[0].insertRule(`
  body.dark-theme {
    background-color: #121212;
    color: #ffffff;
  }
`);

document.styleSheets[0].insertRule(`
  body.dark-theme header {
    background-color: #1f1f1f;
  }
`);

document.styleSheets[0].insertRule(`
  body.dark-theme footer {
    background-color: #1f1f1f;
  }
`);








