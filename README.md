# Francis & Linda — Wedding Website

The wedding website for **Francis Kormla Balame & Linda Kutorkor Neequaye**: Saturday, 19 December 2026, 1:30 PM prompt, at Overcomers Nation Church (opposite Ayrton Drugs, Tesano, Accra).

Colours of the day: royal purple, tomato red and light green, with gold.

Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Run it locally

**Easiest:** double-click `start-windows.bat` (Windows) or `start-mac.command` (Mac). It installs everything the first time, starts the site and opens http://localhost:1912. You need [Node.js](https://nodejs.org) (LTS) installed once.

Or from a terminal in this folder:

```bash
npm install
npm run dev
```

Then open http://localhost:1912 (the site uses port 1912, for 19/12).

## Edit the wedding details

Everything guests see lives in [`src/content.ts`](src/content.ts): names, date, venue, schedule, order of service, ministers, dress code, gifts, RSVP contacts, FAQs and the note from the couple. Lines marked `// TODO` are placeholders still waiting for real details.

## The experience

1. **Loading screen:** a gold ring draws around the couple's monogram.
2. **The Royal Gate:** purple velvet doors with gold panels and rose clusters, tied with a tomato-red satin bow and a gold wax seal. Tapping unties the bow, breaks the seal and swings the doors open onto golden light, with a burst of rose petals and gold dust.
3. **The site:** rose petals drift down the page, gold sparkles twinkle in the purple sections, names shimmer in gold foil, gold line drawings draw themselves as you scroll, and the countdown is a flip clock.

Turn the petals or sparkles off in `effects` in `src/content.ts`. Guests whose phones ask for reduced motion get a calm version automatically.

## Pages

| Page | What it's for |
|---|---|
| `/` | The wedding website: the gate, the invitation and all the details |
| `/?to=Ama%20%26%20Kofi` | A personal invitation: the gate and the top of the page greet the guest by name, and their name is filled in on the RSVP form |
| `/invite` | For the couple: type guest names, then send each personal link on WhatsApp; download printable QR codes |
| `/programme` | The order of service on its own page, for guests in church (print its QR code from `/invite`) |

## RSVP and the guest list

The "Confirm your attendance" form saves each reply to a Neon Postgres database through `/api/rsvp`. After sending, guests can also tell the couple on WhatsApp.

The couple see every reply, with totals, at `/guests?key=YOUR_KEY`.

Set these environment variables (in `.env.local` on your computer, and under **Settings → Environment Variables** on Vercel):

| Variable | What it is |
|---|---|
| `DATABASE_URL` | The Neon connection string (the pooled one) |
| `GUESTS_KEY` | A secret of your choice that opens the guest list page |

Run `npm run db:migrate` once to create the table (it is safe to run again).

## Photos

Put the cards in `public/` and fill in `photos` in `src/content.ts`:

- `couple`: the portrait at the top of the page (crop it from the save the date).
- `saveTheDate` and `invitation`: shown with download buttons below the invitation.
- **Gallery:** put photos in `public/gallery/` and list each one in `gallery`. The gallery and its menu link appear once there is at least one photo.

## Optional extras in `src/content.ts`

- **Livestream:** set `livestream.url` to a YouTube or Facebook Live link to show a "Watch the ceremony live" section.
- **Music:** put a song at `public/music.mp3` and set `music.enabled` to `true`. It starts when a guest opens the gate, with a button to pause it.
- **Wedding day:** nothing to set. On the day, the countdown changes to "Today's the day!" and the schedule highlights what's happening now.

## Deploy

Import the repository on [Vercel](https://vercel.com/new) and deploy. Add a custom domain under **Project → Settings → Domains**, then update `site.url` in `src/content.ts`.
