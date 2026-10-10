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
