/* app.js — Platinum Partners */
(function () {
  "use strict";

  /* ===== THEME TOGGLE ===== */
  var toggle = document.querySelector("[data-theme-toggle]");
  var root = document.documentElement;
  var theme = root.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.setAttribute("data-theme", theme);
  updateToggleIcon();

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
    toggle.innerHTML = theme === "dark"
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", theme);
      updateToggleIcon();
    });
  }

  /* ===== MOBILE MENU ===== */
  var menuBtn = document.querySelector(".mobile-menu-btn");
  var nav = document.getElementById("mainNav");
  var overlay = document.createElement("div");
  overlay.className = "mobile-overlay";
  document.body.appendChild(overlay);

  function openMenu() {
    nav.classList.add("open");
    overlay.classList.add("visible");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  function closeMenu() {
    nav.classList.remove("open");
    overlay.classList.remove("visible");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var isOpen = nav.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  overlay.addEventListener("click", closeMenu);

  /* Close menu on nav link click */
  var navLinks = nav ? nav.querySelectorAll("a") : [];
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* ===== HEADER SCROLL STATE ===== */
  var header = document.getElementById("header");
  var lastScroll = 0;

  function onScroll() {
    var scrollY = window.scrollY;
    if (header) {
      if (scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    lastScroll = scrollY;
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ===== ACTIVE NAV HIGHLIGHT ===== */
  var sections = document.querySelectorAll("section[id]");
  var navItems = document.querySelectorAll(".main-nav a");

  function highlightNav() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(function (item) {
          item.classList.remove("active");
          if (item.getAttribute("href") === "#" + id) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

  /* ===== CONTACT FORM ===== */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var wrap = contactForm.parentElement;
      wrap.innerHTML =
        '<div class="form-success">' +
          '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
          '<h3>Message Sent!</h3>' +
          '<p>Thank you for reaching out. We\'ll be in touch within 24 hours.</p>' +
        '</div>';
    });
  }

  /* ===== GALLERY LIGHTBOX ===== */
  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector("img");
  var lightboxClose = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target === lightboxClose) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLightbox();
      closeMenu();
    }
  });

  /* ===== FALLBACK FOR SCROLL ANIMATIONS ===== */
  /* Use IntersectionObserver for scroll reveal in all browsers */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  document.querySelectorAll(".fade-in").forEach(function (el) {
    observer.observe(el);
  });
})();
