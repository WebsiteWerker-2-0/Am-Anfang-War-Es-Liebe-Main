"""Übernimmt die Beiträge der Altseite in die neue Website.

Liest altseite/json/posts.json, bereinigt das WordPress-HTML, kopiert die
verwendeten Medien nach website/public/medien/ und schreibt
website/src/content/beitraege.json. Einmalig bzw. nach Änderungen ausführen:

    python3 altseite/beitraege-uebernehmen.py
"""
import html, json, os, re, shutil, unicodedata
from bs4 import BeautifulSoup, Comment

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(ROOT, "..", "website")
UPLOADS = re.compile(r"https?://(?:www\.)?am-anfang-war-es-liebe\.de/wp-content/uploads/([^\"'\s?#]+)")

# Interne Links der Altseite auf die neue Struktur umbiegen
INTERN = {
    "hilfen": "/hilfe", "kontaktformular": "/kontakt", "kontakt": "/kontakt",
    "aktuelles": "/aktuelles", "der-selbstcheck": "/selbstcheck", "": "/",
    "infos": "/infos", "downloads": "/infos", "der-arbeitskreis": "/arbeitskreis",
    "internetspuren-loeschen": "/internetspuren",
}
KEEP = {
    "a": {"href"}, "img": {"src", "alt", "width", "height"}, "video": {"src", "controls", "width", "height"},
    "p": set(), "br": set(), "strong": set(), "em": set(), "ul": set(), "ol": set(), "li": set(),
    "h2": set(), "h3": set(), "figure": set(), "figcaption": set(), "blockquote": set(),
    "table": set(), "tbody": set(), "tr": set(), "td": set(), "th": set(),
}
RENAME = {"b": "strong", "i": "em", "h1": "h2", "h4": "h3", "h5": "h3", "h6": "h3"}


def slugify(text, limit=70):
    t = text.lower().replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    t = re.sub(r"[^a-z0-9]+", "-", t).strip("-")
    if len(t) > limit:
        t = t[:limit].rsplit("-", 1)[0]
    return t


def media(url):
    rel = UPLOADS.match(url).group(1)
    src = os.path.join(ROOT, "uploads", rel)
    dst = os.path.join(SITE, "public", "medien", rel)
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(src, dst)
    return "/medien/" + rel


def fix_href(href):
    if UPLOADS.match(href):
        return media(href)
    m = re.match(r"https?://(?:www\.)?(?:am-anfang-war-es-liebe\.de|localhost/wordpress)/?([^?#]*?)/?$", href)
    if m:
        return INTERN.get(m.group(1).split("/")[-1], "/")
    return href


def clean(raw):
    raw = re.sub(r"\[download[^\]]*\]", "", raw)
    soup = BeautifulSoup(raw, "html.parser")
    for c in soup.find_all(string=lambda s: isinstance(s, Comment)):
        c.extract()
    for t in soup.find_all(["script", "style", "object", "iframe", "noscript", "form", "input", "button"]):
        t.decompose()
    for t in soup.select(".wp-block-cover__background"):
        t.decompose()
    for t in soup.find_all(True):
        name = RENAME.get(t.name, t.name)
        if name not in KEEP:
            t.unwrap()
            continue
        t.name = name
        t.attrs = {k: v for k, v in t.attrs.items() if k in KEEP[name]}
        if name == "a" and t.get("href"):
            t["href"] = fix_href(t["href"])
        if name in ("img", "video") and t.get("src") and UPLOADS.match(t["src"]):
            t["src"] = media(t["src"])
        if name == "img":
            t["loading"] = "lazy"
            t["alt"] = t.get("alt", "")
    # leere Absätze und Überschriften entfernen
    for t in soup.find_all(["p", "h2", "h3", "li", "strong", "em", "figcaption"]):
        if not t.get_text(strip=True).replace("\xa0", "") and not t.find(["img", "video", "br"]):
            t.decompose()
    out = str(soup)
    out = re.sub(r"(\s*<br/?>\s*){2,}", "<br/>", out)
    out = re.sub(r"\n{2,}", "\n", out).strip()
    return out


def excerpt(clean_html, limit=220):
    text = BeautifulSoup(clean_html, "html.parser").get_text(" ", strip=True)
    text = re.sub(r"\s+", " ", text)
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0] + " …"


posts = json.load(open(os.path.join(ROOT, "json", "posts.json")))
cats = {c["id"]: c["name"] for c in json.load(open(os.path.join(ROOT, "json", "categories.json")))}
out = []
for p in sorted(posts, key=lambda p: p["date"], reverse=True):
    title = html.unescape(re.sub(r"<[^>]+>", "", p["title"]["rendered"]))
    title = re.sub(r"\s+", " ", title).strip()
    body = clean(p["content"]["rendered"])
    first_img = BeautifulSoup(body, "html.parser").find("img")
    out.append({
        "slug": slugify(title),
        "title": title,
        "date": p["date"][:10],
        "categories": [cats.get(c, "") for c in p["categories"]],
        "excerpt": excerpt(body),
        "image": first_img["src"] if first_img else None,
        "html": body,
        "source": p["link"],
    })

slugs = [b["slug"] for b in out]
assert len(slugs) == len(set(slugs)), "doppelte Slugs"
with open(os.path.join(SITE, "src", "content", "beitraege.json"), "w") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print(len(out), "Beiträge übernommen")
