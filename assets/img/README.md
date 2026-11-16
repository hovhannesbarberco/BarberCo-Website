# Images

## Brand assets (generated from "Hovhannes Barber & Co - Logo D1.png" in the parent folder)

The **main logo** is the full round badge. Its square cream corners are removed: everything outside the outer circle is transparent, with a clean anti-aliased edge. The outermost ring was repainted solid green before masking, so there's no cream halo on dark backgrounds.

| File | Use |
|---|---|
| `badge-160.webp`, `badge-320.webp` | Header logo (72px, retina) and footer (136px) |
| `badge-320.webp`, `badge-480.webp`, `badge-800.webp`, `badge-1200.webp` | Hero centerpiece (400px desktop / 240px mobile, retina), CTA watermark, photo-slot watermark |
| `badge-320.png`, `badge-800.png` | PNG copies for email, social, or the JSON-LD `logo` once the domain is live |
| `og-image.jpg` | 1200×630 social share image: the badge on brand green |
| `favicon-32.png`, `apple-touch-icon.png`, `../../favicon.ico` | Browser and home-screen icons. These are the only places the "H" monogram is used |

## Photo slots (TODO: real photos needed)

No photos have been supplied yet. Each slot shows a branded placeholder (green with a faint badge watermark) until a photo is added.

To add one:
1. Export the photo as JPG or WebP (around 1600px on the long side, under 300 KB).
2. Save it in `assets/img/photos/` using the file name below.
3. In the HTML, find the slot's `data-slot="…"` and uncomment the `<img>` line inside it.
4. Write a real `alt` description.

| Slot (`data-slot`) | Page | Shape | Suggested photo |
|---|---|---|---|
| `about-portrait` | index.html, About | Tall, 4:5 (arched top) | Hovhannes at work, or a portrait |
| `band-shop` | index.html, statement band | Wide, 16:9 or wider (dark overlay is applied) | The shop interior, the chair, or tools laid out |
| `gallery-01` | index.html, Gallery | Tall (wide on mobile) | Best recent cut |
| `gallery-02` | index.html, Gallery | Square-ish | Recent cut |
| `gallery-03` | index.html, Gallery | Square-ish | Recent cut / detail shot |
| `gallery-04` | index.html, Gallery | Tall | Recent cut |
| `gallery-05` | index.html, Gallery | Wide | Shop or chair, or a before/after |

The Visit section uses a live Google Maps embed (no API key needed), so it has no photo slot.
