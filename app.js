const themeToggle = document.querySelector("#theme-toggle");
const themeColor = document.querySelector("#theme-color");
const root = document.documentElement;

function readSavedTheme() {
  try {
    return localStorage.getItem("portfolio-theme");
  } catch {
    // Storage can be blocked in private browsing; the switch should still work.
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    // Theme still changes for the current page even when storage is unavailable.
  }
}

function applyTheme(theme) {
  const isLight = theme === "light";
  root.dataset.theme = isLight ? "light" : "dark";

  if (themeToggle) {
    themeToggle.innerHTML = isLight ? "☾ <span>Dark mode</span>" : "☼ <span>Light mode</span>";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.setAttribute("aria-pressed", String(isLight));
  }

  if (themeColor) {
    themeColor.setAttribute("content", isLight ? "#f6f8fc" : "#0d1117");
  }
}

applyTheme(readSavedTheme() === "light" ? "light" : "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
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
}
