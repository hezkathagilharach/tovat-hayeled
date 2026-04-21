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
// Accessibility Features
// -------------------------
function initAccessibility() {
  const btn = document.getElementById("accessibility-btn");
  const panel = document.getElementById("accessibility-panel");

  if (!btn || !panel) return console.error("Accessibility elements missing!");

  let currentScale = 1;

  const setFontSize = () => document.documentElement.style.fontSize = `${16 * currentScale}px`;

  btn.addEventListener("click", e => {
    e.stopPropagation();
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  });

  document.addEventListener("click", e => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.style.display = "none";
    }
  });

  document.getElementById("increase-text")?.addEventListener("click", () => {
    currentScale += 0.1;
    setFontSize();
  });

  document.getElementById("decrease-text")?.addEventListener("click", () => {
    currentScale = Math.max(0.5, currentScale - 0.1);
    setFontSize();
  });

  document.getElementById("toggle-contrast")?.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
    updateLogos();
  });

  document.getElementById("toggle-grayscale")?.addEventListener("click", () => {
    document.body.classList.toggle("grayscale");
  });

  document.getElementById("underline-links")?.addEventListener("click", () => {
    document.body.classList.toggle("underline-links");
  });

  document.getElementById("reset-accessibility")?.addEventListener("click", () => {
    currentScale = 1;
    setFontSize();
    document.body.classList.remove("high-contrast", "grayscale", "underline-links");
    updateLogos();
  });

  function updateLogos() {
    const headerLogo = document.getElementById("site-logo");
    const footerLogo = document.getElementById("site-footer-logo");

    if (!headerLogo || !footerLogo) return;

    if (document.body.classList.contains("high-contrast")) {
      headerLogo.src = "/tovat-hayeled/assets/goldLogoSmall.png";
      footerLogo.src = "/tovat-hayeled/assets/logoGoldHorizontal.png";
    } else {
      headerLogo.src = "/tovat-hayeled/assets/logoTransparent.png";
      footerLogo.src = "/tovat-hayeled/assets/logoBlackHorizontal.png";
    }
  }
}

// Expose globally if needed
window.initAccessibility = initAccessibility;