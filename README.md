# R TEX BD — Premium Full-Working Store

R TEX BD is a premium women’s three-piece ecommerce-style storefront with a separate secure admin CMS.

## What was upgraded in this build
- Added **12 distinct demo women’s three-piece products** with separate local JPG product assets.
- Added **8 distinct demo categories** with separate local JPG category assets.
- Replaced the old logo-crop product/category imagery; the supplied R TEX BD logo is used only as the brand logo.
- Added distinct review/customer visual assets.
- Removed the separate storefront-design option from the admin sidebar; storefront content is managed under Store Settings.
- Moved storefront/hero/about/promo editing into **Store Settings**.
- Rebuilt the admin navigation as a real responsive **sidebar + mobile slide-out menu** with backdrop and outside-tap close.
- Added direct **image upload controls** in admin for products, categories, reviews, logo, hero/about/promo images.
- Upgraded the shopping assistant to understand common **Bangla + English + Banglish** shopping phrases and product names/categories/colors/sizes/budgets.
- Assistant can recommend products and show product cards with **View / Add to Cart / Order Now**.
- Product search also matches **name, category, color and size**.
- Kept product detail → size/color/stock → cart → checkout → order flow.

## Storefront
- Women’s three-piece catalog
- Product details
- Size and color selection
- Stock and quantity controls
- Add to Cart
- Order Now
- Checkout
- Order IDs like `RTX-000001`
- WhatsApp contact
- Category browsing
- Product search/filter
- Reviews horizontal auto-scroll
- FAQ
- Mobile drawer with outside-tap close
- Shopping assistant

## Admin
Open `/admin`.

Admin can manage:
- Products
- Product images (upload or URL)
- Categories
- Category images
- Sizes
- Colors
- Stock
- Descriptions
- Reviews and review images
- Orders and order status
- FAQ
- Store/contact/social settings
- Storefront hero/about/promo content
- SEO title/description
- Shopping assistant information

### Admin login
Username: `admin`

Set a strong password using `ADMIN_PASSWORD` in production. The default fallback in code is only for local/demo use and should be changed.

## Run locally
```bash
npm install
npm start
```

Then open:
- Store: `http://localhost:10000/`
- Admin: `http://localhost:10000/admin`

## Environment variables
Copy `.env.example` values into your hosting provider:

```env
PORT=10000
ADMIN_PASSWORD=change-this-password
JWT_SECRET=change-this-to-a-long-random-secret
DATABASE_URL=
```

`DATABASE_URL` is optional. If supplied, PostgreSQL is used for content persistence. Without it, the project uses `data.json` for local/demo persistence.

## Deployment
The project is Node/Express based and is suitable for Render, Railway, VPS and similar Node hosting. Use the repository root as the service root and:
- Build: `npm install`
- Start: `npm start`

For production, use a persistent PostgreSQL database rather than relying on the local JSON file.

## Important
The demo product/review/category visuals are generated local raster JPG assets for the demo catalog. They are intentionally separate from the R TEX BD logo so the demo catalog does not display logo crops as product images.
