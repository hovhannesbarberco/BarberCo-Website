/* Hovhannes Barber & Co: service menu, rendered from data/services.json
   (written from Square), falling back to data/services.sample.json. */
(function () {
  "use strict";

  var C = window.HBC_CONFIG || {};
  var isHttpUrl = window.HBC_isHttpUrl || function (v) { return typeof v === "string" && /^https?:\/\//i.test(v.trim()); };
  var reveal = window.HBC_reveal || function () {};

  var featuredEl = document.getElementById("featured-services");
  var menuEl = document.getElementById("menu");
  var catNavEl = document.getElementById("cat-nav-list");
  if (!featuredEl && !menuEl) return;

  /* ---------- Data ---------- */

  function fetchJson(url) {
    return fetch(url, { cache: "no-cache" }).then(function (res) {
      if (!res.ok) throw new Error(url + " " + res.status);
      return res.json();
    });
  }

  var UNCATEGORIZED = "More Services";

  function normalize(raw) {
    var list = Array.isArray(raw) ? raw : raw && Array.isArray(raw.services) ? raw.services : [];
    var items = list
      .filter(function (s) { return s && typeof s.name === "string" && s.name.trim(); })
      .map(function (s, i) {
        var cat = typeof s.category === "string" ? s.category.trim() : "";
        return {
          order: i,
          uncategorized: !cat,
          name: s.name.trim(),
          category: cat || UNCATEGORIZED,
          price: s.price,
          priceNote: typeof s.priceNote === "string" ? s.priceNote.trim() : "",
          duration: Number(s.durationMinutes) || 0,
          description: typeof s.description === "string" ? s.description.trim() : "",
          bookingUrl: isHttpUrl(s.bookingUrl) ? s.bookingUrl.trim() : "",
          image: isImageBase(s.image) ? s.image.trim() : "",
          featured: s.featured === true
        };
      });
    // Services without a category go last, under "More Services" (or "Services" if none have one).
    var anyCategorized = items.some(function (s) { return !s.uncategorized; });
    if (!anyCategorized) items.forEach(function (s) { s.category = "Services"; });
    return items.sort(function (a, b) {
      return (a.uncategorized - b.uncategorized) || (a.order - b.order);
    });
  }

  function loadServices() {
    return fetchJson(C.SERVICES_URL || "data/services.json")
      .then(function (data) {
        var list = normalize(data);
        if (!list.length) throw new Error("services.json is empty");
        return list;
      })
      .catch(function () {
        return fetchJson(C.SERVICES_FALLBACK_URL || "data/services.sample.json").then(normalize);
      });
  }

  /* ---------- Formatting ---------- */

  function formatPrice(p) {
    if (p === null || p === undefined || p === "") return "";
    if (typeof p === "number" && isFinite(p)) return "$" + (Number.isInteger(p) ? p : p.toFixed(2));
    var s = String(p).trim();
    if (/^\d/.test(s)) return "$" + s;
    return s;
  }

  function priceParts(s) {
    var price = formatPrice(s.price);
    var note = s.priceNote;
    if (note === "+" || note === "and up" || note === "& up") return { price: price ? price + "+" : "", note: "" };
    return { price: price, note: note };
  }

  function formatDuration(m) {
    if (!m) return "";
    var h = Math.floor(m / 60), r = m % 60;
    if (!h) return r + " min";
    return r ? h + " hr " + r + " min" : h + " hr";
  }

  function slugify(s) {
    return "cat-" + s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function groupByCategory(list) {
    var order = [], map = {};
    list.forEach(function (s) {
      if (!map[s.category]) { map[s.category] = []; order.push(s.category); }
      map[s.category].push(s);
    });
    return order.map(function (name) { return { name: name, id: slugify(name), items: map[name] }; });
  }

  /* ---------- DOM helpers (textContent only; never innerHTML with data) ---------- */

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null && text !== "") node.textContent = text;
    return node;
  }

  var SVG_NS = "http://www.w3.org/2000/svg";
  function icon(paths, viewBox) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", viewBox || "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    paths.forEach(function (d) {
      var p = document.createElementNS(SVG_NS, "path");
      p.setAttribute("d", d);
      svg.appendChild(p);
    });
    return svg;
  }
  function arrowIcon() { return icon(["M4 12h15", "M13 6l6 6-6 6"]); }
  function clockIcon() { return icon(["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7.5V12l3 2"]); }

  function bookLink(s, cls, label) {
    var a = el("a", cls);
    var url = s.bookingUrl || (isHttpUrl(C.BOOKING_URL) ? C.BOOKING_URL.trim() : "");
    a.appendChild(document.createTextNode(label));
    a.appendChild(el("span", "sr-only", " " + s.name + (url ? " (opens in a new tab)" : "")));
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      // TODO: no Square link yet for this service (set bookingUrl in data/services.json
      // or BOOKING_URL in assets/js/config.js).
      a.href = "#";
      a.setAttribute("aria-disabled", "true");
      a.title = "Online booking link coming soon";
      a.addEventListener("click", function (e) { e.preventDefault(); });
    }
    a.appendChild(arrowIcon());
    return a;
  }

  /* ---------- Service illustrations ---------- */

  // "image" in services.json is a relative base path without size/extension,
  // e.g. "assets/img/services/fade-taper-haircut" -> -480.webp / -960.webp.
  function isImageBase(v) {
    return typeof v === "string" && /^[a-z0-9][a-z0-9/_-]*$/i.test(v.trim()) && v.indexOf("..") === -1;
  }

  // Returns a wrapper with a responsive <img>, or null when the service has no image.
  // If the file fails to load, the wrapper removes itself and the host falls back to
  // its text-only layout (the "has-media" class is dropped).
  function serviceMedia(s, cls, sizes, host) {
    if (!s.image) return null;
    var wrap = el("div", cls);
    var img = document.createElement("img");
    img.src = s.image + "-480.webp";
    img.srcset = s.image + "-480.webp 480w, " + s.image + "-960.webp 960w";
    img.sizes = sizes;
    img.width = 480;
    img.height = 480;
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = s.name + " illustration";
    img.addEventListener("error", function () {
      host.classList.remove("has-media");
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    });
    wrap.appendChild(img);
    host.classList.add("has-media");
    return wrap;
  }

  /* ---------- Home: menu preview ---------- */

  function renderFeatured(list) {
    var count = Number(C.FEATURED_COUNT) || 6;
    var flagged = list.filter(function (s) { return s.featured; });
    var picks = (flagged.length ? flagged.concat(list.filter(function (s) { return !s.featured; })) : list).slice(0, count);

    var frag = document.createDocumentFragment();
    picks.forEach(function (s, i) {
      var parts = priceParts(s);
      var li = el("li", "menu-item");
      li.setAttribute("data-reveal", "");
      li.style.setProperty("--d", (i % 2) * 0.08 + "s");

      var thumb = serviceMedia(s, "menu-item__media", "(min-width: 768px) 64px, 52px", li);
      if (thumb) li.appendChild(thumb);

      var top = el("div", "menu-item__top");
      top.appendChild(el("h3", "menu-item__name", s.name));
      var leader = el("span", "menu-item__leader");
      leader.setAttribute("aria-hidden", "true");
      top.appendChild(leader);
      top.appendChild(el("span", "menu-item__price", parts.price));
      li.appendChild(top);

      var meta = el("div", "menu-item__meta");
      var info = [formatDuration(s.duration), parts.note].filter(Boolean).join(" · ");
      meta.appendChild(el("span", "menu-item__dur", info));
      meta.appendChild(bookLink(s, "menu-item__book", "Book"));
      li.appendChild(meta);

      frag.appendChild(li);
    });
    featuredEl.replaceChildren(frag);
    featuredEl.removeAttribute("aria-busy");
    reveal(featuredEl);
  }

  /* ---------- Services page: full menu ---------- */

  function renderCard(s, i) {
    var parts = priceParts(s);
    var card = el("article", "card");
    card.setAttribute("data-reveal", "");
    card.style.setProperty("--d", (i % 3) * 0.08 + "s");

    // Desktop/tablet: medallion panel across the top of the card.
    // Mobile: round thumbnail beside the name, price and duration.
    var media = serviceMedia(s, "card__media", "(min-width: 1200px) 240px, (min-width: 768px) 30vw, 96px", card);
    if (media) card.appendChild(media);

    var top = el("div", "card__top");
    top.appendChild(el("h3", "card__name", s.name));
    var price = el("div", "card__price", parts.price);
    if (parts.note) price.appendChild(el("span", "card__note", parts.note));
    top.appendChild(price);
    card.appendChild(top);

    var rule = el("div", "card__rule");
    rule.setAttribute("aria-hidden", "true");
    card.appendChild(rule);

    if (s.duration) {
      var meta = el("p", "card__meta");
      meta.appendChild(clockIcon());
      meta.appendChild(document.createTextNode(formatDuration(s.duration)));
      card.appendChild(meta);
    }

    card.appendChild(el("p", "card__desc", s.description));

    var actions = el("div", "card__actions");
    actions.appendChild(bookLink(s, "btn btn--green btn--block", "Book this service"));
    card.appendChild(actions);
    return card;
  }

  function renderMenu(list) {
    var groups = groupByCategory(list);
    var frag = document.createDocumentFragment();
    var navFrag = document.createDocumentFragment();

    groups.forEach(function (g) {
      var section = el("section", "menu-cat");
      section.id = g.id;
      section.setAttribute("aria-labelledby", g.id + "-title");

      var head = el("div", "menu-cat__head");
      head.setAttribute("data-reveal", "");
      var h2 = el("h2", "", g.name);
      h2.id = g.id + "-title";
      head.appendChild(h2);
      var n = g.items.length;
      head.appendChild(el("span", "menu-cat__count", (n < 10 ? "0" + n : n) + (n === 1 ? " service" : " services")));
      section.appendChild(head);

      var grid = el("div", "cards");
      g.items.forEach(function (s, i) { grid.appendChild(renderCard(s, i)); });
      section.appendChild(grid);
      frag.appendChild(section);

      if (catNavEl) {
        var li = el("li");
        var a = el("a", "chip", g.name);
        a.href = "#" + g.id;
        li.appendChild(a);
        navFrag.appendChild(li);
      }
    });

    menuEl.replaceChildren(frag);
    menuEl.removeAttribute("aria-busy");
    if (catNavEl) {
      catNavEl.replaceChildren(navFrag);
      catNavEl.closest(".cat-nav").hidden = groups.length < 2;
      trackActiveCategory(groups);
    }
    reveal(menuEl);
  }

  function trackActiveCategory(groups) {
    if (!("IntersectionObserver" in window) || groups.length < 2) return;
    var chips = {};
    catNavEl.querySelectorAll(".chip").forEach(function (c) { chips[c.getAttribute("href").slice(1)] = c; });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var current = null;
      groups.some(function (g) { if (visible[g.id]) { current = g.id; return true; } return false; });
      Object.keys(chips).forEach(function (id) {
        var on = id === current;
        chips[id].classList.toggle("is-active", on);
        if (on) chips[id].setAttribute("aria-current", "true"); else chips[id].removeAttribute("aria-current");
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    groups.forEach(function (g) { io.observe(document.getElementById(g.id)); });
  }

  function renderError(target) {
    var box = el(target.tagName === "UL" ? "li" : "div", "load-error");
    box.appendChild(el("p", "", "The service menu couldn't be loaded right now."));
    var a = el("a", "btn btn--green");
    a.textContent = "Book online";
    a.href = isHttpUrl(C.BOOKING_URL) ? C.BOOKING_URL : "services.html";
    box.appendChild(a);
    target.replaceChildren(box);
    target.removeAttribute("aria-busy");
  }

  loadServices()
    .then(function (list) {
      if (!list.length) throw new Error("No services");
      if (featuredEl) renderFeatured(list);
      if (menuEl) renderMenu(list);
    })
    .catch(function () {
      if (featuredEl) renderError(featuredEl);
      if (menuEl) renderError(menuEl);
    });
})();
