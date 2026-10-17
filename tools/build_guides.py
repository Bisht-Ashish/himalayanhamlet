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

CUR_DRAFT = True

def chk(t):
    """A fact the host should verify; highlighted in draft pages, dropped from published ones."""
    if CUR_DRAFT:
        return f'<mark class="check">{t}</mark>'
    return "" if t.startswith(("(", "your ")) else t

def table(head, rows):
    h = "".join(f"<th>{c}</th>" for c in head)
    out = f"<table class=\"gtable\"><thead><tr>{h}</tr></thead><tbody>"
    for r in rows:
        out += "<tr>" + "".join(f'<td data-label="{head[i]}">{c}</td>' for i, c in enumerate(r)) + "</tr>"
    return out + "</tbody></table>"

PAGES = []

PAGES.append(dict(
    slug="things-to-do-in-almora",
    title="Almora as we see it: places we send our guests",
    desc="The temples, forests and day trips we recommend from Himalayan Hamlet, with distances from the house, from a family that has lived in Almora for generations.",
    h1="Almora as we see it",
    lead="These are the places we send our own guests. Distances are from the house.",
    body=lambda: """
<h2>Close to the house</h2>
<ul>
<li><b>Kasar Devi Temple, 3 km.</b> A hilltop temple known for meditation, for its Van Allen belt magnetic anomaly, and for the well-known people who meditated here """ + chk("(add the names you want to mention)") + """. Valley and Himalayan views, and a calm place at sunrise.</li>
<li><b>Nanda Devi Temple, 4 km.</b> The main temple of Kumaon's goddess, in the heart of the main market. Visit it while you explore the local bazaar, its sweets and shops.</li>
<li><b>Chitai Golu Devta Temple, 6 km.</b> The shrine of the local deity Golu Devta, known for the thousands of bells left by devotees.</li>
</ul>
<h2>Day trips</h2>
<ul>
<li><b>Binsar Wildlife Sanctuary, 12 km.</b> Oak and rhododendron forest, birdwatching and a wide Himalayan viewpoint. A good full-day trip.</li>
<li><b>Katarmal Sun Temple, 20 km.</b> A 9th-century sun temple with finely carved stone panels, worth the drive and the quiet.</li>
<li><b>Jageshwar Dham, 33 km.</b> More than 100 old stone temples set in deodar forest. One guest called it the high point of their trip.</li>
</ul>
<h2>Our own tips</h2>
<p>""" + chk("your tips: the walk you take family on, the tea stall, a viewpoint tourists miss, the shop for bal mithai") + """</p>
<p>We can help guests plan their days and arrange a taxi for day trips. Just ask us on WhatsApp.</p>"""))

ICON_LOGO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 20l7-12 4 6 2.5-4L22 20z"/></svg>'
ICON_WA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-4.85A9 9 0 1 1 8 19.35L3 21zM9.2 8.4c.3 2.6 2.7 5 5.4 5.4l1.1-1.1a.8.8 0 0 1 .8-.2l1.5.6a.8.8 0 0 1 .5.9c-.2 1.1-1.2 1.7-2.3 1.6-3.4-.5-6.3-3.4-6.8-6.8-.1-1.1.5-2.1 1.6-2.3a.8.8 0 0 1 .9.5l.6 1.5a.8.8 0 0 1-.2.8L9.2 8.4z"/></svg>'
ICON_IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01"/></svg>'


