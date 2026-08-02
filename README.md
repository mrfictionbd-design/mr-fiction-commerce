# Mr. Fiction Commerce

Full-stack e-commerce: Storefront + Admin Dashboard + Orders + Inventory.

## Features

- **Storefront**: Home, Shop by category, Product detail, Cart
- **Admin**: Protected login, Dashboard stats, Orders with status updates, Inventory view
- **Backend**: Prisma schema ready for Vercel Postgres / Neon
- **Auth**: JWT-based admin login
- **Cart**: Client-side localStorage cart

## Demo Login

```
Email:    admin@mrfiction.com
Password: admin123
```

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

- Store: `/`
- Shop: `/shop`
- Cart: `/cart`
- Admin: `/admin` (login required)

## Environment

Copy `.env.example` → `.env.local` and fill:

```
DATABASE_URL=
JWT_SECRET=your-long-secret
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database (when ready)

```bash
npx prisma db push
npx prisma generate
```

Currently runs on in-memory mock data (`src/lib/data.ts`) so everything works without a database.

## Deploy on Vercel

1. Import this repo
2. Add env vars
3. Deploy
