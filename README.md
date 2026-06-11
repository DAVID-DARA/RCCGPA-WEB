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

## Sanity Studio

The Studio is intentionally not embedded in the public Next.js app. Run it locally with:

- `npm run studio`

Deploy the Studio to Sanity hosting with:

- `npm run studio:deploy`

Use Sanity project members and roles in the Sanity dashboard to control who can edit content.

## Routes

- `/`
- `/blog`
- `/blog/[slug]`
- `/events`
- `/events/[slug]`
- `/watch`
- `/give`
- `/visit`