PAGES.append(dict(
    slug="our-family-home-in-almora",
    draft=False,
    title="Our family home in Almora: the story of Himalayan Hamlet",
    desc="Himalayan Hamlet is a family home in Almora built by a grandfather, run by parents Arjun and Saraswati, and opened to guests since Covid. Early light on Nanda Devi, home-cooked food and a family that treats guests like family.",
    h1="Our family home in Almora",
    lead="Himalayan Hamlet is the house where my brother Nitin, my sister Manisha and I grew up. Today my parents welcome guests into it as part of the family.",
    body=lambda: """
<h2>A house with a history</h2>
<p>My grandfather built this house in Almora. Years later, my father, Arjun, added another floor, which is the floor guests stay on today. My brother Nitin, my sister Manisha and I grew up here. Then, like many people from the hills, we moved away for work and settled in Bangalore, where my wife Akansha and I live now. She has met a few of our guests on her visits too.</p>
<p>My parents, Arjun and Saraswati, stayed. During the Covid pandemic, when the house had few visitors, we began hosting guests as a homestay. We still visit for holidays and workations, so we know the house the way a guest does too. </p>
<h2>Mornings face east</h2>
<p>The house faces east, so the first sun reaches it early. In the morning light you can see Nanda Devi, Nandakot, Chaukhamba, Trishul and other peaks glowing, and you can hear the birds before you see them. With luck you will spot the local wild hens wandering around. The morning is always pleasant.</p>
<figure class="shot"><img src="../images/himalayan-range-morning.webp" alt="Snow-covered Himalayan peaks glowing in early morning light under a clear blue sky, seen from Almora" width="1280" height="960" loading="lazy"></figure>
<blockquote class="story">&ldquo;One of the most memorable parts of our stay was the breathtaking sunrise and the stunning panoramic view of the entire Himalayan range from the balcony. Waking up to such a magical view every morning was an unforgettable experience.&rdquo;<cite>Sarada, guest</cite></blockquote>
<p>My favourite hour is the slow morning. I get up, walk through the garden among the green, look at the peaks, listen to the birds, and say a small hello to familiar faces on their way to work. In the city, mornings start with a rush to beat the traffic. Here, they start slowly, and it is the thing I miss most when I am away.</p>
<figure class="shot"><img src="../images/himalayan-panorama.webp" alt="Panorama of snow-covered Himalayan peaks above pine-covered hills near Almora under a clear blue sky" width="1280" height="576" loading="lazy"></figure>
<h2>The food, and the chats around it</h2>
<p>Guests eat home-cooked Indian food made in our kitchen. There are local juices, homemade chutneys and achaar, and fruits and vegetables grown at home. Tea and coffee are shared, usually with a long chat.</p>
<blockquote class="story">&ldquo;The food aunty makes and the chats, snacks we had with the family was the star of our trip, we stayed for a week there and it felt like a family vacation.&rdquo;<cite>Piyush, guest</cite></blockquote>
<blockquote class="story">&ldquo;More than the food itself, it was her sweet little gestures, sending some sweets, extra condiments, or checking in with warmth that made every meal feel special. You genuinely begin to feel like you are not staying at a property, but with family.&rdquo;<cite>Sakshi, guest</cite></blockquote>
<p>Many guests leave asking for recipes. They ask where to find the spices, they ask for plant cuttings and tiny flower pots, and a few have even asked for advice on buying a piece of land. We are happy to oblige, apart from the land, which we leave to you to think over.</p>
<h2>Parents who go the extra mile</h2>
<p>My parents treat guests the way they would treat relatives. They help with luggage, join guests on short treks nearby, fetch groceries or milk, and explain the area: the plants, the mountains and the local culture. They also help guests plan their travel around Almora, arrange taxis, and pick up local sweets and spices to take home. Guests are welcome to walk to the farm, pick vegetables and fruit, and plant flowers. A few people around the house help keep things clean and carry bags. My sister Manisha has also looked after guests, from decorating the rooms to walks and treks. """ + chk("(check Manisha's role in your own words)") + """</p>
<blockquote class="story">&ldquo;The entire family is extremely warm and it honestly felt like we are visiting a family; that&rsquo;s how much they take care of you.&rdquo;<cite>Astha, guest</cite></blockquote>
<h2>Meet Lucy</h2>
<p>Lucy has been with our family for about ten years. She is a cream and white dog with a lovely thick coat, and she is friendly with everyone. You will often see her roaming around on the ground floor with the family, and she sometimes joins guests and us on short treks nearby.</p>
<blockquote class="story">&ldquo;Also they have a pet dog and a cat, we enjoyed playing with them.&rdquo;<cite>Divya, guest</cite></blockquote>
<h2>Solo travellers, long stays and return guests</h2>
<p>Guests often extend their stay. Some have stayed more than a month, exploring Almora and working from the house. We have hosted solo travellers too, who enjoyed time with my parents and the family, and also their own quiet time.</p>
<blockquote class="story">&ldquo;Each member played their part in making me feel safe and very welcome, which means a lot as a solo traveler in India for the first time.&rdquo;<cite>Dora, guest</cite></blockquote>
<p>Some guests now come back again and again, and they feel like family to us.</p>
<h2>The small things guests mention</h2>
<p>These are not things we advertise, but guests mention them again and again in their reviews.</p>
<ul>
<li><b>A welcome drink.</b> Guests are greeted with a glass of buransh (rhododendron) juice.</li>
<li><b>A bonfire on cold evenings,</b> arranged by my father.</li>
<li><b>Vegetables from the garden</b> for guests who want to cook in the kitchen.</li>
<li><b>A scooty to borrow or rent</b> for a short tour of town.</li>
<li><b>Company on a walk.</b> Family members have joined guests on the trek to Kasar Devi and other nearby hikes.</li>
</ul>
<blockquote class="story">&ldquo;Ashish and his family are always just a message away, yet they give you complete privacy throughout your stay. It&rsquo;s rare to find this perfect balance.&rdquo;<cite>Saurabh, guest</cite></blockquote>
<blockquote class="story">&ldquo;We booked this place for 1 day but we extended our stay here for next day as well, because we felt like home only and the food prepared by aunt is so good.&rdquo;<cite>Swati, guest</cite></blockquote>
<blockquote class="story">&ldquo;They were always there to help us, from renting a scooty, to food, to giving us right directions.&rdquo;<cite>Sanjivani, guest</cite></blockquote>
<blockquote class="story">&ldquo;For anyone wondering about work-from-home facilities, they have good network connectivity and reliable high-speed Wi-Fi. I was able to complete my office work seamlessly and attend Zoom calls without any glitches.&rdquo;<cite>Sakshi, guest</cite></blockquote>
"""))


