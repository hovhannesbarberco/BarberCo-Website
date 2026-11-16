/* ==========================================================================
   FONT LAB: DEV ONLY. Lets you try font pairings live on the site.
   - Runs only on localhost / 127.0.0.1 (exits immediately anywhere else).
   - Saves your choice in localStorage ("hbc-font-lab") across pages.
   - Also renders the side-by-side specimens on fonts.html.
   TO REMOVE BEFORE LAUNCH: delete this file, fonts.html, and the
   "Font Lab" <script> loader in the <head> of index.html and services.html.
   Then copy the chosen pairing's values into :root in assets/css/styles.css
   and its font <link> into each page.
   ========================================================================== */
(function () {
  "use strict";

  var host = location.hostname;
  if (host !== "localhost" && host !== "127.0.0.1") return;

  var KEY = "hbc-font-lab";
  var GF = "https://fonts.googleapis.com/css2?";
  var FS = "https://api.fontshare.com/v2/css?";

  /* Every font below is free for commercial web use:
     Google Fonts = SIL Open Font License; Fontshare = ITF Free Font License.
     Note: Fontshare's CSS API only serves the FIRST family per request, so each
     Fontshare family gets its own stylesheet URL (href may be a string or an array). */
  var PAIRINGS = [
    {
      id: "current",
      name: "Current (Cinzel/Jost)",
      direction: "Roman inscriptional caps + geometric sans",
      display: "Cinzel", body: "Jost", license: "Google Fonts · OFL",
      families: ["Cinzel", "Jost"],
      href: GF + "family=Cinzel:wght@400..700&family=Jost:wght@300..600&display=swap",
      sample: { transform: "none" },
      vars: {}
    },
    {
      id: "oswald-inter",
      name: "Condensed Classic",
      direction: "Bold condensed grotesk (reference-site style)",
      display: "Oswald", body: "Inter", license: "Google Fonts · OFL",
      families: ["Oswald", "Inter"],
      href: GF + "family=Oswald:wght@400..700&family=Inter:wght@300..600&display=swap",
      sample: { transform: "uppercase" },
      vars: {
        "--font-display": '"Oswald", "Arial Narrow", sans-serif',
        "--font-sans": '"Inter", system-ui, sans-serif',
        "--display-weight": "600", "--display-weight-strong": "600",
        "--display-case": "uppercase", "--display-tracking": "0.015em", "--display-tracking-wide": "0.04em",
        "--display-leading": "1.06", "--display-scale": "1.24",
        "--name-case": "uppercase", "--name-tracking": "0.03em", "--name-scale": "1.1", "--price-weight": "500"
      }
    },
    {
      id: "tanker-satoshi",
      name: "Poster Condensed",
      direction: "Heavy condensed display, signage energy",
      display: "Tanker", body: "Satoshi", license: "Fontshare · ITF Free Font License",
      families: ["Tanker", "Satoshi"],
      href: [FS + "f[]=tanker@400&display=swap", FS + "f[]=satoshi@300,400,500,700&display=swap"],
      sample: { transform: "uppercase" },
      vars: {
        "--font-display": '"Tanker", Impact, sans-serif',
        "--font-sans": '"Satoshi", system-ui, sans-serif',
        "--display-weight": "400", "--display-weight-strong": "400",
        "--display-case": "uppercase", "--display-tracking": "0.02em", "--display-tracking-wide": "0.035em",
        "--display-leading": "1.0", "--display-scale": "1.3",
        "--name-case": "uppercase", "--name-tracking": "0.035em", "--name-scale": "1.12", "--price-weight": "400"
      }
    },
    {
      id: "clash-general",
      name: "Modern Luxury Sans",
      direction: "Contemporary display grotesk + neutral sans",
      display: "Clash Display", body: "General Sans", license: "Fontshare · ITF Free Font License",
      families: ["Clash Display", "General Sans"],
      href: [FS + "f[]=clash-display@500,600&display=swap", FS + "f[]=general-sans@300,400,500,600&display=swap"],
      sample: { transform: "none" },
      vars: {
        "--font-display": '"Clash Display", system-ui, sans-serif',
        "--font-sans": '"General Sans", system-ui, sans-serif',
        "--display-weight": "500", "--display-weight-strong": "600",
        "--display-case": "none", "--display-tracking": "0em", "--display-tracking-wide": "0.005em",
        "--display-leading": "1.08", "--display-scale": "1.12",
        "--name-case": "none", "--name-tracking": "0em", "--name-scale": "1.05", "--price-weight": "600"
      }
    },
    {
      id: "archivo-wide",
      name: "Wide Display",
      direction: "Extended uppercase grotesk, automotive-luxury feel",
      display: "Archivo Expanded", body: "Archivo", license: "Google Fonts · OFL",
      families: ["Archivo"],
      href: GF + "family=Archivo:wdth,wght@62..125,100..900&display=swap",
      sample: { transform: "uppercase", stretch: "125%" },
      vars: {
        "--font-display": '"Archivo", system-ui, sans-serif',
        "--font-sans": '"Archivo", system-ui, sans-serif',
        "--display-weight": "700", "--display-weight-strong": "700", "--display-stretch": "125%",
        "--display-case": "uppercase", "--display-tracking": "0.01em", "--display-tracking-wide": "0.03em",
        "--display-leading": "1.08", "--display-scale": "0.92",
        "--name-case": "uppercase", "--name-tracking": "0.02em", "--name-scale": "0.86", "--price-weight": "700"
      }
    },
    {
      id: "zodiak-switzer",
      name: "Sharp Modern Serif",
      direction: "High-contrast serif + Swiss grotesk",
      display: "Zodiak", body: "Switzer", license: "Fontshare · ITF Free Font License",
      families: ["Zodiak", "Switzer"],
      href: [FS + "f[]=zodiak@400,500,600,700&display=swap", FS + "f[]=switzer@300,400,500,600&display=swap"],
      sample: { transform: "none" },
      vars: {
        "--font-display": '"Zodiak", Georgia, serif',
        "--font-sans": '"Switzer", system-ui, sans-serif',
        "--display-weight": "500", "--display-weight-strong": "600",
        "--display-case": "none", "--display-tracking": "-0.01em", "--display-tracking-wide": "0em",
        "--display-leading": "1.08", "--display-scale": "1.12",
        "--name-case": "none", "--name-tracking": "0em", "--name-scale": "1.1", "--price-weight": "600"
      }
    },
    {
      id: "instrument",
      name: "Editorial",
      direction: "Condensed editorial serif + crisp grotesk",
      display: "Instrument Serif", body: "Instrument Sans", license: "Google Fonts · OFL",
      families: ["Instrument Serif", "Instrument Sans"],
      href: GF + "family=Instrument+Sans:wght@400..700&family=Instrument+Serif&display=swap",
      sample: { transform: "none" },
      vars: {
        "--font-display": '"Instrument Serif", Georgia, serif',
        "--font-sans": '"Instrument Sans", system-ui, sans-serif',
        "--display-weight": "400", "--display-weight-strong": "400",
        "--display-case": "none", "--display-tracking": "-0.01em", "--display-tracking-wide": "-0.005em",
        "--display-leading": "1.02", "--display-scale": "1.38",
        "--name-case": "none", "--name-tracking": "0em", "--name-scale": "1.3", "--price-weight": "400"
      }
    },
    {
      id: "switzer",
      name: "Quiet Luxury Grotesk",
      direction: "One restrained grotesk throughout (Aesop-style)",
      display: "Switzer", body: "Switzer", license: "Fontshare · ITF Free Font License",
      families: ["Switzer"],
      href: FS + "f[]=switzer@300,400,500,600&display=swap",
      sample: { transform: "none" },
      vars: {
        "--font-display": '"Switzer", system-ui, sans-serif',
        "--font-sans": '"Switzer", system-ui, sans-serif',
        "--display-weight": "500", "--display-weight-strong": "500",
        "--display-case": "none", "--display-tracking": "-0.02em", "--display-tracking-wide": "-0.01em",
        "--display-leading": "1.08", "--display-scale": "1.05",
        "--name-case": "none", "--name-tracking": "-0.005em", "--name-scale": "1.02", "--price-weight": "500"
      }
    }
  ];

  function byId(id) {
    for (var i = 0; i < PAIRINGS.length; i++) if (PAIRINGS[i].id === id) return PAIRINGS[i];
    return null;
  }

  /* ---------- Styles: per-pairing variables + panel/specimen UI ---------- */

  var css = PAIRINGS.map(function (p) {
    var decl = Object.keys(p.vars).map(function (k) { return "  " + k + ": " + p.vars[k] + ";"; }).join("\n");
    return '[data-font="' + p.id + '"] {\n' + decl + "\n}";
  }).join("\n");

  css += [
    "",
    ".fl-panel{position:fixed;left:16px;bottom:16px;z-index:1000;font:500 14px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;color:#f5ecdd;letter-spacing:0;text-transform:none}",
    ".fl-toggle{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 16px 0 12px;border:1px solid rgba(184,149,90,.6);border-radius:999px;background:#131d16;color:#f5ecdd;font:inherit;cursor:pointer;box-shadow:0 12px 30px -12px rgba(0,0,0,.6)}",
    ".fl-toggle b{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#b8955a;color:#131d16;font:700 13px/1 Georgia,serif}",
    ".fl-toggle small{opacity:.7;font-size:12px}",
    ".fl-box{display:none;position:absolute;left:0;bottom:56px;width:min(340px,calc(100vw - 32px));max-height:min(72vh,640px);overflow:auto;padding:8px;border:1px solid rgba(184,149,90,.5);border-radius:14px;background:#131d16;box-shadow:0 24px 60px -20px rgba(0,0,0,.7)}",
    ".fl-panel[data-open='true'] .fl-box{display:block}",
    ".fl-box h2{margin:6px 8px 8px;font:600 12px/1.2 system-ui,sans-serif!important;letter-spacing:.12em!important;text-transform:uppercase!important;color:#d9bf8f}",
    ".fl-opt{display:grid;gap:3px;width:100%;margin:0 0 4px;padding:10px 12px;border:1px solid transparent;border-radius:10px;background:transparent;color:#f5ecdd;text-align:left;cursor:pointer}",
    ".fl-opt:hover{background:rgba(245,236,221,.06)}",
    ".fl-opt[aria-checked='true']{border-color:#b8955a;background:rgba(184,149,90,.14)}",
    ".fl-opt__name{font-size:20px;line-height:1.15;color:#f5ecdd}",
    ".fl-opt__meta{font:400 12px/1.35 system-ui,sans-serif;color:rgba(245,236,221,.72)}",
    ".fl-box a{display:block;margin:6px 8px 4px;color:#d9bf8f;font:500 13px/1.4 system-ui,sans-serif}",
    ".fl-toggle:focus-visible,.fl-opt:focus-visible,.fl-box a:focus-visible{outline:2px solid #d9bf8f;outline-offset:2px}",
    /* specimen page */
    ".fl-specs{display:grid;gap:32px;grid-template-columns:1fr}",
    "@media (min-width:1100px){.fl-specs{grid-template-columns:1fr 1fr}}",
    ".fl-spec{display:flex;flex-direction:column;border:1px solid rgba(184,149,90,.4);background:var(--cream);overflow:hidden;font-family:var(--font-sans);color:var(--brown)}",
    ".fl-spec__head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 20px;background:#131d16;color:#f5ecdd}",
    ".fl-spec__title{margin:0;font:600 16px/1.3 system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important;font-stretch:normal!important}",
    ".fl-spec__meta{margin:2px 0 0;font:400 12.5px/1.4 system-ui,sans-serif;color:rgba(245,236,221,.72)}",
    ".fl-spec__use{flex:none;min-height:40px;padding:0 14px;border:1px solid #b8955a;border-radius:999px;background:transparent;color:#f5ecdd;font:500 13px/1 system-ui,sans-serif;cursor:pointer}",
    ".fl-spec__use[aria-pressed='true']{background:#b8955a;color:#131d16}",
    ".fl-spec__hero{position:relative;padding:40px 28px 44px;text-align:center}",
    ".fl-spec__hero img{width:112px;height:112px;margin:0 auto 20px;filter:drop-shadow(0 14px 24px rgba(0,0,0,.4))}",
    ".fl-spec .hero__title{margin:0 auto;max-width:none;font-size:calc(clamp(1.3rem, 5.2vw, 1.85rem) * var(--display-scale))}",
    ".fl-spec .hero__sub{font-size:1rem}",
    ".fl-spec .hero__actions{margin-top:22px}",
    ".fl-spec__body{display:grid;gap:22px;padding:32px 28px 36px}",
    ".fl-spec__body .eyebrow{margin:0}",
    ".fl-spec__body .h2{font-size:calc(2.1rem * var(--display-scale))}",
    ".fl-spec__row{display:grid;gap:22px;align-items:start}",
    "@media (min-width:640px){.fl-spec__row{grid-template-columns:1fr 1fr}}",
    ".fl-spec__para{margin:0;color:var(--brown-700)}"
  ].join("\n");

  var style = document.createElement("style");
  style.id = "font-lab-style";
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- Font loading ---------- */

  var loaded = {};
  function loadFonts(p) {
    if (!p || !p.href) return;
    [].concat(p.href).forEach(function (href) {
      if (loaded[href]) return;
      loaded[href] = true;
      var exists = [].some.call(document.querySelectorAll('link[rel="stylesheet"]'), function (l) { return l.href === href; });
      if (exists) return;
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    });
  }
  function loadAll() { PAIRINGS.forEach(loadFonts); }

  /* ---------- Apply ---------- */

  function current() {
    var id = null;
    try { id = localStorage.getItem(KEY); } catch (e) {}
    return byId(id) ? id : "current";
  }

  function apply(id, persist) {
    var p = byId(id) || PAIRINGS[0];
    loadFonts(p);
    document.documentElement.setAttribute("data-font", p.id);
    if (persist !== false) { try { localStorage.setItem(KEY, p.id); } catch (e) {} }
    syncUI(p.id);
    return p.id;
  }

  var optionButtons = [];
  var useButtons = [];
  function syncUI(id) {
    optionButtons.forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-id") === id)); });
    useButtons.forEach(function (b) {
      var on = b.getAttribute("data-id") === id;
      b.setAttribute("aria-pressed", String(on));
      b.textContent = on ? "In use on site" : "Use on site";
    });
    var label = document.querySelector(".fl-toggle small");
    if (label) label.textContent = (byId(id) || PAIRINGS[0]).name;
  }

  apply(current(), false);

  /* ---------- Panel ---------- */

  function sampleStyle(p) {
    var fam = p.vars["--font-display"] || '"Cinzel", serif';
    var s = "font-family:" + fam + ";text-transform:" + (p.sample.transform || "none") + ";";
    if (p.sample.stretch) s += "font-stretch:" + p.sample.stretch + ";";
    s += "font-weight:" + (p.vars["--display-weight"] || "500") + ";";
    return s;
  }

  function buildPanel() {
    var panel = document.createElement("div");
    panel.className = "fl-panel";
    panel.setAttribute("data-open", "false");

    var box = document.createElement("div");
    box.className = "fl-box";
    box.id = "fl-box";
    var h = document.createElement("h2");
    h.textContent = "Font Lab · dev only";
    box.appendChild(h);

    var group = document.createElement("div");
    group.setAttribute("role", "radiogroup");
    group.setAttribute("aria-label", "Font pairings");
    PAIRINGS.forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "fl-opt";
      b.setAttribute("role", "radio");
      b.setAttribute("data-id", p.id);
      var n = document.createElement("span");
      n.className = "fl-opt__name";
      n.setAttribute("style", sampleStyle(p));
      n.textContent = p.name;
      var m = document.createElement("span");
      m.className = "fl-opt__meta";
      m.textContent = p.display + " / " + p.body + " · " + p.license;
      b.appendChild(n);
      b.appendChild(m);
      b.addEventListener("click", function () { apply(p.id); });
      optionButtons.push(b);
      group.appendChild(b);
    });
    box.appendChild(group);

    if (!document.getElementById("font-specimens")) {
      var a = document.createElement("a");
      a.href = "fonts.html";
      a.textContent = "Compare all pairings side by side →";
      box.appendChild(a);
    }

    var t = document.createElement("button");
    t.type = "button";
    t.className = "fl-toggle";
    t.setAttribute("aria-expanded", "false");
    t.setAttribute("aria-controls", "fl-box");
    t.innerHTML = '<b aria-hidden="true">Aa</b><span>Font Lab</span><small></small>';
    t.addEventListener("click", function () {
      var open = panel.getAttribute("data-open") !== "true";
      panel.setAttribute("data-open", String(open));
      t.setAttribute("aria-expanded", String(open));
      if (open) loadAll();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.getAttribute("data-open") === "true") {
        panel.setAttribute("data-open", "false");
        t.setAttribute("aria-expanded", "false");
        t.focus();
      }
    });

    panel.appendChild(box);
    panel.appendChild(t);
    document.body.appendChild(panel);
    syncUI(document.documentElement.getAttribute("data-font"));
  }

  /* ---------- Specimens (fonts.html) ---------- */

  var SVG_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  var SVG_CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 7.5V12l3 2"/></svg>';

  function buildSpecimens(root) {
    loadAll();
    PAIRINGS.forEach(function (p) {
      var art = document.createElement("article");
      art.className = "fl-spec";
      art.setAttribute("data-font", p.id);
      art.id = "spec-" + p.id;
      // Static, trusted markup (no user data) using the site's real classes.
      art.innerHTML =
        '<header class="fl-spec__head"><div><h2 class="fl-spec__title"></h2><p class="fl-spec__meta"></p></div>' +
        '<button type="button" class="fl-spec__use" aria-pressed="false"></button></header>' +
        '<div class="fl-spec__hero theme-deep rays tex on-dark">' +
          '<img src="assets/img/badge-320.webp" width="112" height="112" alt="">' +
          '<h3 class="hero__title">Classic Barbering in North&nbsp;Hollywood</h3>' +
          '<p class="hero__sub">Precision cuts, clean fades and sharp beard work. Book your chair online.</p>' +
          '<div class="hero__actions"><a class="btn btn--gold" href="services.html">Book an appointment ' + SVG_ARROW + '</a>' +
          '<a class="btn btn--ghost" href="services.html">View services</a></div>' +
        '</div>' +
        '<div class="fl-spec__body theme-cream">' +
          '<p class="eyebrow">The Menu</p>' +
          '<h3 class="h2">Services <em>&amp; Pricing</em></h3>' +
          '<div class="fl-spec__row">' +
            '<article class="card"><div class="card__top"><h4 class="card__name">Haircut Fade Taper</h4><div class="card__price">$50</div></div>' +
            '<div class="card__rule" aria-hidden="true"></div><p class="card__meta">' + SVG_CLOCK + '45 min</p>' +
            '<p class="card__desc">Low fade, mid fade, high fade or comb over, finished with a sharp line-up.</p>' +
            '<div class="card__actions"><a class="btn btn--green btn--block" href="services.html">Book this service ' + SVG_ARROW + '</a></div></article>' +
            '<p class="fl-spec__para">Hovhannes Barber &amp; Co is a North Hollywood barbershop built on the traditions of the classic shop: a sharp cut, an honest conversation and the time it takes to get every detail right. Book online in a few taps, or call (818) 397-7285.</p>' +
          '</div>' +
        '</div>';
      art.querySelector(".fl-spec__title").textContent = p.name;
      art.querySelector(".fl-spec__meta").textContent = p.display + " / " + p.body + " · " + p.direction + " · " + p.license;
      var use = art.querySelector(".fl-spec__use");
      use.setAttribute("data-id", p.id);
      use.addEventListener("click", function () { apply(p.id); });
      useButtons.push(use);
      root.appendChild(art);
    });
    syncUI(document.documentElement.getAttribute("data-font"));
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    var specs = document.getElementById("font-specimens");
    if (specs) buildSpecimens(specs);
    buildPanel();
  });

  window.FontLab = { pairings: PAIRINGS, apply: apply, current: current };
})();
