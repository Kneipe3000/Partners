// ─────────────────────────────────────────────────────────────
//  Hier pflegst du alle Partner-Casinos und Affiliate-Links.
//  Die Seite baut Vergleich, Top 3, Bonus-Walze und Rechner
//  automatisch aus dieser Liste.
// ─────────────────────────────────────────────────────────────

window.SITE = {
  name: "Bonusnacht",
  stand: "Oktober 2026",      // Datum der letzten Prüfung, erscheint auf der Seite
  beispieldaten: true,        // auf false setzen, sobald echte Partner eingetragen sind
  subid: "",                  // optional: wird als ?subid=… an jeden Affiliate-Link gehängt
  impressum: "#impressum",    // Link zu deinem Impressum (Pflicht in DE)
  datenschutz: "#datenschutz" // Link zu deiner Datenschutzerklärung
};

// Felder je Casino:
//   name, kuerzel (2 Buchstaben fürs Logo), farbe (Logo-Farbe)
//   bonus: prozent, max (€), freispiele, umsatz (×), auf ("bonus" | "beides" = Einzahlung + Bonus)
//   mindesteinzahlung (€), auszahlungStunden, zahlung [..], spiele (Anzahl), lizenz
//   bewertung (0–5, deine redaktionelle Einschätzung), highlight (kurzes Label)
//   vorteile [..], nachteile [..], agb (Kurz-AGB des Bonus), link (dein Affiliate-Link)
window.CASINOS = [
  {
    id: "aurora",
    name: "Aurora Spins",
    kuerzel: "AS",
    farbe: "#e6c06b",
    bonus: { prozent: 100, max: 100, freispiele: 50, umsatz: 30, auf: "bonus" },
    mindesteinzahlung: 10,
    auszahlungStunden: 12,
    zahlung: ["PayPal", "Visa", "Trustly"],
    spiele: 2400,
    lizenz: "GGL-Whitelist",
    bewertung: 4.7,
    highlight: "Bester Allround-Bonus",
    vorteile: ["Niedriger Umsatz von 30×", "PayPal-Auszahlung meist am selben Tag", "Deutscher Live-Chat-Support"],
    nachteile: ["Freispiele nur auf einem Slot", "Bonus verfällt nach 14 Tagen"],
    agb: "18+. Nur Neukunden. Mindesteinzahlung 10 €. Bonus 30× umsetzen innerhalb von 14 Tagen. Freispiele à 0,10 €. Es gelten die AGB des Anbieters.",
    link: "https://example.com/go/aurora"
  },
  {
    id: "nordlicht",
    name: "Nordlicht Casino",
    kuerzel: "NL",
    farbe: "#7fb6d9",
    bonus: { prozent: 100, max: 200, freispiele: 0, umsatz: 35, auf: "bonus" },
    mindesteinzahlung: 20,
    auszahlungStunden: 24,
    zahlung: ["PayPal", "Mastercard", "Paysafecard"],
    spiele: 1800,
    lizenz: "GGL-Whitelist",
    bewertung: 4.4,
    highlight: "Höchster Bonusbetrag",
    vorteile: ["Bis zu 200 € Bonus", "Große Auswahl an Jackpot-Slots", "Übersichtliche App"],
    nachteile: ["Keine Freispiele im Willkommenspaket", "Mindesteinzahlung 20 €"],
    agb: "18+. Nur Neukunden. Mindesteinzahlung 20 €. Bonus 35× umsetzen innerhalb von 30 Tagen. Es gelten die AGB des Anbieters.",
    link: "https://example.com/go/nordlicht"
  },
  {
    id: "rubin",
    name: "Rubin Royal",
    kuerzel: "RR",
    farbe: "#e2557a",
    bonus: { prozent: 50, max: 100, freispiele: 100, umsatz: 40, auf: "bonus" },
    mindesteinzahlung: 10,
    auszahlungStunden: 48,
    zahlung: ["Visa", "Klarna", "Trustly"],
    spiele: 3100,
    lizenz: "GGL-Whitelist",
    bewertung: 4.2,
    highlight: "Meiste Freispiele",
    vorteile: ["100 Freispiele verteilt auf 5 Tage", "Über 3.000 Slots", "Wöchentliche Turniere"],
    nachteile: ["Umsatz 40×", "Auszahlung bis zu 48 Stunden"],
    agb: "18+. Nur Neukunden. Mindesteinzahlung 10 €. 20 Freispiele pro Tag an 5 Tagen. Bonus 40× umsetzen. Es gelten die AGB des Anbieters.",
    link: "https://example.com/go/rubin"
  },
  {
    id: "mondschein",
    name: "Mondschein Slots",
    kuerzel: "MS",
    farbe: "#b9a7e8",
    bonus: { prozent: 100, max: 50, freispiele: 25, umsatz: 25, auf: "bonus" },
    mindesteinzahlung: 10,
    auszahlungStunden: 6,
    zahlung: ["PayPal", "Trustly", "Apple Pay"],
    spiele: 1200,
    lizenz: "GGL-Whitelist",
    bewertung: 4.3,
    highlight: "Schnellste Auszahlung",
    vorteile: ["Auszahlung oft in unter 6 Stunden", "Niedrigster Umsatz im Vergleich", "Apple Pay"],
    nachteile: ["Bonus nur bis 50 €", "Kleinere Spielauswahl"],
    agb: "18+. Nur Neukunden. Mindesteinzahlung 10 €. Bonus 25× umsetzen innerhalb von 21 Tagen. Es gelten die AGB des Anbieters.",
    link: "https://example.com/go/mondschein"
  },
  {
    id: "goldhafen",
    name: "Goldhafen",
    kuerzel: "GH",
    farbe: "#d99a5b",
    bonus: { prozent: 100, max: 150, freispiele: 30, umsatz: 35, auf: "beides" },
    mindesteinzahlung: 15,
    auszahlungStunden: 24,
    zahlung: ["PayPal", "Visa", "Giropay"],
    spiele: 2000,
    lizenz: "GGL-Whitelist",
    bewertung: 4.0,
    highlight: "Gutes Treueprogramm",
    vorteile: ["Cashback-Stufen für Stammspieler", "PayPal", "Faire Bonuslaufzeit von 30 Tagen"],
    nachteile: ["Umsatz auf Einzahlung und Bonus", "Support nur bis 22 Uhr"],
    agb: "18+. Nur Neukunden. Mindesteinzahlung 15 €. Einzahlung + Bonus 35× umsetzen innerhalb von 30 Tagen. Es gelten die AGB des Anbieters.",
    link: "https://example.com/go/goldhafen"
  },
  {
    id: "vierblatt",
    name: "Vierblatt",
    kuerzel: "VB",
    farbe: "#6fc49a",
    bonus: { prozent: 100, max: 100, freispiele: 20, umsatz: 35, auf: "bonus" },
    mindesteinzahlung: 10,
    auszahlungStunden: 24,
    zahlung: ["Paysafecard", "Visa", "Trustly"],
    spiele: 1500,
    lizenz: "GGL-Whitelist",
    bewertung: 3.9,
    highlight: "Einfacher Einstieg",
    vorteile: ["Klare, kurze Bonusbedingungen", "Paysafecard-Einzahlung", "Gute Mobilseite"],
    nachteile: ["Kein PayPal", "Wenige neue Slots pro Monat"],
    agb: "18+. Nur Neukunden. Mindesteinzahlung 10 €. Bonus 35× umsetzen innerhalb von 30 Tagen. Es gelten die AGB des Anbieters.",
    link: "https://example.com/go/vierblatt"
  }
];
