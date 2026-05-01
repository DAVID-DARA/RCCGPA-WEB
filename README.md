# RCCGPA Web Frontend

Production-ready Next.js frontend for RCCG Peace Assembly, built with:

- Next.js App Router + TypeScript
- Tailwind CSS
- Sanity CMS integration (content-only control)

## Run locally

1. Copy environment variables:
   - `cp .env.example .env.local`
2. Add your Sanity project values.
3. Install dependencies:
   - `npm install`
4. Start dev server:
   - `npm run dev`

## Routes

- `/`
- `/blog`
- `/blog/[slug]`
- `/events`
- `/events/[slug]`
- `/watch`
- `/give`
- `/visit`
