# R TEX BD — Premium Full Working Store

Premium women’s three-piece ecommerce-style website with product details, sizes/colors/stock, cart, checkout, order IDs, reviews with automatic side scroll, category filters, responsive mobile drawer, built-in humanized shopping assistant, and separate admin CMS.

## Run
`npm install` then `npm start`
Store: `http://localhost:10000`
Admin: `http://localhost:10000/admin`

## Production variables
`DATABASE_URL` (recommended PostgreSQL), `ADMIN_PASSWORD`, `JWT_SECRET`, optional `PORT`.
Without DATABASE_URL the development fallback uses data.json.

## Included
- Raster JPG assets only; no SVG placeholders.
- Product details: image, category, description, size, color, stock.
- Add to Cart / Order Now and checkout.
- Order IDs like RTX-000001 and admin status updates.
- Reviews and automatic horizontal scrolling.
- Category/product/review/FAQ management.
- Hero + section show/hide controls.
- WhatsApp header number: 01629380347.
- Mobile menu closes when tapping outside.
- No page-level horizontal overflow and no mobile auto-zoom.
- Built-in assistant works without an API key and uses the same product/order flow.

For client production deployment, use PostgreSQL and strong secrets rather than relying on the JSON fallback.
