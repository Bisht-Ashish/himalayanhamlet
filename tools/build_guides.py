#!/usr/bin/env python3
"""Builds the static guide pages (public/<slug>/index.html).

Static HTML ranks well and loads instantly. Run:  python3 tools/build_guides.py
Set DRAFT = False when the pages are approved: the draft banner, highlights and the
noindex tag disappear, so Google can list the pages.
"""
import html, os, urllib.parse

DRAFT = True
DOMAIN = "https://himalayanhamlet.co.in"
WA = "https://wa.me/917892712293?text=" + urllib.parse.quote(
    "Namaste! I found Himalayan Hamlet on your website and would like to enquire about a stay in Almora.")
IG = "https://instagram.com/himalayan_hamlet"

def chk(t):
    """A fact the host should verify; highlighted only in draft mode."""
    return f'<mark class="check">{t}</mark>' if DRAFT else (t if not t.startswith("your ") else "")

def table(head, rows):
    h = "".join(f"<th>{c}</th>" for c in head)
    out = f"<table class=\"gtable\"><thead><tr>{h}</tr></thead><tbody>"
    for r in rows:
        out += "<tr>" + "".join(f'<td data-label="{head[i]}">{c}</td>' for i, c in enumerate(r)) + "</tr>"
    return out + "</tbody></table>"

PAGES = []

PAGES.append(dict(
    slug="things-to-do-in-almora",
    title="Things to do in Almora: temples, treks and day trips from a local host",
    desc="Kasar Devi, Nanda Devi Temple, Chitai, Binsar, Katarmal Sun Temple, Jageshwar and Kainchi Dham: distances and tips from Himalayan Hamlet, a family homestay in Almora.",
    h1="Things to do in Almora",
    lead="Almora is a base for slow days: temples on the ridges, forest walks, and day trips to Binsar and Jageshwar. We live here, so these are the places we send our own guests, with distances from Himalayan Hamlet.",
    body=lambda: table(["Place", "From the homestay", "Why go"], [
        ["Kasar Devi Temple", "3 km", "A hilltop temple known for meditation, for its Van Allen belt magnetic anomaly, and for the well-known people who meditated here " + chk("(add the names you want to mention, e.g. Swami Vivekananda)") + ". Valley and Himalayan views, and a calm spot at sunrise."],
        ["Nanda Devi Temple", "4 km", "The main temple of Kumaon's goddess, in the heart of Almora's main market. Visit it while you explore the local bazaar, its sweets and shops."],
        ["Chitai Golu Devta Temple", "6 km", "Shrine of the local deity Golu Devta, known for the thousands of bells left by devotees."],
        ["Binsar Wildlife Sanctuary", "12 km", "Oak and rhododendron forest, birdwatching and a wide Himalayan viewpoint; a good full-day trip."],
        ["Katarmal Sun Temple", "20 km", "A 9th-century sun temple with finely carved stone panels, worth the drive and the quiet."],
        ["Jageshwar Dham", "33 km", "A cluster of more than 100 old stone temples set in deodar forest."],
        ["Kainchi Dham", "about 40 km " + chk("(check)"), "The ashram of Neem Karoli Baba on the Nainital road, now very popular with visitors from India and abroad. It gets crowded at weekends and during its annual fair in June " + chk("(check)") + "."],
    ]) + f"""
<h2>A simple plan for three days</h2>
<ol>
<li><b>Day 1:</b> Settle in, watch the sunset from the balcony and take an evening walk. {chk("your local tip")}</li>
<li><b>Day 2:</b> Kasar Devi at sunrise, then Nanda Devi Temple and the Almora bazaar. Try the local bal mithai and singori {chk("(check)")}.</li>
<li><b>Day 3:</b> Katarmal Sun Temple and Jageshwar by car, then back for a home-cooked dinner.</li>
</ol>
<h2>Tips from your hosts</h2>
<ul>
<li>Best time for clear mountain views: {chk("your months, October to March?")}</li>
<li>Carry a torch for evening walks; the paths are not lit.</li>
<li>Kainchi Dham is on the road between Kathgodam and Almora, so you can stop there on the way in or out {chk("(check)")}.</li>
<li>We can arrange a taxi for the day trips. {chk("your arrangement and rough price?")}</li>
</ul>"""))

