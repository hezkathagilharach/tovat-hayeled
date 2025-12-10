// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // offset for navbar
        behavior: 'smooth'
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Trigger typewriter only once for the typewriter paragraph
          if (entry.target.id === "typewriter" && !entry.target.dataset.typed) {
            typeWriter(entry.target);
          }
        }
      });
    },
    { threshold: 0.1 } // reveal faster, 10% visibility
  );

  revealElements.forEach(el => observer.observe(el));
});

  //typing ...
function typeWriter(container) {
  // Prevent re-triggering
  if (container.dataset.typed) return;
  container.dataset.typed = true;

  // Sentences
  const sentence1 = "וללא הבחנה בין הורה נורמטיבי להורה אלים ונרקיסיסט,";
  const sentence2 = "האם זוהי טובת הילד?";

  // Clear the container
  container.textContent = "";

  let i = 0;                     // Character index
  let currentSentence = sentence1;
  let redSpan;                    // For highlighted second sentence

  const interval = setInterval(() => {
    if (currentSentence === sentence1) {
      // Typing first sentence
      if (i < sentence1.length) {
        container.textContent += sentence1.charAt(i);
        i++;
      } else {
        // Finished first sentence
        const br = document.createElement("br");
        container.appendChild(br);

        // Prepare red span for second sentence
        redSpan = document.createElement("span");
        redSpan.classList.add("red-text");
        container.appendChild(redSpan);

        // Switch to second sentence
        currentSentence = sentence2;
        i = 0;
      }
    } else if (currentSentence === sentence2) {
      // Typing second sentence into red span
      if (i < sentence2.length) {
        redSpan.textContent += sentence2.charAt(i);
        i++;
      } else {
        // Finished typing
        clearInterval(interval);
      }
    }
  }, 40);
}



// FAQ expand/collapse
// Clean FAQ toggle with arrow rotation
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-question').forEach(b => {
      if (b !== btn) b.classList.remove('active');
    });
    document.querySelectorAll('.faq-answer').forEach(a => {
      if (a !== answer) a.style.maxHeight = null;
    });

    // Toggle current item
    if (isOpen) {
      btn.classList.remove('active');
      answer.style.maxHeight = null;
    } else {
      btn.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});


// navbar mobile
// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  if (!navLinks || !hamburger) return;

  // If menu is open AND click is outside both navbar and hamburger → close
  if (navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});



//Accessibility 
// Initialize accessibility features
function initAccessibility() {
  const btn = document.getElementById("accessibility-btn");
  const panel = document.getElementById("accessibility-panel");

  if (!btn || !panel) {
    console.error("Accessibility elements missing!");
    return;
  }

  // Toggle panel
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  });

  // Close panel when clicking outside
  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.style.display = "none";
    }
  });

  // Accessibility functions
  let currentScale = 1;

  document.getElementById("increase-text").addEventListener("click", () => {
    currentScale += 0.1;
    document.documentElement.style.fontSize = `${16 * currentScale}px`;
  });

  document.getElementById("decrease-text").addEventListener("click", () => {
    currentScale = Math.max(0.5, currentScale - 0.1);
    document.documentElement.style.fontSize = `${16 * currentScale}px`;
  });

  document.getElementById("toggle-contrast").addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
     updateLogos();
  });

  document.getElementById("toggle-grayscale").addEventListener("click", () => {
    document.body.classList.toggle("grayscale");
  });

  document.getElementById("underline-links").addEventListener("click", () => {
    document.body.classList.toggle("underline-links");
  });

 document.getElementById("reset-accessibility").addEventListener("click", () => {
  currentScale = 1;
  document.documentElement.style.fontSize = "16px";
  document.body.classList.remove("high-contrast", "grayscale", "underline-links");

  // Revert logos to original
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