PAGES.append(dict(
    slug="work-from-almora",
    title="Working from the mountains: Wi-Fi, a desk and slow days in Almora",
    desc="What it is really like to work remotely from Himalayan Hamlet in Almora: 100 Mbps Airtel broadband with a BSNL backup, power backup, a quiet desk or balcony, and weekly and monthly stays.",
    h1="Working from the mountains",
    lead="We work from this house ourselves, often. This is what it is really like: the internet, the quiet, and what a work day looks like with the Himalayas outside.",
    body=lambda: """
<h2>The connection</h2>
<ul>
<li><b>Airtel broadband, 100 Mbps,</b> with a <b>BSNL line as backup</b>.</li>
<li><b>An inverter</b> keeps the Wi-Fi running. Power cuts are rare, and mostly happen in bad weather.</li>
<li><b>Mobile networks work well,</b> both Jio and Airtel.</li>
<li><b>It has been reliable.</b> The only interruptions we see are during very heavy rain.</li>
</ul>
<blockquote class="story">&ldquo;For anyone wondering about work-from-home facilities, they have good network connectivity and reliable high-speed Wi-Fi. I was able to complete my office work seamlessly and attend Zoom calls without any glitches.&rdquo;<cite>Sakshi, guest</cite></blockquote>
<h2>Where you will work</h2>
<p>Both bedrooms have a work desk set up. Many guests prefer the balcony instead, with the morning sun and the pleasant evenings.</p>
<p>It is quiet during the day. You hear birds, the wind moving through the dense forest nearby, and now and then the sun warming the tin roof. Sometimes the dogs are playing around outside.</p>
<blockquote class="story">&ldquo;Great Wifi. Awesome home cooked meals. Very quiet and private. Himalayan views. Well equipped kitchen. Power Backup.&rdquo;<cite>Vidit, guest</cite></blockquote>
<h2>A work day here</h2>
<p>This is how I spend my own days when I work from the house. It is a slow life, and you have time for yourself, so it is easy to focus.</p>
<ul>
<li>Work with the morning sun on the balcony, and take breaks looking at the open valley and the snow-capped peaks.</li>
<li>Have home-cooked food instead of the office cafeteria, and say hello to the familiar faces around.</li>
<li>Walk around the house, play with the dogs, help my parents with small things, and have long conversations with them.</li>
<li>Between calls, water the plants and help in the kitchen garden, which is a good way to rest your eyes.</li>
<li>In the evening, go out for a walk. Kasar Devi is about a 10 minute drive, where you can sit in a cafe and watch the sunset with an even more open view of the peaks.</li>
<li>In winter, finish the day with a bonfire.</li>
</ul>
<h2>Staying longer</h2>
<ul>
<li>We offer longer stays depending on availability, with <b>weekly and monthly discounts</b>. Message us with your dates for the rates.</li>
<li>Meals are not part of the long-stay rate. The kitchen is well equipped, so many guests cook for themselves.</li>
<li>There is an automatic washing machine, and guests do their own laundry.</li>
<li>A grocery store is about 500 metres away on the main road with most daily needs. Local farmers also pass by with fresh vegetables from their fields, and you can buy from them directly. Milk can be arranged from the village, and the nearby shop will deliver groceries to the house.</li>
</ul>
<blockquote class="story">&ldquo;If you are looking for a long term stay and an abode away from the world, this is the place for you!&rdquo;<cite>Sanjivani, guest</cite></blockquote>
<h2>The longest stay: six weeks</h2>
<div class="feature">
<p class="feature-lead">A solo traveller came to explore on her own, and stayed six weeks.</p>
<ul class="chips">
<li>6 weeks</li>
<li>Holi with the neighbours</li>
<li>Joined by her mother, a friend and her husband</li>
</ul>
<p>She spent her days at the slow pace of the town. She visited the temples around, some that even I did not know. She learned about spirituality, wrote a diary of everything, and got to know the neighbours. In the evenings we shared tea and long talks, and she cooked with the family and came along with us to the cafes. She celebrated Holi here.</p>
<p>After a few weeks her mother came to stay for a week. Then a friend joined her, and finally her husband. She is fun and full of life, and the house was happier for it.</p>
<blockquote class="story">&ldquo;Brightly lit airy rooms that make it perfect for relaxation, positivity, study, and spiritual practice.&rdquo;<cite>Guest, six-week stay</cite></blockquote>
<blockquote class="story">&ldquo;Loved my stay here and hope to have a long extended stay for silent time, writing, study and temple visits.&rdquo;<cite>Guest, six-week stay</cite></blockquote>
</div>
"""))


