// -------------------------
// Firebase Initialization
// -------------------------
// Browser-compatible Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDesQHO95SuHJ-OPR1Wg-QgRfLDDoe9D54",
  authDomain: "hezkat-hagil-harach.firebaseapp.com",
  projectId: "hezkat-hagil-harach",
  storageBucket: "hezkat-hagil-harach.appspot.com",
  messagingSenderId: "251986465767",
  appId: "1:251986465767:web:798e9d1990e47e971be342"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// -------------------------
// Helper function: get file URL
// -------------------------
async function getFileURL(path) {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error(`Error getting URL for "${path}":`, error);
    return null;
  }
}

// -------------------------
// Load images from Firebase Storage
// -------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const images = document.querySelectorAll("img[data-firebase-path]");

  images.forEach(async (img) => {
    const path = img.getAttribute("data-firebase-path");
    if (!path) return;

    try {
      const url = await getFileURL(path);
      if (url) img.src = url; // replace src with Firebase Storage URL
    } catch (err) {
      console.error(`Failed to load image ${path}:`, err);
    }
  });
});

// Load videos from Firebase Storage
const videos = document.querySelectorAll("video[data-firebase-path]");

videos.forEach(async (video) => {
  const path = video.getAttribute("data-firebase-path");
  if (!path) return;

  try {
    const url = await getFileURL(path);
    if (url) {
      const source = video.querySelector("source");
      if (source) source.src = url;
      else video.src = url;
      video.load();
      video.play().catch(() => {});
    }
  } catch (err) {
    console.error(`Failed to load video ${path}:`, err);
  }
});

// -------------------------
// Smooth Scroll for Nav Links
// -------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // adjust for fixed navbar
        behavior: 'smooth'
      });
    }
  });
});

// -------------------------
// Reveal Sections on Scroll
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Typewriter effect for typewriter paragraph
        if (entry.target.id === "typewriter" && !entry.target.dataset.typed) {
          typeWriter(entry.target);
        }
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
});

// -------------------------
// Typewriter Effect
// -------------------------
function typeWriter(container) {
  if (container.dataset.typed) return; // prevent re-trigger
  container.dataset.typed = true;

  const sentences = [
    "וללא הבחנה בין הורה נורמטיבי להורה אלים ונרקיסיסט,",
    "האם זוהי טובת הילד?"
  ];

  container.textContent = "";
  let i = 0, sentenceIndex = 0;
  let redSpan;

  const interval = setInterval(() => {
    const currentSentence = sentences[sentenceIndex];

    if (sentenceIndex === 1 && !redSpan) {
      redSpan = document.createElement("span");
      redSpan.classList.add("red-text");
      container.appendChild(document.createElement("br"));
      container.appendChild(redSpan);
    }

    const targetContainer = sentenceIndex === 0 ? container : redSpan;

    if (i < currentSentence.length) {
      targetContainer.textContent += currentSentence.charAt(i);
      i++;
    } else {
      i = 0;
      sentenceIndex++;
      if (sentenceIndex >= sentences.length) clearInterval(interval);
    }
  }, 40);
}

// -------------------------
// FAQ Toggle
// -------------------------
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('active');

    document.querySelectorAll('.faq-question').forEach(b => {
      if (b !== btn) b.classList.remove('active');
    });
    document.querySelectorAll('.faq-answer').forEach(a => {
      if (a !== answer) a.style.maxHeight = null;
    });

    if (!isOpen) {
      btn.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      btn.classList.remove('active');
      answer.style.maxHeight = null;
    }
  });
});

