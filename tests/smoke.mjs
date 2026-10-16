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
  if (p.endsWith('/')) p += 'index.html';
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
const oneLine = (t) => String(t).replace(/\s+/g, ' ').slice(0, 280);
const check = (ok, msg) => {
  console.log((ok ? 'PASS ' : 'FAIL ') + msg);
  if (!ok) {
    failures.push(msg);
    console.log('::error title=Smoke check failed::' + oneLine(msg));
  }
};
const crash = (e) => {
  console.log('::error title=Smoke test crashed::' + oneLine(e && e.stack ? e.stack : e));
  process.exit(1);
};
process.on('uncaughtException', crash);
process.on('unhandledRejection', crash);

fs.mkdirSync('smoke-out', { recursive: true });
const browser = await chromium.launch();

for (const [name, viewport] of [
  ['desktop', { width: 1280, height: 800 }],
  ['small', { width: 340, height: 700 }],
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
  check((await page.locator('.fact').count()) === 5, `${name}: five fact tiles`);
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
  check(wa.length >= 2 && wa.every((h) => h.includes('917892712293')), `${name}: WhatsApp links use the right number`);
  check((await page.locator('iframe[src*="google.com/maps/embed"]').count()) === 1, `${name}: map embed present`);

  // Booking form: booked dates warn, free dates do not
  const dates = page.locator('.bar input[type=date]');
  await dates.nth(0).fill(booked[0].start);
  await dates.nth(1).fill(plus(7));
  await page.waitForTimeout(150);
  check((await page.textContent('#book p[aria-live]')).includes('look booked'), `${name}: booked dates are flagged`);
  await dates.nth(0).fill(plus(12));
  await dates.nth(1).fill(plus(14));
  await page.waitForTimeout(150);
  check((await page.textContent('#book p[aria-live]')).includes('look free'), `${name}: free dates are accepted`);
  const link = decodeURIComponent(await page.getAttribute('.bar a.btn', 'href'));
  check(link.includes(plus(12)) && link.includes('2 guests'), `${name}: enquiry message carries the dates`);

  // Booking form: every field and button stays inside the form box, nothing overlaps
  const formProblems = await page.evaluate(() => {
    const R = (e) => e.getBoundingClientRect();
    const form = R(document.querySelector('.bar'));
    const els = [...document.querySelectorAll('.bar input, .bar select, .bar .btn')];
    const bad = [];
    els.forEach((e, i) => {
      const r = R(e);
      if (r.left < form.left - 0.5 || r.right > form.right + 0.5) bad.push('outside:' + (e.id || e.type || e.className));
      for (let j = i + 1; j < els.length; j++) {
        const b = R(els[j]);
        if (r.left < b.right - 0.5 && b.left < r.right - 0.5 && r.top < b.bottom - 0.5 && b.top < r.bottom - 0.5) bad.push('overlap:' + i + '/' + j);
      }
    });
    return bad;
  });
  check(formProblems.length === 0, `${name}: booking form fields fit and do not overlap ${formProblems.join(',')}`);

  // Gallery lightbox
  await page.locator('.gbtn').first().click();
  await page.waitForTimeout(250);
  check((await page.locator('.lb').count()) === 1, `${name}: gallery opens a large photo`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
  check((await page.locator('.lb').count()) === 0, `${name}: Escape closes the large photo`);

  if (name === 'mobile' || name === 'small') {
    check(
      !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)),
      name + ': no sideways scrolling',
    );
    check(await page.locator('.sticky').isVisible(), name + ': sticky contact bar is visible');
  }

  // Floating Instagram button
  const ig = await page.getAttribute('.ig-float', 'href');
  check(!!ig && ig.includes('instagram.com/himalayan_hamlet'), `${name}: floating Instagram button links to the profile`);

  // Static guide pages (hidden drafts for now)
  for (const slug of ['things-to-do-in-almora', 'how-to-reach-almora']) {
    await page.goto(`http://localhost:4300/${slug}/`);
    await page.waitForSelector('h1');
    check((await page.locator('.gtable tr').count()) >= 4, `${name}: ${slug} shows its table`);
    check(
      !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)),
      `${name}: ${slug} has no sideways scrolling`,
    );
    check((await page.locator('.ig-float').count()) === 1, `${name}: ${slug} has the Instagram button`);
  }
  await page.goto('http://localhost:4300/index.html');
  await page.waitForSelector('h1');

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
