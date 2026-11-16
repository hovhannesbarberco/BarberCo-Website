/* Hovhannes Barber & Co: shared page behaviour */
(function () {
  "use strict";

  var C = window.HBC_CONFIG || {};
  var root = document.documentElement;

  function isHttpUrl(value) {
    return typeof value === "string" && /^https?:\/\//i.test(value.trim());
  }
  window.HBC_isHttpUrl = isHttpUrl;

  /* Header: solid background once the page scrolls */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile navigation */
  var toggle = document.querySelector(".menu-toggle");
  var panel = document.getElementById("mobile-nav");
  function setNav(open) {
    root.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setNav(!root.classList.contains("nav-open"));
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("nav-open")) {
        setNav(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (mq) {
      if (mq.matches) setNav(false);
    });
  }

  /* General "Book" buttons: go straight to Square once BOOKING_URL is set,
     otherwise they keep their default link to the services page. */
  if (isHttpUrl(C.BOOKING_URL)) {
    document.querySelectorAll("[data-book]").forEach(function (a) {
      a.href = C.BOOKING_URL.trim();
      a.target = "_blank";
      a.rel = "noopener";
      if (!a.querySelector(".sr-only")) {
        var s = document.createElement("span");
        s.className = "sr-only";
        s.textContent = " (opens in a new tab)";
        a.appendChild(s);
      }
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Scroll reveal (CSS only hides elements when motion is allowed and JS runs) */
  var observer = null;
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  }
  function reveal(scope) {
    (scope || document).querySelectorAll("[data-reveal]:not(.is-in)").forEach(function (el) {
      if (observer) observer.observe(el);
      else el.classList.add("is-in");
    });
  }
  window.HBC_reveal = reveal;
  reveal();
})();
