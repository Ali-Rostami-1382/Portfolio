const themeToggle = document.querySelector("#theme-toggle");
const themeColor = document.querySelector("#theme-color");
const root = document.documentElement;

function applyTheme(theme) {
  const isLight = theme === "light";
  root.dataset.theme = isLight ? "light" : "dark";
  themeToggle.innerHTML = isLight ? "☾ <span>Dark mode</span>" : "☼ <span>Light mode</span>";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeColor.setAttribute("content", isLight ? "#f6f8fc" : "#0d1117");
}

const savedTheme = localStorage.getItem("portfolio-theme");
applyTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});
