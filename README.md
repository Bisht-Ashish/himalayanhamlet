# Himalayan Hamlet

Website for the Himalayan Hamlet homestay in Almora, Uttarakhand.

Today the site is one static file, `index.html` (plain HTML, CSS and JavaScript, no build step). Guests enquire through a prefilled WhatsApp message.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole website |
| `sync_ical.py` | Runs on the VPS. Reads the private Airbnb iCal link and writes `booked.json` (dates only) |
| `.github/workflows/pages.yml` | Publishes the site to GitHub Pages on every push to `main` |
| `.github/workflows/deploy-vps.yml` | Copies the site to the VPS. Runs only when you start it by hand |

## Edit the content

Open `index.html` and look for the `EDIT THESE` block near the bottom:

- `WA`: WhatsApp number with country code, no `+` (for example `919876543210`)
- `NAME`: homestay name
- `PRICE`: nightly rate in rupees (`0` shows "Message us your dates")
- `REVIEWS`: replace the three placeholder reviews with real ones

Also replace the sample phone number and email in the footer, the "Book direct" perk, and the policy page links.

Put photos in an `images/` folder as compressed WebP files and replace the drawn placeholder images.

## Option A: GitHub Pages (free)

1. In the repository go to **Settings, Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the "Deploy to GitHub Pages" workflow from the Actions tab).
4. The site appears at `https://bisht-ashish.github.io/himalayanhamlet/`.

To use your own domain, add it under Settings, Pages, Custom domain, then add the DNS records GitHub shows.

### Live availability on GitHub Pages

The Pages workflow also refreshes booked dates every hour (and on every push):

1. In Airbnb, open your calendar, then availability settings, then Connect calendars, then Export calendar, and copy the `.ics` link.
2. In this repo go to **Settings, Secrets and variables, Actions, New repository secret**. Name it `AIRBNB_ICAL_URL` and paste the link as the value. Never put the link in a file or in a commit.
3. Open the **Actions** tab, choose **Deploy to GitHub Pages**, and press **Run workflow** once to test it.

The workflow runs `sync_ical.py`, which saves only the booked date ranges to `booked.json` before the site is published. Airbnb's feed can lag by up to 12 hours, so the form always tells guests to confirm by message. If the secret is missing or Airbnb cannot be reached, the site is still published, just without the booked-dates message.

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

Run **Deploy to VPS** from the Actions tab. The deploy never deletes `booked.json`, which the sync script owns.

### Live availability (VPS only)

1. Copy `sync_ical.py` to `/opt/sync_ical/` on the VPS.
2. Put your Airbnb calendar export link in `/opt/sync_ical/ical_url.txt` and run `chmod 600` on it. Never commit this link.
3. Add a cron line: `*/30 * * * * /usr/bin/python3 /opt/sync_ical/sync_ical.py`

## Moving to Angular

Angular 22 is the current stable release (22.2.1 at the time of writing). The page is a good fit for a gradual move, because it is already split into clear sections.

Suggested steps:

1. Create the app on your own computer (Node 22 or newer): `npm install -g @angular/cli`, then `ng new himalayan-hamlet --style=css --ssr=false` and keep the generated project in this repo.
2. Turn each section into a standalone component: `hero`, `facts-strip`, `stay`, `rooms`, `amenities`, `seasons`, `gallery`, `hosts`, `weather`, `reviews`, `faq`, `booking-form`, `footer`, plus `sticky-bar` for phones.
3. Move the editable content (WhatsApp number, name, price, reviews, rooms, amenities) into one file, for example `src/app/site-data.ts`, so edits never touch the layout code.
4. Move the CSS variables and the light/dark theme into `src/styles.css`, and keep section-specific styles inside each component.
5. Replace the hand-built JavaScript with Angular features: `@for` for lists, signals for the form fields, `HttpClient` for the weather call and `booked.json`, and a computed signal for the WhatsApp link.
6. Build with `ng build`. The output in `dist/himalayan-hamlet/browser/` is static files, so the same two workflows work. Change the Pages workflow to run `npm ci && npm run build` and upload that folder, and point the VPS workflow's `rsync` at it.
7. Serve images from `public/images/`, and keep `booked.json` outside the build so the sync script can keep updating it.

For a one-page site, plain HTML works well. Angular pays off if you add more pages, an admin area, or reusable parts.
