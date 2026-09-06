# Rrival — Premium Men's Clothing Store

Premium black-and-gold menswear storefront with a separate Admin Panel, Turso database, cart/checkout, order tracking, agents, social links and a local Store Assistant.

## Features
- Premium responsive Rrival storefront
- 12 demo men's products
- Product search and category filters
- Cart and checkout
- Orders stored in Turso and visible in Admin Panel
- Order tracking by RRV order code
- Admin login and password change
- Product CRUD and stock management
- Agent management
- About Store editor
- Instagram, Facebook, TikTok and WhatsApp URL settings
- Small Agent Contact floating button
- Store Assistant built with server-side code + live database data
- Store Assistant supports English and Bangla
- Store Assistant can collect and confirm an order directly in chat
- No Groq/OpenAI API key required

## Render
- Root Directory: blank
- Build Command: `npm install`
- Start Command: `npm start`

## Required Environment Variables
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `ADMIN_PASSWORD`

Optional:
- `ADMIN_SESSION`

Never commit real database tokens or passwords.
