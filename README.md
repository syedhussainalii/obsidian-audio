# Obsidian Audio

Obsidian Audio is a dark, editorial storefront for OS-01 wireless headphones. It combines product storytelling with a working cart, checkout flow, product configuration, technical education, reviews, and a SQLite-backed newsletter signup.

## Features

- Responsive storefront with mobile navigation and stacked bento feature layout.
- Animated finish selector with product image, price, and cart updates.
- Specs page with scroll-drawn frequency response, ANC waveform demo, comparison table, FAQ, shipping, and returns.
- Reviews page with rating distribution and local-state review form.
- Accessible cart drawer with focus trap, Escape-to-close, labeled controls, and reduced-motion support.
- Express newsletter endpoint with SQLite persistence, email validation, and duplicate handling.
- Lazy-loaded below-the-fold imagery and route-level code splitting.

## Stack

- React 19, Vite, React Router, Tailwind CSS
- Framer Motion and Lucide React
- Express and SQLite

## Setup and run

```bash
npm install
npm run dev
```

In a second terminal, run the newsletter API:

```bash
npm run server
```

The API runs at `http://localhost:3001` and creates `newsletter.db` plus its `subscribers` table automatically. Use `VITE_API_URL` if the API runs somewhere else. `PORT` and `DATABASE_PATH` can also be set for the server.

Production validation:

```bash
npm run build
```

## Design decisions

- Kept the monochrome, high-contrast visual system and used motion as feedback rather than decoration.
- Used CSS/Tailwind for layout and responsive behavior; no new UI or animation dependencies were added.
- Kept product imagery remote and editorial, with no real brand marks or logos.
- Used local state for reviews and SQLite for newsletter persistence to keep the demo simple and portable.
- Used route-level lazy imports and native image loading hints to reduce initial page work.
