(() => {
  const SITE = window.SITE || {};
  const CASINOS = (window.CASINOS || []).slice();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const eur = n => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rand = n => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };

  // ── Hilfsfunktionen für Angebote ─────────────────────────
  const bonusText = c => {
    const b = c.bonus;
    let t = `${b.prozent} % bis ${eur(b.max)}`;
    if (b.freispiele) t += ` + ${b.freispiele} Freispiele`;
    return t;
  };
  const affLink = c => {
    if (!SITE.subid) return c.link;
    try { const u = new URL(c.link); u.searchParams.set("subid", SITE.subid); return u.toString(); }
    catch { return c.link; }
  };
  const logo = c => `<span class="logo" style="--c:${esc(c.farbe)}" aria-hidden="true">${esc(c.kuerzel)}</span>`;
  const stars = c => `<span class="stars" style="--v:${c.bewertung}" aria-label="Wertung ${c.bewertung.toLocaleString("de-DE")} von 5"><i></i>${c.bewertung.toFixed(1).replace(".", ",")}</span>`;
  const cta = (c, label = "Bonus sichern", cls = "btn btn-gold") =>
    `<a class="${cls}" href="${esc(affLink(c))}" target="_blank" rel="sponsored nofollow noopener" data-aff="${esc(c.id)}">${label}</a>`;

  // Klicks auf Affiliate-Links an ein vorhandenes Tracking melden (z. B. Google Tag Manager)
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-aff]");
    if (!a) return;
    const detail = { event: "affiliate_click", casino: a.dataset.aff, position: a.dataset.pos || "" };
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
    document.dispatchEvent(new CustomEvent("affiliate-click", { detail }));
  });

  // ── Seitenweite Angaben ─────────────────────────────────
  $$("[data-site=stand]").forEach(el => el.textContent = SITE.stand || "");
  $$("[data-count]").forEach(el => el.textContent = CASINOS.length);
  $("#demo-banner").hidden = !SITE.beispieldaten;
  if (SITE.impressum) $("#l-impressum").href = SITE.impressum;
  if (SITE.datenschutz) $("#l-datenschutz").href = SITE.datenschutz;

  const ranked = CASINOS.slice().sort((a, b) => b.bewertung - a.bewertung);
  const best = ranked[0];
  if (best) {
    const h = $("#header-cta");
    h.innerHTML = `<span class="hide-sm">Top-Bonus: </span>${esc(best.name)}`;
    h.href = affLink(best);
    h.target = "_blank";
    h.rel = "sponsored nofollow noopener";
    h.dataset.aff = best.id;
    h.dataset.pos = "header";
  }

  // ── Top 3 ───────────────────────────────────────────────
  const places = ["first", "second", "third"];
  $("#podium").innerHTML = ranked.slice(0, 3).map((c, i) => `
    <article class="pod ${places[i]}">
      <span class="pod-rank">Platz ${i + 1}</span>
      <div class="pod-top">${logo(c)}<div><h3>${esc(c.name)}</h3><div class="tag">${esc(c.highlight)}</div></div></div>
      <div class="pod-bonus">${esc(bonusText(c))}</div>
      <div class="pod-meta">
        <span class="chip-k">Umsatz <b>${c.bonus.umsatz}×</b></span>
        <span class="chip-k">Auszahlung <b>≤ ${c.auszahlungStunden} h</b></span>
        <span class="chip-k">ab <b>${eur(c.mindesteinzahlung)}</b></span>
      </div>
      ${stars(c)}
      ${cta(c, "Zum Angebot").replace("data-aff", `data-pos="top${i + 1}" data-aff`)}
    </article>`).join("");

  // ── Vergleichsliste ─────────────────────────────────────
  const list = $("#list");
  const rows = new Map();
  CASINOS.forEach(c => {
    const li = document.createElement("li");
    li.className = "row";
    li.dataset.id = c.id;
    li.innerHTML = `
      <div class="row-main">
        <span class="rank"></span>
        <div class="row-id">${logo(c)}<div><h3>${esc(c.name)}</h3><div class="tag">${esc(c.highlight)}</div></div></div>
        <div class="row-bonus">
          <strong>${esc(bonusText(c))}</strong>
          <div class="row-facts">
            <span class="chip-k">Umsatz <b>${c.bonus.umsatz}×</b> ${c.bonus.auf === "beides" ? "auf Einz. + Bonus" : "auf Bonus"}</span>
            <span class="chip-k">Auszahlung <b>≤ ${c.auszahlungStunden} h</b></span>
            <span class="chip-k">Mindesteinz. <b>${eur(c.mindesteinzahlung)}</b></span>
            <span class="chip-k">${c.zahlung.map(esc).join(" · ")}</span>
          </div>
        </div>
        <div class="row-act">
          ${stars(c)}
          <button type="button" class="more" aria-expanded="false" aria-controls="d-${esc(c.id)}">Details</button>
          ${cta(c).replace("data-aff", 'data-pos="liste" data-aff')}
        </div>
      </div>
      <div class="details" id="d-${esc(c.id)}"><div><div class="details-inner">
        <div><h4>Vorteile</h4><ul class="pros">${c.vorteile.map(v => `<li>${esc(v)}</li>`).join("")}</ul></div>
        <div><h4>Nachteile</h4><ul class="cons">${c.nachteile.map(v => `<li>${esc(v)}</li>`).join("")}</ul></div>
        <p class="terms">${esc(c.lizenz)} · ${c.spiele.toLocaleString("de-DE")} Spiele · ${esc(c.agb)}</p>
      </div></div></div>`;
    $(".more", li).addEventListener("click", e => {
      const open = li.classList.toggle("open");
      e.currentTarget.setAttribute("aria-expanded", open);
      e.currentTarget.textContent = open ? "Weniger" : "Details";
    });
    rows.set(c.id, li);
    list.append(li);
  });

  const FILTERS = {
    alle: () => true,
    freispiele: c => c.bonus.freispiele > 0,
    umsatz: c => c.bonus.umsatz <= 30,
    schnell: c => c.auszahlungStunden <= 12,
    paypal: c => c.zahlung.includes("PayPal")
  };
  const SORTS = {
    bewertung: (a, b) => b.bewertung - a.bewertung,
    max: (a, b) => b.bonus.max - a.bonus.max || b.bewertung - a.bewertung,
    umsatz: (a, b) => a.bonus.umsatz - b.bonus.umsatz || b.bewertung - a.bewertung,
    auszahlung: (a, b) => a.auszahlungStunden - b.auszahlungStunden || b.bewertung - a.bewertung
  };
  let filter = "alle", sort = "bewertung";

  function renderList(animate) {
    // FLIP: Positionen merken, neu ordnen, dann von alt nach neu animieren
    const before = new Map();
    if (animate && !reduce) rows.forEach((li, id) => before.set(id, li.getBoundingClientRect().top));
    const shown = CASINOS.filter(FILTERS[filter]).sort(SORTS[sort]);
    rows.forEach(li => li.hidden = true);
    shown.forEach((c, i) => {
      const li = rows.get(c.id);
      li.hidden = false;
      $(".rank", li).textContent = "#" + (i + 1);
      list.append(li);
    });
    $("#empty").hidden = shown.length > 0;
    if (!animate || reduce) return;
    shown.forEach(c => {
      const li = rows.get(c.id);
      const old = before.get(c.id);
      const now = li.getBoundingClientRect().top;
      li.style.animation = "none";
      if (old === undefined || (old === 0 && now !== 0)) {
        li.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "ease-out" });
      } else if (old !== now) {
        li.animate([{ transform: `translateY(${old - now}px)` }, { transform: "none" }], { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)" });
      }
    });
  }
  $$(".fchip").forEach(b => b.addEventListener("click", () => {
    filter = b.dataset.filter;
    $$(".fchip").forEach(x => x.setAttribute("aria-pressed", x === b));
    renderList(true);
  }));
  $("#sort").addEventListener("change", e => { sort = e.target.value; renderList(true); });
  renderList(false);

  // ── Bonus-Walze ─────────────────────────────────────────
  const strip = $("#reel-strip");
  const machine = $(".reel-machine");
  const reelItem = c => `<div class="reel-item">${logo(c)}<div><b>${esc(c.name)}</b><span>${esc(bonusText(c))}</span></div></div>`;
  let current = best;
  function showReel(c) {
    current = c;
    strip.innerHTML = reelItem(c);
    strip.style.transition = "none";
    strip.style.transform = "translateY(0)";
    const a = $("#reel-cta");
    a.href = affLink(c);
    a.dataset.aff = c.id;
    a.dataset.pos = "walze";
  }
  if (best) showReel(best);

  let spinning = false;
  $("#reel-spin").addEventListener("click", async () => {
    if (spinning || !CASINOS.length) return;
    spinning = true;
    const btn = $("#reel-spin");
    btn.disabled = true;
    machine.classList.remove("won");
    $("#reel-result").textContent = "Die Walze läuft …";

    const target = CASINOS[rand(CASINOS.length)];
    const seq = [target];
    for (let i = 0; i < 22; i++) seq.push(CASINOS[rand(CASINOS.length)]);
    seq.push(current);
    // Die Walze läuft nach unten: oben steht das Ziel, unten das aktuelle Angebot
    strip.innerHTML = seq.map(reelItem).join("");
    const h = $(".reel-window").clientHeight;
    const dur = reduce ? 1 : 2600;
    strip.style.transition = "none";
    strip.style.transform = `translateY(${-(seq.length - 1) * h}px)`;
    strip.offsetHeight;
    strip.style.transition = `transform ${dur}ms cubic-bezier(.12,.72,.18,1.03)`;
    strip.style.transform = "translateY(0)";
    await new Promise(r => setTimeout(r, dur + 60));

    showReel(target);
    machine.classList.add("won");
    $("#reel-result").textContent = `${target.name}: ${bonusText(target)}, Umsatz ${target.bonus.umsatz}×.`;
    btn.disabled = false;
    btn.textContent = "Nochmal drehen";
    spinning = false;
  });

  // ── Bonus-Rechner ───────────────────────────────────────
  const sel = $("#c-casino");
  sel.innerHTML = ranked.map(c => `<option value="${esc(c.id)}">${esc(c.name)} · ${esc(bonusText(c))}</option>`).join("") +
    `<option value="eigene">Eigene Werte</option>`;
  const inp = { dep: $("#c-dep"), pct: $("#c-pct"), max: $("#c-max"), wr: $("#c-wr"), on: $("#c-on") };
  function loadCasino(id) {
    const c = CASINOS.find(x => x.id === id);
    if (!c) return;
    inp.pct.value = c.bonus.prozent;
    inp.max.value = c.bonus.max;
    inp.wr.value = c.bonus.umsatz;
    inp.on.value = c.bonus.auf;
    inp.dep.value = Math.max(c.mindesteinzahlung, Math.min(+inp.dep.max, Math.round(c.bonus.max * 100 / c.bonus.prozent / 5) * 5));
  }

  const counters = new Map();
  function countTo(el, to) {
    const from = counters.get(el) ?? 0;
    counters.set(el, to);
    if (reduce) { el.textContent = eur(to); return; }
    const t0 = performance.now(), d = 500;
    const step = t => {
      const p = Math.min(1, (t - t0) / d);
      el.textContent = eur(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1 && counters.get(el) === to) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function calc() {
    const dep = +inp.dep.value || 0;
    const pct = Math.max(0, +inp.pct.value || 0);
    const max = Math.max(0, +inp.max.value || 0);
    const wr = Math.max(0, +inp.wr.value || 0);
    const bonus = Math.min(dep * pct / 100, max);
    const basis = inp.on.value === "beides" ? dep + bonus : bonus;
    const turn = basis * wr;
    $("#c-dep-out").textContent = eur(dep);
    countTo($("#o-bonus"), bonus);
    countTo($("#o-total"), dep + bonus);
    countTo($("#o-turn"), turn);

    // Balken: 0 € bis 10.000 € Umsatz, Farbe wandert von grün nach rot
    const p = Math.min(1, turn / 10000);
    const bar = $("#o-bar");
    bar.style.width = (p * 100) + "%";
    bar.style.backgroundPosition = (p * 100) + "% 0";

    const spins = Math.ceil(turn / 1);
    const hours = spins * 5 / 3600;
    $("#o-note").innerHTML = turn > 0
      ? `Bei 1 € pro Spin sind das <b>${spins.toLocaleString("de-DE")} Spins</b>. Mit der gesetzlichen Mindestdauer von 5 Sekunden pro Spin brauchst du dafür mindestens <b>${hours.toLocaleString("de-DE", { maximumFractionDigits: 1 })} Stunden</b> reine Spielzeit.`
      : "Ohne Umsatzbedingung ist der Bonus sofort auszahlbar.";
  }
  sel.addEventListener("change", () => { loadCasino(sel.value); calc(); });
  ["dep", "pct", "max", "wr", "on"].forEach(k => inp[k].addEventListener("input", () => {
    if (k !== "dep") sel.value = "eigene";
    calc();
  }));
  $("#calc-form").addEventListener("submit", e => e.preventDefault());
  if (best) { sel.value = best.id; loadCasino(best.id); }
  calc();

  // ── Sticky-CTA auf dem Handy ────────────────────────────
  const sticky = $("#sticky-cta");
  if (best) {
    sticky.hidden = false;
    sticky.href = affLink(best);
    sticky.dataset.aff = best.id;
    sticky.dataset.pos = "sticky";
    $("#sticky-name").textContent = best.name;
    $("#sticky-bonus").textContent = bonusText(best);
    const hero = $(".hero");
    new IntersectionObserver(([e]) => sticky.classList.toggle("show", !e.isIntersecting)).observe(hero);
  }

  // ── Hero-Hintergrund: schwebende Jetons ──────────────────
  const cv = $("#hero-fx");
  const ctx = cv.getContext("2d");
  const COLORS = ["#e6c06b", "#d2445f", "#7fb6d9", "#6fc49a", "#2a1a2c"];
  let W = 0, H = 0, chips = [], mx = 0, my = 0;
  function size() {
    const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
    W = r.width; H = r.height;
    cv.width = W * d; cv.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  function makeChips() {
    const n = W < 600 ? 9 : 16;
    chips = Array.from({ length: n }, (_, i) => {
      const z = .35 + Math.random() * .65;
      return { x: Math.random() * W, y: Math.random() * H, z, r: 10 + z * 22, a: Math.random() * 6.28, va: (Math.random() - .5) * .02, vy: .15 + z * .35, c: COLORS[i % COLORS.length] };
    });
  }
  function drawChip(k) {
    const x = k.x + mx * k.z * 24, y = k.y + my * k.z * 16;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(k.a);
    ctx.scale(1, .55 + .45 * Math.abs(Math.cos(k.a * .7)));
    ctx.globalAlpha = .18 + k.z * .45;
    ctx.fillStyle = k.c;
    ctx.beginPath(); ctx.arc(0, 0, k.r, 0, 6.283); ctx.fill();
    ctx.fillStyle = "#f5ecdc";
    for (let i = 0; i < 6; i++) {
      ctx.save(); ctx.rotate(i * Math.PI / 3);
      ctx.fillRect(-k.r * .12, -k.r, k.r * .24, k.r * .28);
      ctx.restore();
    }
    ctx.strokeStyle = "rgba(245,236,220,.6)";
    ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, 0, k.r * .62, 0, 6.283); ctx.stroke();
    ctx.restore();
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const k of chips) {
      k.y -= k.vy; k.a += k.va;
      if (k.y < -40) { k.y = H + 40; k.x = Math.random() * W; }
      drawChip(k);
    }
    if (!reduce && heroVisible) requestAnimationFrame(frame);
  }
  let heroVisible = true;
  size(); makeChips();
  if (reduce) frame();
  else {
    new IntersectionObserver(([e]) => { const was = heroVisible; heroVisible = e.isIntersecting; if (heroVisible && !was) requestAnimationFrame(frame); }).observe(cv);
    requestAnimationFrame(frame);
    addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  }
  addEventListener("resize", () => { size(); makeChips(); if (reduce) frame(); });
})();