PAGES.append(dict(
    slug="how-to-reach-almora",
    title="How to reach Almora from Delhi, Kathgodam and Pantnagar",
    desc="Train, bus, taxi and road distances to Almora, plus the last 300 metres to Himalayan Hamlet homestay.",
    h1="How to reach Almora and Himalayan Hamlet",
    lead="The easiest way is a train or bus to Kathgodam or Haldwani, then a taxi up to Almora. Distances are approximate and differ by a few kilometres between sources, so treat them as a guide.",
    body=lambda: table(["From", "Road distance to Almora", "How"], [
        ["Kathgodam (nearest railway station)", "about 80 to 90 km", "Taxi or shared cab, roughly 3 hours " + chk("(check)")],
        ["Haldwani", "about 86 to 96 km", "Shared or private cab; buses from Delhi often end here"],
        ["Pantnagar (nearest airport)", "about 115 to 120 km", "Cab from the airport; flights do not run every day"],
        ["Nainital", "about 71 km", "Taxi"],
        ["Delhi", "about 365 to 380 km", "Overnight train to Kathgodam, then a cab; by road about 8 to 10 hours " + chk("(check)")],
    ]) + f"""
<h2>Step by step from Delhi</h2>
<ol>
<li>Take the evening train or bus to Kathgodam or Haldwani. Trains sell out in busy months, so book early.</li>
<li>From the station, take a shared cab (reported at about ₹250 to ₹300 per person) or hire a private taxi to Almora. We can help arrange one {chk("(check price)")}.</li>
<li>Kainchi Dham lies on the road from Kathgodam to Almora, so you can stop to visit on the way {chk("(check)")}.</li>
<li>Tell us when you are an hour away, and we will guide you to the parking spot.</li>
</ol>
<h2>The last 300 metres</h2>
<p>You can drive to the street parking, away from the main road. From there it is a walk of about 300 metres to the house, downhill on the way in. It is easy for most guests. Please tell us beforehand if you have elders, young children or heavy luggage, and we will meet you and help with the bags. We recommend arriving before sunset, as the path is not lit.</p>
<h2>Before you set off</h2>
<ul>
<li>Message us on WhatsApp for road and weather updates. The hills can see landslides in the monsoon, and we will tell you the latest. {chk("your usual advice?")}</li>
<li>Fill up on fuel and withdraw cash in Haldwani or Almora town {chk("(check)")}.</li>
</ul>
<p class="note">Sources: <a href="https://almora.rkmm.org/how-to-reach" rel="noopener">Ramakrishna Mission Almora</a>, <a href="https://www.ixigo.com/travel-stories/an-insiders-guide-to-almora-story-1114293" rel="noopener">ixigo</a>.</p>"""))

ICON_LOGO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 20l7-12 4 6 2.5-4L22 20z"/></svg>'
ICON_IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01"/></svg>'

def render(p):
    robots = '<meta name="robots" content="noindex, nofollow">' if DRAFT else ""
    canon = "" if DRAFT else f'<link rel="canonical" href="{DOMAIN}/{p["slug"]}/">'
    banner = ('<div class="draft"><b>Draft preview.</b> This page is not public, is hidden from Google and is not linked '
              'from the homepage. Highlighted text needs your check or your own words.</div>') if DRAFT else ""
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{html.escape(p["title"])} | Himalayan Hamlet</title>
<meta name="description" content="{html.escape(p["desc"])}">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
{robots}
{canon}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="../guide-assets/styles.css">
<link rel="stylesheet" href="../guide-assets/guide.css">
</head>
<body>
<header class="site-header solid"><div class="wrap hd">
<a class="brand" href="../"><span class="brand-ic">{ICON_LOGO}</span>Himalayan Hamlet</a>
<nav><a href="../#stay">The stay</a><a href="../#rooms">Rooms</a><a href="../#gallery">Gallery</a><a href="../#around">Around Almora</a><a href="../#faq">FAQ</a><a class="btn" href="../#top">Enquire</a></nav>
</div></header>
<main class="guide"><div class="wrap narrow">
{banner}
<p class="crumbs"><a href="../">Himalayan Hamlet</a> / Almora guide</p>
<h1>{html.escape(p["h1"])}</h1>
<p class="lead">{p["lead"]}</p>
{p["body"]()}
<p class="cta"><a class="btn" href="{WA}" target="_blank" rel="noopener">Ask us about your dates on WhatsApp</a></p>
</div></main>
<footer class="foot"><div class="wrap foot-grid">
<div><a class="brand" href="../"><span class="brand-ic">{ICON_LOGO}</span>Himalayan Hamlet</a><p>Almora, Uttarakhand</p></div>
<div><p>+91 78927 12293</p><a href="{IG}" target="_blank" rel="noopener">Instagram @himalayan_hamlet</a></div>
</div></footer>
<div class="sticky"><a class="btn" href="../#top">Check dates</a><a class="btn line" href="{WA}" target="_blank" rel="noopener">WhatsApp</a></div>
<a class="ig-float" href="{IG}" target="_blank" rel="noopener" aria-label="Instagram @himalayan_hamlet" title="Follow us on Instagram">{ICON_IG}</a>
</body>
</html>
"""

for p in PAGES:
    d = os.path.join("public", p["slug"])
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
        f.write(render(p))
    print("wrote", d)
