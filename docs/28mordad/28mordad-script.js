// 28 Mordad section script (standalone, minimal, safe)
(function () {
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (_) {}
    const btn = document.getElementById("themeToggle");
    if (btn) btn.innerHTML = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    let theme = "dark";
    try {
      theme = localStorage.getItem("theme") || "dark";
    } catch (_) {}
    // Normalize
    if (theme !== "dark" && theme !== "light") theme = "dark";
    setTheme(theme);

    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  function initReveal() {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => obs.observe(el));
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initReveal();
  });
})();


