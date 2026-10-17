/* =========================================
   DIVYA DHARA — INTERACTIONS & LOGIC
========================================= */

"use strict";

// Helper functions for DOM Selection
const $ = (selector, root = document) => root.querySelector(selector); const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* =========================================
   1. SPLASH SCREEN & TOAST NOTIFICATION
========================================= */

// Smoothly hide splash screen after initial load
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = $("#splashScreen");
    if (splash) {
      splash.classList.add("hidden");
    }
  }, 800);
});

// Toast notification helper
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Copy text to clipboard helper
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    showToast("Sandesh copy ho gaya 🙏");
  } catch (err) {
    showToast("Copy nahi ho saka.");
  }
}

/* =========================================
   2. FULL ARTICLE READING MODAL
========================================= */

const articleModal = $("#articleModal");
const modalClose = $("#modalClose");
const modalTitle = $("#modalTitle");
const modalMeta = $("#modalMeta");
const modalIntro = $("#modalIntro");
const modalBody = $("#modalBody");
const modalCopy = $("#modalCopy");

let currentArticleId = null;

// Function to open full article in popup
function openArticle(id) {
  // Read article data from central data.js file
  if (typeof contentData === "undefined" || !contentData.articles[id]) {
    showToast("Yeh article abhi uplabdh nahi hai.");
    return;
  }

  const article = contentData.articles[id];
  currentArticleId = id;

  modalTitle.textContent = article.title;
  modalMeta.textContent = `${article.category} · ${article.duration}`;
  modalIntro.textContent = article.intro;
  modalBody.replaceChildren();

  // Dynamically build paragraphs and headings
  article.paragraphs.forEach(section => {
    const heading = document.createElement("h3");
    heading.textContent = section.heading;

    const paragraph = document.createElement("p");
    paragraph.textContent = section.text;

    modalBody.append(heading, paragraph);
  });

  if (articleModal) {
    articleModal.hidden = false;
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
}

// Function to close modal
function closeArticle() {
  if (articleModal && !articleModal.hidden) {
    articleModal.hidden = true;
    document.body.style.overflow = ""; // Restore background scrolling
  }
}

/* Event Listeners for Opening/Closing Articles */
document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-open-article]");
  if (openBtn) {
    e.preventDefault();
    openArticle(openBtn.dataset.openArticle);
  }
});

if (modalClose) {
  modalClose.addEventListener("click", closeArticle);
}

if (articleModal) {
  articleModal.addEventListener("click", (e) => {
    if (e.target === articleModal) {
      closeArticle();
    }
  });
}

if (modalCopy) {
  modalCopy.addEventListener("click", async () => {
    if (typeof contentData !== "undefined" && currentArticleId) {
      const article = contentData.articles[currentArticleId];
      if (article) {
        const fullText = `${article.title}\n\n${article.intro}\n\n— Divya Dhara`;
        await copyText(fullText);
      }
    }
  });
}

// Close modal or search on Escape key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeArticle();
  }
});

/* =========================================
   MOBILE HAMBURGER TOGGLE LOGIC
========================================= */
const menuToggle = document.getElementById("menuToggle");
const desktopNav = document.getElementById("desktopNav");

if (menuToggle && desktopNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    menuToggle.classList.toggle("active");
    desktopNav.classList.toggle("mobile-open");
  });

  // Close mobile nav when clicking outside
  document.addEventListener("click", (event) => {
    if (!menuToggle.contains(event.target) && !desktopNav.contains(event.target)) {
      menuToggle.classList.remove("active");
      desktopNav.classList.remove("mobile-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}