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

  /* Same-page links (#menu, #about, category chips, skip link): scroll to the
     section without adding "#..." to the address bar. */
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    /* "Book now" from another page goes to /services: ask that page to open
       at the menu (services.js reads this), keeping the URL clean. */
    if (e.target.closest('a[data-book][href="/services"]')) {
      try { sessionStorage.setItem("hbc:show-menu", "1"); } catch (err) { /* storage blocked: page opens at the top */ }
      return;
    }

    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    /* "#menu" means the start of the services list: land on the first category
       (Haircuts), just below the sticky category bar. */
    var scrollTarget = (id === "menu" && target.querySelector(".menu-cat[id]")) || target;
    scrollTarget.scrollIntoView();
    if (!target.matches("a[href], button, input, select, textarea, [tabindex]")) {
      target.setAttribute("tabindex", "-1");
    }
    target.focus({ preventScroll: true });
  });

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Scroll reveal (CSS only hides elements when motion is allowed and JS runs).
     An element starts sliding up as soon as its top edge is on screen, so it
     arrives while the visitor watches instead of fading in after it is already
     showing. Elements that come in together are staggered in page order, which
     also works on phones where the grid is one column. */
  var observer = null;
  function settle(el) {
    // Done: hand the element back to its normal styles (and hover transitions).
    el.classList.add("is-in");
    el.removeAttribute("data-reveal");
    el.style.removeProperty("--d");
  }
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (entry) {
        var el = entry.target;
        if (entry.isIntersecting) {
          el.style.setProperty("--d", Math.min(n++, 4) * 0.07 + "s");
          el.addEventListener("transitionend", function end(e) {
            if (e.target !== el || e.propertyName !== "opacity") return;
            el.removeEventListener("transitionend", end);
            settle(el);
          });
          el.classList.add("is-in");
        } else if (entry.boundingClientRect.top < 0) {
          settle(el); // already above the screen (e.g. after a jump link): just show it
        } else {
          return; // still below the screen
        }
        observer.unobserve(el);
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0 });
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
