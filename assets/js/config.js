/*
 * Site configuration. Edit values here; nothing else needs to change.
 */
window.HBC_CONFIG = {
  // TODO: Paste the general Square booking site URL (Square Dashboard → Appointments →
  // Online Booking → copy the booking site link). Used by every general "Book" button
  // and by any service that has no bookingUrl of its own. Leave "" until you have it:
  // general Book buttons then go to the services page instead.
  BOOKING_URL: "",

  // Hovhannes's Square team member token. Service Book buttons use it with each
  // service's squareVariationId so Square opens with the service already in the cart
  // and Hovhannes picked. Leave "" to let Square book any available barber.
  SQUARE_STAFF_TOKEN: "TMljDILHGs-W5UIt",

  // Service data. The real file is written from Square; the sample is only a fallback.
  SERVICES_URL: "data/services.json",
  SERVICES_FALLBACK_URL: "data/services.sample.json",

  // How many services to show in the home page menu preview (services marked
  // "featured": true are shown first, if any are marked).
  FEATURED_COUNT: 6
};
