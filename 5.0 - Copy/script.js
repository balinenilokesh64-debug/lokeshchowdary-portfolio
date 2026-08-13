/* =============================================
   LOKESH BALINENI — CINEMATIC PORTFOLIO JS
   ============================================= */

/* ===== LOADER ===== */
window.addEventListener("load", () => {
  // Count up animation
  const pct = document.getElementById("loaderPct");
  let n = 0;
  const counter = setInterval(() => {
    n++;
    if (pct) pct.textContent = n + "%";
    if (n >= 100) clearInterval(counter);
  }, 11);

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
    document.body.classList.remove("loading");
    // trigger reveals above the fold
    checkReveals();
  }, 1300);
});

/* ===== HEADER SCROLL ===== */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, { passive: true });

/* ===== CUSTOM CURSOR ===== */
const ring = document.querySelector(".cursor-ring");
const dot  = document.querySelector(".cursor-dot");
const isFinePointer = window.matchMedia("(pointer:fine)").matches;

if (isFinePointer && ring && dot) {
  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top  = my + "px";
  });

  const trackRing = () => {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(trackRing);
  };
  trackRing();

  document.querySelectorAll("a, button, .vid-card, .reel-card, .gallery-item, .srv-card, .bento-card").forEach(el => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
  });

  document.addEventListener("click", () => {
    dot.style.transform = "translate(-50%,-50%) scale(2.5)";
    setTimeout(() => dot.style.transform = "translate(-50%,-50%) scale(1)", 120);
  });
} else {
  if (ring) ring.style.display = "none";
  if (dot)  dot.style.display  = "none";
}

/* ===== SCROLL REVEAL ===== */
function checkReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 60) {
      el.classList.add("visible");
    }
  });
}

// stagger children inside each section
document.querySelectorAll(".bento, .services-row, .vid-grid, .reel-grid, .gallery-grid").forEach(container => {
  container.querySelectorAll(".reveal").forEach((child, i) => {
    child.style.transitionDelay = (i * 0.07) + "s";
  });
});

window.addEventListener("scroll", checkReveals, { passive: true });
window.addEventListener("resize", checkReveals, { passive: true });

/* ===== CONTACT FORM ===== */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", () => {
    const btn = form.querySelector(".send-btn");
    if (btn) {
      btn.textContent = "Sending...";
      btn.classList.add("loading");
      btn.disabled = true;
    }
  });
}

/* ===== ACTIVE NAV ON SCROLL ===== */
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("section[id]");

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.color = "");
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active && !active.classList.contains("nav-hire")) {
        active.style.color = "#fff";
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObs.observe(s));

/* ===== REDUCED MOTION ===== */
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("visible");
    el.style.transition = "none";
  });
}