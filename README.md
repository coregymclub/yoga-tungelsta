# Kundalini Yoga Tungelsta

Hemsida för Kundalini Yoga i Tungelsta.

## Quick Start

```bash
# Installera dependencies
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build
```

## Uppdatera innehåll

Redigera filen `content/site-content.json` för att uppdatera:
- Instruktörsinformation
- Schema/tider
- Kontaktuppgifter
- Kommande event

## Sidor

- `/` - Startsida
- `/om-kundalini` - Om Kundalini Yoga
- `/schema` - Veckoschema
- `/kontakt` - Kontaktinformation

## Tech Stack

- Nuxt 4
- Vue 3
- Tailwind CSS
- TypeScript
- Cloudflare Pages (deploy)

## Deploy

Deployas till Cloudflare Pages:

```bash
npm run build
```

Sedan ladda upp `dist/` till Cloudflare Pages.
