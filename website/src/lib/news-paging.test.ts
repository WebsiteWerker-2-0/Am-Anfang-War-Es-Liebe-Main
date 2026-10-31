import assert from "node:assert/strict";
import { test } from "node:test";
import { newsPageHref, newsPaging } from "./news-paging";

test("ohne Angabe zehn Beiträge auf Seite 1", () => {
  assert.deepEqual(newsPaging(23), { perPage: 10, page: 1, pageCount: 3, start: 0, end: 10 });
});

test("gewählte Anzahl und Seite, letzte Seite endet am letzten Beitrag", () => {
  assert.deepEqual(newsPaging(60, { anzahl: "25", seite: "3" }), { perPage: 25, page: 3, pageCount: 3, start: 50, end: 60 });
});

test("ungültige Werte aus der Adresse fallen zurück", () => {
  assert.equal(newsPaging(60, { anzahl: "1000" }).perPage, 10);
  assert.equal(newsPaging(60, { seite: "abc" }).page, 1);
  assert.equal(newsPaging(60, { seite: "99" }).page, 6);
  assert.equal(newsPaging(60, { seite: "0" }).page, 1);
  assert.equal(newsPaging(60, { anzahl: ["25", "50"] }).perPage, 10);
});

test("ohne Beiträge bleibt eine leere erste Seite", () => {
  assert.deepEqual(newsPaging(0), { perPage: 10, page: 1, pageCount: 1, start: 0, end: 0 });
});

test("Adresse lässt Standardwerte weg", () => {
  assert.equal(newsPageHref(10, 1), "/aktuelles#beitraege");
  assert.equal(newsPageHref(25, 2), "/aktuelles?anzahl=25&seite=2#beitraege");
});
