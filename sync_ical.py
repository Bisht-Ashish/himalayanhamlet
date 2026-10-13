#!/usr/bin/env python3
"""Fetch the Airbnb iCal feed and write booked date ranges to booked.json.

Only dates are saved (no guest names or booking details).
The website reads booked.json to warn visitors about taken dates.

Setup on the VPS:
  1. Save this file as /opt/sync_ical/sync_ical.py
  2. Put your private Airbnb iCal link in /opt/sync_ical/ical_url.txt
     (chmod 600 that file; never put the link in the website code)
  3. Test:  python3 /opt/sync_ical/sync_ical.py
  4. Run every 30 minutes:  crontab -e  and add
     */30 * * * * /usr/bin/python3 /opt/sync_ical/sync_ical.py
"""
import json
import os
import re
import sys
import tempfile
import urllib.request
from datetime import date

URL_FILE = "/opt/sync_ical/ical_url.txt"
OUTPUT = "/var/www/himalayan-hamlet/booked.json"  # your site's web root


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "homestay-calendar-sync"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read().decode("utf-8", errors="replace")


def parse_date(value):
    m = re.search(r"(\d{4})(\d{2})(\d{2})", value)
    return date(int(m[1]), int(m[2]), int(m[3])).isoformat() if m else None


def parse(ics):
    # Unfold wrapped lines, then collect each VEVENT's start and end
    text = re.sub(r"\r?\n[ \t]", "", ics)
    ranges, cur = [], None
    for line in text.splitlines():
        if line == "BEGIN:VEVENT":
            cur = {}
        elif line == "END:VEVENT" and cur is not None:
            if cur.get("start") and cur.get("end"):
                ranges.append(cur)
            cur = None
        elif cur is not None:
            if line.startswith("DTSTART"):
                cur["start"] = parse_date(line.split(":", 1)[1])
            elif line.startswith("DTEND"):
                cur["end"] = parse_date(line.split(":", 1)[1])
    today = date.today().isoformat()
    # DTEND is the checkout day (exclusive), which is what the site expects
    return sorted(
        [r for r in ranges if r["end"] >= today], key=lambda r: r["start"]
    )


def main():
    try:
        url = open(URL_FILE).read().strip()
        ranges = parse(fetch(url))
    except Exception as e:
        # Keep the previous booked.json if anything fails
        print("Sync failed:", e, file=sys.stderr)
        sys.exit(1)
    folder = os.path.dirname(OUTPUT)
    fd, tmp = tempfile.mkstemp(dir=folder, suffix=".tmp")
    with os.fdopen(fd, "w") as f:
        json.dump(ranges, f)
    os.chmod(tmp, 0o644)
    os.replace(tmp, OUTPUT)  # atomic swap so visitors never see a half-written file
    print(f"Wrote {len(ranges)} booked ranges")


if __name__ == "__main__":
    main()
