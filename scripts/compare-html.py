#!/usr/bin/env python3
"""Vergleicht das ausgelieferte HTML zweier laufender Server Seite für Seite.

Zweck: Nach Umbauten zeigen, dass die Website unverändert aussieht (zum Beispiel main gegen einen Branch).
Skripte, Stylesheets, Build-Hashes und Kommentare werden ignoriert, Text und Struktur zählen.

  # Referenz (main) auf Port 3102, geprüfter Stand auf Port 3100, jeweils `npm run start -- -p <Port>`
  python3 scripts/compare-html.py http://localhost:3102 http://localhost:3100 website/src/content/posts.json
  # nur einzelne Seiten, mit mehr Zeilen je Unterschied
  LINES=30 python3 scripts/compare-html.py http://localhost:3102 http://localhost:3100 website/src/content/posts.json /hilfe /kurse

Bekannte, gewollte Unterschiede (Stand 17.10.2026): /hilfe (Abschnitt Spurensicherung), /kurse (Hinweis ohne
äußeren Kasten), /aktuelles/<unbekannt> (Weiterleitung statt 404); im CMS-Modus zusätzlich /infos (Dateien unter
/dateien statt /downloads) und die Beitragsseiten (neue Struktur mit Bildern und Dokumenten).
Zwei Server dürfen nicht dasselbe .next-Verzeichnis nutzen (sie überschreiben sich den Zwischenspeicher).
"""
import re, sys, json, urllib.request, urllib.error, difflib, os
from html.parser import HTMLParser

POSTS = json.load(open(sys.argv[3]))
A, B = sys.argv[1], sys.argv[2]
SKIP = {"script", "link", "style", "noscript"}

class Canon(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.skip, self.in_body, self.glue = [], 0, False, False
    def handle_comment(self, data): pass
    def handle_starttag(self, tag, attrs):
        self.glue = False
        if tag in SKIP: self.skip += 1; return
        if tag == "title": self.out.append("<title>"); return
        if tag == "meta":
            d = dict(attrs)
            if d.get("name") in ("description", "robots", "referrer", "viewport", "color-scheme", "format-detection"):
                self.out.append(f"<meta {d.get('name')}={d.get('content')}>")
            return
        if tag == "body": self.in_body = True
        if not self.in_body: return
        d = {}
        for k, v in attrs:
            v = v or ""
            if k == "class": v = re.sub(r"(literata|ibm_plex_sans_arabic|ibm_plex_sans|noto_naskh_arabic)_[0-9a-f]+-module__[A-Za-z0-9_-]+__variable", r"\1__variable", v)
            d[k] = v
        if tag == "img":
            for k in ("src", "srcset", "style", "srcSet"): d.pop(k, None)
        d.pop("data-nimg", None)
        self.out.append("<%s %s>" % (tag, " ".join(f'{k}="{v}"' for k, v in sorted(d.items()))))
    def handle_endtag(self, tag):
        self.glue = False
        if tag in SKIP: self.skip = max(0, self.skip - 1); return
        if tag == "title": self.out.append("</title>"); return
        if self.in_body: self.out.append(f"</{tag}>")
    def handle_data(self, data):
        if self.skip: return
        t = re.sub(r"\s+", " ", data)
        if t.strip() == "": return
        if self.out and not self.out[-1].startswith("<") and self.glue: self.out[-1] += " " + t.strip()
        else: self.out.append(t.strip())
        self.glue = True

def fetch(base, path):
    try:
        r = urllib.request.urlopen(base + path); code, body = r.status, r.read().decode()
    except urllib.error.HTTPError as e:
        code, body = e.code, e.read().decode()
    p = Canon(); p.feed(body)
    return code, p.out

routes = ['/','/aktuelles','/arbeitskreis','/datenschutz','/hilfe','/impressum','/infos','/internetspuren','/kontakt','/kurse','/selbstcheck','/sprachen','/does-not-exist','/aktuelles/xyz']
routes += ['/aktuelles/' + p['slug'] for p in POSTS]
only = sys.argv[4:]
bad = 0
for r in routes:
    if only and r not in only: continue
    ca, oa = fetch(A, r); cb, ob = fetch(B, r)
    if ca == cb and oa == ob: continue
    bad += 1
    print("DIFF", r, ca, cb, len(oa), len(ob))
    for line in list(difflib.unified_diff(oa, ob, lineterm="", n=0))[:int(os.environ.get('LINES','14'))]:
        print("   ", line[:230])
print("geprüft:", len(routes) if not only else len(only), "| abweichend:", bad)
