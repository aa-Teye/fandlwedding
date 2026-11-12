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