// -------------------------
// Mobile Navbar
// -------------------------
document.addEventListener("click", function (e) {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  if (!navLinks || !hamburger) return;

  if (navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});
// -------------------------
// Accessibility Features (FINAL CLEAN VERSION)
// -------------------------
function initAccessibility() {
  const btn = document.getElementById("accessibility-btn");
  const panel = document.getElementById("accessibility-panel");

  if (!btn || !panel) {
    return console.error("Accessibility elements missing!");
  }

  // -------------------------
  // STATE (single source of truth)
  // -------------------------
  let state = {
    scale: parseFloat(localStorage.getItem("fontScale")) || 1,
    contrast: localStorage.getItem("contrast") === "1",
    grayscale: localStorage.getItem("grayscale") === "1",
    underline: localStorage.getItem("underline") === "1",
    dark: localStorage.getItem("dark") === "1",
    reading: localStorage.getItem("reading") === "1",
    focus: localStorage.getItem("focus") === "1",
    dyslexia: localStorage.getItem("dyslexia") === "1",
    spacing: localStorage.getItem("spacing") === "1",
    motion: localStorage.getItem("motion") === "1",
  };

  window.accessibilityState = state;

  // -------------------------
  // ONLY TOGGLE BUTTONS (IMPORTANT FIX)
  // action buttons are NOT included here
  // -------------------------
  const buttonMap = {
    contrast: "toggle-contrast",
    grayscale: "toggle-grayscale",
    dark: "toggle-dark-mode",
    underline: "underline-links",
    reading: "toggle-reading-mode",
    focus: "toggle-focus",
    dyslexia: "toggle-dyslexia",
    spacing: "increase-spacing",
    motion: "toggle-motion",
  };

  // -------------------------
  // UPDATE ACTIVE BUTTONS (FIXED RELIABILITY)
  // -------------------------
  const updateActiveButtons = () => {
    Object.entries(buttonMap).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (state[key]) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  };

  // -------------------------
  // APPLY STATE → DOM
  // -------------------------
  const applyState = () => {
    document.documentElement.style.fontSize = `${16 * state.scale}px`;

    document.body.classList.remove(
      "high-contrast",
      "grayscale",
      "dark-mode",
      "underline-links",
      "reading-mode",
      "focus-mode",
      "dyslexia-mode",
      "spacing-mode",
      "reduce-motion"
    );

    if (state.contrast) document.body.classList.add("high-contrast");
    if (state.dark) document.body.classList.add("dark-mode");
    if (state.grayscale) document.body.classList.add("grayscale");

    if (state.underline) document.body.classList.add("underline-links");
    if (state.reading) document.body.classList.add("reading-mode");
    if (state.focus) document.body.classList.add("focus-mode");
    if (state.dyslexia) document.body.classList.add("dyslexia-mode");
    if (state.spacing) document.body.classList.add("spacing-mode");

    // motion
    if (state.motion) {
      document.body.classList.add("reduce-motion");
      document.querySelectorAll("video").forEach(v => v.pause());
    }

    updateLogos();
    updateActiveButtons();
  };

  // -------------------------
  // SAVE STATE
  // -------------------------
  const saveState = () => {
    localStorage.setItem("fontScale", state.scale);
    localStorage.setItem("contrast", state.contrast ? "1" : "0");
    localStorage.setItem("grayscale", state.grayscale ? "1" : "0");
    localStorage.setItem("underline", state.underline ? "1" : "0");
    localStorage.setItem("dark", state.dark ? "1" : "0");
    localStorage.setItem("reading", state.reading ? "1" : "0");
    localStorage.setItem("focus", state.focus ? "1" : "0");
    localStorage.setItem("dyslexia", state.dyslexia ? "1" : "0");
    localStorage.setItem("spacing", state.spacing ? "1" : "0");
    localStorage.setItem("motion", state.motion ? "1" : "0");
  };

  // initial render
  applyState();

  // -------------------------
  // PANEL CONTROL
  // -------------------------
  const openPanel = () => {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
  };

  const closePanel = () => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.contains("open") ? closePanel() : openPanel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });

  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      closePanel();
    }
  });

  // -------------------------
  // TEXT SIZE (ACTION BUTTONS - NO ACTIVE STATE EXPECTED)
  // -------------------------
  document.getElementById("increase-text")?.addEventListener("click", () => {
    state.scale = Math.min(1.6, state.scale + 0.1);
    saveState();
    applyState();
  });

  document.getElementById("decrease-text")?.addEventListener("click", () => {
    state.scale = Math.max(0.8, state.scale - 0.1);
    saveState();
    applyState();
  });

  // -------------------------
  // TOGGLE SYSTEM
  // -------------------------
  const toggle = (key) => {
    if (!(key in state)) return;

    const visualModes = ["contrast", "dark", "grayscale"];

    if (visualModes.includes(key)) {
      const enable = !state[key];

      visualModes.forEach(m => (state[m] = false));
      if (enable) state[key] = true;
    } else {
      state[key] = !state[key];
    }

    saveState();
    applyState();
  };

  // -------------------------
  // TOGGLE EVENTS
  // -------------------------
  Object.entries(buttonMap).forEach(([key, id]) => {
    document.getElementById(id)?.addEventListener("click", () => {
      toggle(key);
    });
  });

  // -------------------------
  // RESET (ACTION BUTTON - NO ACTIVE STATE)
  // -------------------------
  document.getElementById("reset-accessibility")?.addEventListener("click", () => {
    state = {
      scale: 1,
      contrast: false,
      grayscale: false,
      underline: false,
      dark: false,
      reading: false,
      focus: false,
      dyslexia: false,
      spacing: false,
      motion: false,
    };

    localStorage.clear();
    applyState();
  });

  // -------------------------
  // LOGOS
  // -------------------------
  function updateLogos() {
    const headerLogo = document.getElementById("site-logo");
    const footerLogo = document.getElementById("site-footer-logo");

    if (!headerLogo || !footerLogo) return;

    const active = state.dark || state.contrast;

    headerLogo.src = active
      ? "/assets/goldLogoSmall.webp"
      : "/assets/logoTransparent.webp";

    footerLogo.src = active
      ? "/assets/logoGoldHorizontal.webp"
      : "/assets/logoBlackHorizontal.webp";
  }

  // -------------------------
  // TEXT TO SPEECH (ACTION BUTTONS)
  // -------------------------
  document.getElementById("read-page")?.addEventListener("click", () => {
    const speech = new SpeechSynthesisUtterance(document.body.innerText);
    speech.lang = "he-IL";
    speech.rate = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  });

  document.getElementById("stop-read")?.addEventListener("click", () => {
    window.speechSynthesis.cancel();
  });
}

// expose globally
window.initAccessibility = initAccessibility;