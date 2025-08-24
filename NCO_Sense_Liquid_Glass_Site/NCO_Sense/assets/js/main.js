
// Smooth page transitions + active link highlight + theme toggle + voice input
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("pageTransition");
  const links = document.querySelectorAll("[data-nav]");
  const themeToggle = document.getElementById("themeToggle");

  links.forEach(a => {
    a.addEventListener("click", (e) => {
      if (a.target === "_blank") return;
      if (e.metaKey || e.ctrlKey) return; // open in new tab allowed
      e.preventDefault();
      overlay.style.opacity = 1;
      setTimeout(() => window.location.href = a.getAttribute("href"), 220);
    });
  });

  window.addEventListener("pageshow", () => {
    overlay.style.opacity = 0;
  });

  // theme toggle
  themeToggle?.addEventListener("click", () => {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") !== "light";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
  });

  // animate in
  if (window.gsap) {
    gsap.from(".container > *", { y: 24, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" });
  }

  // Scroll parallax effect on large titles
  const title = document.querySelector(".hero h1");
  if (title) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY * 0.2;
      title.style.transform = `translateY(${y}px)`;
    });
  }

  // Voice input on demo page
  const micBtn = document.getElementById("micBtn");
  const searchInput = document.getElementById("searchInput");
  if (micBtn && searchInput && "webkitSpeechRecognition" in window) {
    const rec = new webkitSpeechRecognition();
    rec.lang = "en-IN";
    rec.continuous = false;
    rec.interimResults = false;
    micBtn.addEventListener("click", () => { rec.start(); micBtn.textContent = "🎙️..."; });
    rec.onresult = (e) => { searchInput.value = e.results[0][0].transcript; micBtn.textContent = "🎤"; };
    rec.onend = () => { micBtn.textContent = "🎤"; };
  }
});
