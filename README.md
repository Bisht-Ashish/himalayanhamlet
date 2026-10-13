# Himalayan Hamlet

Website for the Himalayan Hamlet homestay in Almora, Uttarakhand. Built with Angular (standalone components, signals). Guests enquire through a prefilled WhatsApp message, and an availability calendar follows the Airbnb calendar.

## Where things are

| Path | Purpose |
| --- | --- |
| `src/app/site-data.ts` | **All the content**: WhatsApp number, phone, email, price, rooms, amenities, reviews, FAQ, nearby places |
| `src/app/*.ts` | One component per section of the page (hero, rooms, gallery, booking, and so on) |
| `src/app/services/` | `availability.ts` reads `booked.json`, `weather.ts` loads the 5-day forecast |
| `src/styles.css` | All the styling, including the light and dark colours |
| `public/images/` | Photos (WebP). Anything in `public/` is copied to the site as it is |
| `sync_ical.py` | Turns the private Airbnb calendar link into `booked.json` (booked dates only) |
| `tests/smoke.mjs` | Opens the built site in a headless browser and checks the main things work |
| `.github/workflows/` | `angular-build.yml` (build and test), `pages.yml` (GitHub Pages), `deploy-vps.yml` (VPS, manual) |

## Edit the content

Open `src/app/site-data.ts` and change the text, numbers and lists. The things you will want to change first:

- `SITE.email`, `SITE.nightlyRate` (`0` shows "Message us your dates"), `SITE.directPerk`
- `REVIEWS`: replace the three placeholders with real reviews
- `GALLERY`: add a line per photo (put the files in `public/images/`)
- Policy links in `FOOTER_LINKS`

## Photos

Compress photos to WebP (about 1600 px wide for big ones, 900 px for cards, under 300 KB each) and put them in `public/images/`. Then add them to `GALLERY` or `ROOMS` in `site-data.ts`.

## Run it on your computer

You need Node 22.12 or newer.

```
npm install
npm start
```

Open http://localhost:4200. `npm run build` makes the production files in `dist/himalayan-hamlet/browser/`, and `npm run smoke` runs the browser test against that build (run `npx playwright install chromium` once first).

## Option A: GitHub Pages (free)

1. In the repository go to **Settings, Pages** and set **Source** to **GitHub Actions**.
2. Every push to `main` builds the site and publishes it. It also republishes every hour so the calendar stays fresh.
3. The site appears at `https://bisht-ashish.github.io/himalayanhamlet/`.

To use your own domain, add it under Settings, Pages, Custom domain, then add the DNS records GitHub shows.

### Live availability on GitHub Pages

1. In Airbnb, open your calendar, then availability settings, then Connect calendars, then Export calendar, and copy the `.ics` link.
2. In this repo go to **Settings, Secrets and variables, Actions, New repository secret**. Name it `AIRBNB_ICAL_URL` and paste the link as the value. Never put the link in a file or in a commit.
3. Open the **Actions** tab, choose **Deploy to GitHub Pages**, and press **Run workflow** once to test it.

The workflow runs `sync_ical.py`, which saves only the booked date ranges to `booked.json` before the site is published. Airbnb's feed can lag by up to 12 hours, so the form always tells guests to confirm by message. If the secret is missing or Airbnb cannot be reached, the site is still published, just without the calendar.

## Option B: your VPS

One-time setup on the VPS (Ubuntu): create a non-root deploy user, install Caddy (it handles HTTPS automatically), point your domain's A record at the VPS, and create the web folder, for example `/var/www/himalayan-hamlet`.

Minimal `Caddyfile`:

```
yourdomain.in {
    root * /var/www/himalayan-hamlet
    file_server
    encode gzip
}
```

Then add these under **Settings, Secrets and variables, Actions, Secrets**:

| Secret | Example |
| --- | --- |
| `VPS_HOST` | `203.0.113.10` |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | private key of a key pair made only for deploys |
| `VPS_PATH` | `/var/www/himalayan-hamlet` |

Run **Deploy to VPS** from the Actions tab. It builds the site and copies it over, and never deletes `booked.json`, which the sync script owns.

To keep availability fresh on the VPS, copy `sync_ical.py` to `/opt/sync_ical/`, put your calendar link in `/opt/sync_ical/ical_url.txt` (`chmod 600`), and add this cron line: `*/30 * * * * /usr/bin/python3 /opt/sync_ical/sync_ical.py`

## Notes

- The workflows use `npm install`. After you run `npm install` on your own computer once, commit the `package-lock.json` it creates and change the workflows to `npm ci` for repeatable builds.
- The old one-file version of the site is in the git history (commit `2928318` on `main`, before the Angular rebuild).
