# RCCGPA Web Frontend

Production-ready Next.js frontend for RCCG Peace Assembly, built with:

- Next.js App Router + TypeScript
- Tailwind CSS
- Sanity CMS integration (content-only control)

## Run locally

1. Create `.env.local` in the project root and add your Sanity project values (see the environment variable names below).
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`

## Sanity Studio

The Studio is intentionally not embedded in the public Next.js app. Run it locally with:

- `npm run studio`

Deploy the Studio to Sanity hosting with:

- `npm run studio:deploy`

The hosted Studio is a separate admin site at a `*.sanity.studio` address. Its files can be reached publicly, but editors must sign in to Sanity and have project membership with a role that grants write access. Invite each editor separately; do not share an administrator login.

The Studio and CLI use `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`; the Next.js website separately uses `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. Set both pairs to the same project and dataset in `.env.local`. The `SANITY_STUDIO_` prefix is required for values used by the Studio's browser bundle. These IDs are public configuration, not secrets. Never put tokens in `SANITY_STUDIO_*` or `NEXT_PUBLIC_*` variables. If the Studio project ID is missing, the CLI config stops with a direct setup message instead of trying to start against an empty project.

### Connect the live website

1. In [Sanity Manage](https://www.sanity.io/manage), open the Peace Assembly project and copy its Project ID. Confirm the dataset name (this project defaults to `production`).
2. In `.env.local`, set the frontend and Studio values to the same project and dataset:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```

3. Sign into Sanity from the project folder if needed, then deploy the Studio:

   ```bash
   npx sanity login
   npm run studio:deploy
   ```

   On the first deploy, choose an available Studio hostname. Share the resulting `https://<hostname>.sanity.studio` URL with editors. Sanity-hosted Studio deployments use Sanity login and project permissions; there is no public write token in the Studio URL.
4. In the hosting provider for the public website (for example, Vercel), add the same three `NEXT_PUBLIC_SANITY_*` values to the site's environment variables and redeploy. The deployed Next.js server will then fetch published content from that Sanity project and dataset.
5. In the Studio, create or update the singleton documents under Site Settings and Homepage, then publish them. Add Events, Blog Posts, and other content as needed. The website has fallback text when these documents are missing.

This frontend currently makes published-content queries without a token (`lib/sanity.client.ts` uses `useCdn: true`). For an ordinary public church website, a **public dataset** is the simplest setup: visitors can read published content, but the public project ID and dataset name do not give them write access. Sanity requires authentication and write permissions to modify documents. A private dataset needs a read token, which this app does not currently configure; that token must be kept server-only and must never be named `NEXT_PUBLIC_*` or added to browser code.

The hosted Studio deploy handles its own Studio origin. The public site currently renders Sanity queries on the server, so it normally does not need its own Sanity CORS origin. If the app later queries Sanity directly from browser JavaScript, add only the exact production origin in Sanity Manage, and do not enable credentials for a public, read-only frontend. CORS is a browser restriction, not a replacement for authentication or permissions.

If a write token was ever added to the public site, repository, or client bundle, revoke it in Sanity Manage and replace it as needed. Keep project IDs and dataset names in `NEXT_PUBLIC_*` variables only; never expose a personal, robot, or write token there.

## Color themes

The default palette is **Harbor**. It uses deep teal for clear actions and trust, warm cream for calm page backgrounds, and terracotta sparingly for highlights. The combination is designed to feel open and welcoming while keeping body text dark and readable. Four additional palettes are available in Sanity for different moods and preferences.

| Theme | Main, supporting and highlight colors | Background | Mood |
| --- | --- | --- | --- |
| Harbor (default) | Teal `#276C63`, deep green `#203B36`, terracotta `#AC533B` | Warm cream `#F6F3EB` | Calm, welcoming, grounded |
| Peace Assembly | Red `#B5122A`, navy `#173B68`, rose `#AE3847` | Cool white `#F3F6FA` | The previous RCCG-inspired look |
| Garden | Forest `#2F6B55`, deep green `#29483A`, earth `#92533A` | Soft sage `#F1F5EF` | Natural, peaceful, community-led |
| Sunrise | Terracotta `#B9563D`, plum `#3B3047`, ochre `#845600` | Ivory `#F8F0E6` | Warm, energetic, celebratory |
| Lavender | Violet `#635B91`, slate `#384258`, rose `#98525A` | Pale lavender `#F3F0F7` | Gentle, reflective, distinctive |

### Switch the site theme

1. Open the Sanity Studio for this project with `npm run studio` (or its deployed Studio).
2. Open **Site Settings**.
3. Set **Site Color Scheme** to Harbor, Peace Assembly, Garden, Sunrise, or Lavender, then publish.

If Site Settings has not been created or the field is blank, the site uses Harbor. The same setting applies across the navbar, pages, cards, buttons, and content sections.

### Adjust or add a theme in code

- `app/globals.css` contains the named palettes under `body[data-color-scheme="..."]`. Each theme uses the same role-based variables, so a component asks for a role such as `--color-primary` or `--color-surface` and does not need to know which palette is selected.
- `sanity/schemaTypes/documents/siteSettings.ts` lists the choices shown to editors. When adding a theme, add its palette block in `app/globals.css`, add its value to the `colorScheme` field options, and extend the `colorScheme` union in `types/cms.ts`.
- `app/layout.tsx` reads the published choice and sets `data-color-scheme` on `<body>`. This is the point that connects editor selection to the CSS palette.
- Use the shared variables in new UI: `--color-primary` for main actions, `--color-secondary` / `--color-secondary-strong` for supporting dark areas, `--color-accent` for small highlights, `--color-paper` and `--color-surface` for alternating backgrounds, `--color-ink` and `--color-muted` for text, and `--color-border` for dividers. Avoid adding palette-specific hex values to page components.
- When changing a palette, check that text remains readable on its background and that buttons have clear contrast. The footer intentionally keeps its separate dark treatment.

### Seasonal campaigns

Create a **Seasonal Campaign** in Studio for a temporary Easter, Christmas, or special-event design. Add its start and end dates, campaign headline and message, optional image and button, and optional accent colors. Enable it when the content is ready. It appears automatically only during its scheduled window, including an optional announcement strip, then the regular site theme returns when it expires. Avoid overlapping enabled campaigns; when they overlap, the one with the latest start date is shown. Campaign colors temporarily override the shared primary and secondary colors; leave them blank to use the selected site theme.

Keep text and button contrast readable when choosing custom colors.

## Routes

- `/`
- `/blog`
- `/blog/[slug]`
- `/events`
- `/events/[slug]`
- `/watch`
- `/give`
- `/visit`
