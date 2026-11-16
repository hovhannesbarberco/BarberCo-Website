# Hovhannes Barber & Co website

Website of [hovhannesbarberco.com](https://hovhannesbarberco.com).

A static site: plain HTML, CSS and JavaScript, with no build step. Upload the folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel and so on).

## Preview locally

The service menu is loaded with `fetch()`, so open the site through a local web server, not by double-clicking the file:

```bash
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

(`npx serve .` works too.)

## Files

| Path | What it is |
|---|---|
| `index.html` | Home: hero, about, menu preview, experience, gallery, visit, booking CTA |
| `services.html` | Full services and pricing menu, with a Book button on every service |
| `assets/css/styles.css` | All styles. Brand colors, fonts (`--font-display`, `--font-sans`), type scale and spacing are variables at the top |
| `assets/js/config.js` | **Settings**: the general Square booking URL and the data file paths |
| `assets/js/main.js` | Header, mobile menu, scroll reveals, general Book buttons |
| `assets/js/services.js` | Renders the menu from the service data |
| `data/services.json` | **Real service data from Square**: name, price, duration, description and per-service `bookingUrl` |
| `data/services.sample.json` | Placeholder data, used only while `services.json` is missing |
| `assets/img/` | Logo badge, monogram, favicons and social image. Photos go in `assets/img/photos/` (see the README there) |

## How booking works

- Each service card's **Book** button opens that service's `bookingUrl` (its Square Advanced Widget link) in a new tab.
- If a service has no `bookingUrl`, it falls back to `BOOKING_URL` in `assets/js/config.js`.
- If neither is set, the button is shown but disabled.
- General "Book now" buttons (in the header, hero and CTA) go to `BOOKING_URL` once it's set. Until then they go to the services page.

## Updating prices or services

Edit `data/services.json`; the pages update automatically. Fields: `name`, `category` (cards are grouped by this, in the order they first appear), `price` (a number, or text such as `"45"` or `"Free"`), `priceNote` (`"+"` or `"and up"` shows as `$45+`; anything else shows under the price), `durationMinutes`, `description`, `bookingUrl`. You can also set `"featured": true` to pin a service to the home page preview.

Keep prices in sync with Square: Square is what customers actually book and pay.

## Typography

- **Cinzel** (display: headings, prices, the menu) is classic Roman inscriptional capitals, matching the lettering on the badge.
- **Jost** (body, buttons, labels) is a clean geometric sans in the Futura tradition, the type you see on vintage barbershop signage.
- Both load from Google Fonts with `display=swap`.
- To try another pairing, change `--font-display` and `--font-sans` in `styles.css` and the Google Fonts `<link>` in each page's `<head>`.

## Font Lab (dev only, remove before launch)

On `localhost` / `127.0.0.1` there's a floating **Font Lab** button (bottom-left) for trying font pairings live. `fonts.html` shows every pairing side by side.

- **Making a choice:** pick a pairing in the panel; the choice is saved in localStorage and carries across pages.
- **Production:** on any other hostname the loader exits and `font-lab.js` is never downloaded.
- **Making it permanent:**
  1. Copy the pairing's `vars` from `assets/js/font-lab.js` into `:root` in `assets/css/styles.css`.
  2. Put its font URL(s) in each page's `<head>`. Fontshare serves one family per CSS URL, so use one link per family.
  3. Delete `assets/js/font-lab.js`, `fonts.html`, and the "Font Lab" loader `<script>` in the `<head>` of `index.html` and `services.html`.

## Before launch: search for `TODO`

Every missing piece of real content is marked `TODO` in the HTML (visible TODO text has a dashed outline). Still to fill:

- email
- hours
- social links
- the bio
- the booking policy and payment methods
- photos
- the live domain (canonical, `og:url` and the absolute `og:image`)
- the remaining fields in the BarberShop JSON-LD block in `index.html`: url, logo, image, price range, opening hours and sameAs

The address (5245 Vineland Ave, North Hollywood, CA 91601) and phone ((818) 397-7285) are already filled in.
