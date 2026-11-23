# Deploy from GitHub to Vercel

The repository is a Next.js app. Import `aa-Teye/fandlwedding` in Vercel with
the repository root as the Root Directory, Next.js as the Framework Preset,
Node.js 24.x, `npm ci` as the Install Command, and `npm run build` as the Build
Command. Leave the Output Directory at its framework default.

## Configure environment variables before deploying

| Name | Value |
| --- | --- |
| `DATABASE_URL` | Your Neon pooled Postgres connection string with SSL enabled |
| `GUESTS_KEY` | A new random secret, at least 32 characters long |
| `NEXT_PUBLIC_SITE_URL` | The final HTTPS address of this site, without a trailing slash |

Set the secrets for Production. For Preview deployments, use a separate Neon
branch/database and a different guest-list key so testing cannot add real RSVPs.
Never prefix database credentials or the guest-list key with `NEXT_PUBLIC_`.
Changes to environment variables require a new deployment.

The old database password and guest-list key were committed in earlier repository
history. Rotate the database password in Neon before production, then update
`DATABASE_URL` locally and in Vercel. The ignored `.env.local` contains the local
connection and a freshly generated guest-list key; it is never sent to GitHub.
Removing secrets from current source does not revoke the historical credentials.

## Initialize and verify

With `.env.local` pointing at the intended database:

```sh
npm ci
npm run db:migrate
npm run lint
npm run typecheck
npm run build
```

The migration is safe to run again. Run it once for each new database, separately
from the Vercel build. The existing database already has the RSVP table.

With a local server running, `npm run test:smoke` checks page responses,
RSVP validation, acceptance and decline persistence, and guest-list access.
It creates two marked test replies and deletes them afterward. Use a test database
when possible. Set `SMOKE_TEST_URL` if your local server uses a different port.

After deployment:

1. Open `/` and a personalized invitation such as `/?to=Test%20Guest`.
2. Submit an RSVP and verify it at `/guests?key=YOUR_GUESTS_KEY`.
3. Open `/guests` without a key and confirm the list remains private.
4. Open `/invite`, generate a personal link and download a QR code. Generate
   shareable codes on the final public domain.
5. Check `/programme`, the photos, calendar download, and WhatsApp links.

RSVP replies are separate submissions. Sending another reply creates another row.
WhatsApp is optional and requires the guest to send the message themselves.
The guest-list URL is a private access link: share it only with the couple.

## Content still needed from the couple

The site works with its current content. The order of service, ministers, gallery,
gift accounts, livestream, music, and invitation-card image are optional and
currently empty or disabled. Schedule wording, RSVP contact names and the RSVP
deadline still need confirmation in `src/content.ts`. Empty optional sections stay
hidden or show their existing coming-soon message.

Official references: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs),
[environment variables](https://vercel.com/docs/environment-variables),
[Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
