# Hovhannes Barber & Co website

Website of [hovhannesbarberco.com](https://hovhannesbarberco.com).

A static site: plain HTML, CSS and JavaScript, with no build step. Upload the folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel and so on).

## Preview locally

The service menu is loaded with `fetch()`, so open the site through a local web server, not by double-clicking the file. Links use clean URLs (`/services`, not `services.html`), which GitHub Pages supports, so use a server that does too:

```bash
# from this folder
npx serve .
# then open the address it prints (usually http://localhost:3000)
```

(`python -m http.server` won't work for this: it can't serve `/services`.)

## Hosting

GitHub Pages on the barber's own repo (`hovhannesbarberco/BarberCo-Website`), branch `main`, folder `/`. Pushing to `main` updates the live site within a minute or two. The `CNAME` file holds the custom domain: don't delete it. DNS is at Namecheap: four A records for `@` pointing to GitHub's addresses (185.199.108–111.153), and a CNAME `www` → `hovhannesbarberco.github.io`.

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

- Each service card's **Book** button opens that service's Square booking page in a new tab. The service is already in the cart and the page opens at the date and time step.
- How that link is built: `bookingUrl` (the service's Square Advanced Widget link) plus `squareVariationId`, with `SQUARE_STAFF_TOKEN` from `assets/js/config.js`. The script turns them into a `book.squareup.com/.../services?rebooking=[...]` link. `rebooking` is the parameter Square's own booking page reads to pre-fill the cart. If `squareVariationId` is missing, the button opens the plain `bookingUrl`, where the customer picks the service and taps Add.
- To find a service's `squareVariationId`, open `https://app.squareup.com/appointments/api/buyer/widget/<widget id>?unit_token=LYPDVCS8S0YFS` and copy `services[0].variations[0].id`. The team member token is `staff[0].employee_token` in the same response.
- If a service has no `bookingUrl`, it falls back to `BOOKING_URL` in `assets/js/config.js`.
- If neither is set, the button is shown but disabled.
- General "Book now" buttons (in the header, hero and CTA) go to `BOOKING_URL` once it's set. Until then they go to the services page.

## Updating prices or services

Edit `data/services.json`; the pages update automatically. Fields: `name`, `category` (cards are grouped by this, in the order they first appear), `price` (a number, or text such as `"45"` or `"Free"`), `priceNote` (`"+"` or `"and up"` shows as `$45+`; anything else shows under the price), `durationMinutes`, `durationText` (optional; shown instead of the minutes, e.g. `"Varies"`), `description`, `bookingUrl`, `squareVariationId` (see "How booking works"). You can also set `"featured": true` to pin a service to the home page preview.

Keep prices in sync with Square: Square is what customers actually book and pay.

## Typography

- **Oswald** (display, weights 500–600) is a condensed grotesk, set in uppercase for headings, service names, prices and the hero wordmark. It gives the bold barbershop-signage look.
- **Inter** (body, buttons, labels, weights 300–600) is a crisp, highly readable sans.
- Both load from Google Fonts (SIL Open Font License) with `display=swap`, in a single `<link>` in each page's `<head>`.
- The families are set in `--font-display` and `--font-sans` at the top of `styles.css`.

## Still to add

- **Photos.** The About portrait and the wide band show branded green panels until photos arrive (see `assets/img/photos/README.md`). The Gallery section is hidden (`hidden` on `#gallery` in `index.html`); the comment above it says how to bring it back.
- **Social links.** Instagram ([@barber_colorist_la](https://www.instagram.com/barber_colorist_la/)) is in both footers, the Gallery button and `sameAs` in the JSON-LD. Add any other profiles the same way.
- **General booking link.** `BOOKING_URL` in `assets/js/config.js`.

The site has no email address on purpose. Address, phone, hours, bio, the domain (`hovhannesbarberco.com`) and the JSON-LD are filled in. When he moves to his own shop, update the address and the "opening soon" note in the Visit section.
