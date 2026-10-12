# Bonusnacht – Casino-Vergleich mit Affiliate-Links

Statische Promo-Seite (HTML/CSS/JS, kein Build-Schritt). `index.html` im Browser öffnen oder den Ordner auf einen beliebigen Static-Host legen (GitHub Pages, Netlify, Vercel).

## Partner und Links pflegen

Alles steht in **`data/casinos.js`**:

- `SITE`: Seitenname, Prüfdatum (`stand`), `beispieldaten` (auf `false` setzen, sobald echte Partner drin sind), optionale `subid` für Tracking, Links zu Impressum und Datenschutz.
- `CASINOS`: ein Eintrag pro Anbieter mit Bonus, Umsatz, Auszahlungsdauer, Zahlungsarten, Bewertung, Vor-/Nachteilen, Kurz-AGB und **`link` (dein Affiliate-Link)**.

Top 3, Vergleichsliste, Bonus-Walze, Bonus-Rechner und mobiler Sticky-Button entstehen automatisch aus dieser Liste. Sortierung „Gesamtwertung“ richtet sich nach `bewertung`.

## Tracking

Jeder Affiliate-Klick sendet `{event: "affiliate_click", casino, position}` an `window.dataLayer` (falls Google Tag Manager eingebunden ist) und löst das DOM-Event `affiliate-click` aus.

## Rechtliches (Deutschland)

- Nur Anbieter mit GGL-Erlaubnis bewerben (amtliche Whitelist prüfen).
- Kennzeichnung als Werbung, 18+-Hinweis, Suchthinweis und Beratungstelefon sind eingebaut. Nicht entfernen.
- Impressum und Datenschutzerklärung musst du selbst ergänzen.
- Alle Links tragen `rel="sponsored nofollow noopener"`.
