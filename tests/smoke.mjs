// Headless-browser smoke test. Serves the built site, opens it on a desktop and a
// phone-sized screen, and checks the main things a visitor relies on.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve('dist/himalayan-hamlet/browser');
const iso = (d) =>
  d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const plus = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };

// Fake calendar data, relative to today so the test never goes stale.
const booked = [
  { start: plus(5), end: plus(8) },
  { start: plus(40), end: plus(50) },
];
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.webp': 'image/webp', '.json': 'application/json', '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/booked.json') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify(booked));
  }
  if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    res.writeHead(404);
    return res.end('not found');
  }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(4300, r));

const failures = [];
const check = (ok, msg) => {
  console.log((ok ? 'PASS ' : 'FAIL ') + msg);
  if (!ok) failures.push(msg);
};

fs.mkdirSync('smoke-out', { recursive: true });
const browser = await chromium.launch();

for (const [name, viewport] of [
  ['desktop', { width: 1280, height: 800 }],
  ['mobile', { width: 390, height: 800 }],
]) {
  const page = await browser.newPage({ viewport, colorScheme: 'light' });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource|net::ERR/.test(m.text())) errors.push(m.text());
  });
  // Keep the test offline-safe: block everything except the local server.
  await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await page.goto('http://localhost:4300/index.html');
  await page.waitForSelector('h1');
  await page.waitForSelector('.mo');
  await page.waitForTimeout(500);

  check(errors.length === 0, `${name}: no page errors ${errors.join(' | ')}`);
  check((await page.textContent('h1')).includes('Wake up to Nanda Devi'), `${name}: headline shows`);
  check((await page.locator('.strip div').count()) === 5, `${name}: five fact tiles`);
  check((await page.locator('section').count()) >= 10, `${name}: all sections render`);
  check(
    await page.evaluate(() => {
      const i = document.querySelector('.heroimg');
      return !!i && i.complete && i.naturalWidth > 0;
    }),
    `${name}: hero photo loads`,
  );
  check((await page.locator('.mo').count()) === 4, `${name}: four calendar months`);
  check((await page.locator('.dg .b').count()) > 0, `${name}: booked days are marked`);

  const wa = await page.$$eval('a[href^="https://wa.me/"]', (a) => a.map((x) => x.href));
  check(wa.length >= 3 && wa.every((h) => h.includes('917892712293')), `${name}: WhatsApp links use the right number`);
  check((await page.locator('iframe[src*="google.com/maps/embed"]').count()) === 1, `${name}: map embed present`);

  // Booking form: booked dates warn, free dates do not
  const dates = page.locator('#book input[type=date]');
  await dates.nth(0).fill(booked[0].start);
  await dates.nth(1).fill(plus(7));
  await page.waitForTimeout(150);
  check((await page.textContent('#book p[aria-live]')).includes('look booked'), `${name}: booked dates are flagged`);
  await dates.nth(0).fill(plus(12));
  await dates.nth(1).fill(plus(14));
  await page.waitForTimeout(150);
  check((await page.textContent('#book p[aria-live]')).includes('look free'), `${name}: free dates are accepted`);
  const link = decodeURIComponent(await page.getAttribute('#book a.btn', 'href'));
  check(link.includes(plus(12)) && link.includes('2 guests'), `${name}: enquiry message carries the dates`);

  // Gallery lightbox
  await page.locator('.gbtn').first().click();
  check((await page.locator('.lb').count()) === 1, `${name}: gallery opens a large photo`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
  check((await page.locator('.lb').count()) === 0, `${name}: Escape closes the large photo`);

  if (name === 'mobile') {
    check(
      !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)),
      'mobile: no sideways scrolling',
    );
    check(await page.locator('.sticky').isVisible(), 'mobile: sticky contact bar is visible');
  }

  await page.screenshot({ path: `smoke-out/${name}-top.png` });
  await page.screenshot({ path: `smoke-out/${name}-full.png`, fullPage: true });
  await page.close();
}

await browser.close();
server.close();
if (failures.length) {
  console.error('\n' + failures.length + ' check(s) failed');
  process.exit(1);
}
console.log('\nAll checks passed');