def render(p):
    global CUR_DRAFT
    CUR_DRAFT = draft = p.get("draft", True)
    robots = '<meta name="robots" content="noindex, nofollow">' if draft else ""
    canon = "" if draft else f'<link rel="canonical" href="{DOMAIN}/{p["slug"]}/">'
    banner = ('<div class="draft"><b>Draft preview.</b> This page is not public, is hidden from Google and is not linked '
              'from the homepage. Highlighted text needs your check or your own words.</div>') if draft else ""
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="../guide-assets/styles.css">
<link rel="stylesheet" href="../guide-assets/guide.css?v=notes5">
</head>
<body>
<header class="site-header solid"><div class="wrap hd">
<a class="brand" href="../"><span class="brand-ic">{ICON_LOGO}</span>Himalayan Hamlet</a>
<nav><a href="../#stay">The stay</a><a href="../#rooms">Rooms</a><a href="../#gallery">Gallery</a><a href="../#around">Around Almora</a><a href="../#faq">FAQ</a><a href="../our-family-home-in-almora/">Our story</a><a class="btn" href="../#top">Enquire</a></nav>
<button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="m-sheet"><span></span><span></span></button>
</div>

</header>
<div class="m-sheet" id="m-sheet" hidden><a href="../#stay">The stay</a><a href="../#rooms">Rooms</a><a href="../#gallery">Gallery</a><a href="../#around">Around Almora</a><a href="../#faq">FAQ</a><a href="../our-family-home-in-almora/">Our story</a><a class="m-cta" href="../#top">Enquire</a></div>
<script>(function(){{var b=document.querySelector('.menu-btn'),s=document.getElementById('m-sheet'),h=document.querySelector('.site-header');function t(o){{h.classList.toggle('m-open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');s.hidden=!o;document.body.style.overflow=o?'hidden':''}}b.onclick=function(){{t(b.getAttribute('aria-expanded')!=='true')}};s.onclick=function(e){{if(e.target.closest('a'))t(false)}};document.onkeydown=function(e){{if(e.key==='Escape')t(false)}}}})()</script>
<main class="guide"><div class="wrap narrow">
{banner}
<p class="crumbs"><a href="../">Himalayan Hamlet</a> / Almora guide</p>
<h1>{html.escape(p["h1"])}</h1>
<p class="lead">{p["lead"]}</p>
{p["body"]()}
</div></main>
<footer class="foot"><div class="wrap foot-grid">
<div><a class="brand" href="../"><span class="brand-ic">{ICON_LOGO}</span>Himalayan Hamlet</a><p>Almora, Uttarakhand</p></div>
<div><p>+91 78927 12293</p><a href="{IG}" target="_blank" rel="noopener">Instagram @himalayan_hamlet</a></div>
</div></footer>
<a class="wa-float" href="{WA}" target="_blank" rel="noopener" aria-label="Message us on WhatsApp" title="Message us on WhatsApp">{ICON_WA}</a>
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
