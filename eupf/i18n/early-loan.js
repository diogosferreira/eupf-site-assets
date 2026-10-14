/*
  Translations for the early-loan calculator (EU Personal Finance).
  Loaded on every language version of the page, with the same footer code.
  Each block below checks the page language itself and does nothing on other
  languages. The code was moved here unchanged from the localized page footers
  in Webflow (NL/PL), so the result is the same as before.
*/

/* ======================== NL ======================== */
/*
  ============================================================
  NL-vertaling – "Calculator vervroegd aflossen"
  EU Personal Finance — pagina: /nl/euro-early-loan-repayment-calculator
  ------------------------------------------------------------
  WAT DIT DOET
  Deze code vertaalt alle teksten die "vastzitten" in de Code Embeds
  van de calculator (formulier, resultaten, grafiek, aflossingsschema
  en de woordenlijst) naar het Nederlands. Het draait ALLEEN op de
  Nederlandse versie van de site (/nl/...).

  WAAR PLAATSEN (Webflow)
  Pagina openen > Page settings (tandwiel) > Custom code >
  "Before </body> tag" > deze volledige code plakken > Save > Publish.
  (Of via een Code Embed onderaan de pagina.)

  Let op: getalnotatie (bv. 150,000.00) zit vast in de JavaScript van
  de ontwikkelaar en wordt hier NIET aangepast, om te voorkomen dat de
  berekening breekt. Wil je Nederlandse notatie (150.000,00), dan moet
  de ontwikkelaar de parser aanpassen.
  ============================================================
*/
(function () {
  "use strict";

  /* ---- Alleen op de Nederlandse locale uitvoeren ---- */
  var lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
  var path = location.pathname || "";
  var isNL = lang.indexOf("nl") === 0 || path === "/nl" || path.indexOf("/nl/") === 0;
  if (!isNL) return;

  /* ============================================================
     1) STATISCHE LABELS  (exacte tekst → Nederlands)
     ============================================================ */
  var MAP = {
    /* Formulier */
    "Loan terms": "Leninggegevens",
    "Outstanding balance": "Openstaand saldo",
    "The amount you still owe on the loan.": "Het bedrag dat je nog verschuldigd bent op de lening.",
    "Annual nominal interest rate (ANR)": "Nominale jaarrente",
    "The annual nominal interest rate on your loan, before spreads or fees.": "De nominale jaarrente op je lening, vóór opslagen of kosten.",
    "Remaining term": "Resterende looptijd",
    "How long until you finish paying off the loan.": "Hoelang tot je de lening volledig hebt afgelost.",
    "Years": "Jaar",
    "Months": "Maanden",
    "Prepayment": "Vervroegde aflossing",
    "Prepayment amount": "Bedrag vervroegde aflossing",
    "The extra amount you will pay to the bank to reduce the debt.": "Het extra bedrag dat je aan de bank betaalt om de schuld te verlagen.",
    "After prepayment, I want to": "Na de aflossing wil ik",
    "Reducing the instalment keeps the term and lowers the monthly payment. Reducing the term keeps the instalment and shortens the time to pay off.": "De maandlast verlagen houdt de looptijd gelijk en verlaagt het maandbedrag. De looptijd verkorten houdt de maandlast gelijk en zorgt dat je sneller klaar bent met aflossen.",
    "Reduce the instalment": "Maandlast verlagen",
    "Reduce the term": "Looptijd verkorten",
    "Calculate": "Berekenen",

    /* Resultaten (KPI's + vergelijkingstabel) */
    "New monthly instalment": "Nieuwe maandlast",
    "Loan term": "Looptijd",
    "Total interest savings": "Totale rentebesparing",
    "Compared to current scenario": "Vergeleken met huidig scenario",
    "Before prepayment": "Vóór aflossing",
    "After prepayment": "Na aflossing",
    "Total remaining interest": "Totale resterende rente",
    "Interest rate (ANR)": "Nominale jaarrente",

    /* Grafiek */
    "Balance evolution": "Evolutie van het saldo",
    "Current scenario vs. after prepayment": "Huidig scenario vs. na aflossing",
    "Total capital (in euros €)": "Totaal kapitaal (in euro's €)",
    "Before": "Vóór",
    "Download graph": "Grafiek downloaden",

    /* Aflossingsschema */
    "Amortisation schedule": "Aflossingsschema",
    "Month": "Maand",
    "Instalment": "Maandlast",
    "Interest": "Rente",
    "Principal repaid": "Afgeloste hoofdsom",
    "Show more": "Meer tonen",
    "Show less": "Minder tonen",
    "Download table": "Tabel downloaden",
    "Share results": "Resultaten delen",
    "Results": "Resultaten",

    /* Disclaimer */
    "These results are simulations and do not constitute any form of financial advice.": "Deze resultaten zijn simulaties en vormen op geen enkele wijze financieel advies."
  };

  /* ============================================================
     2) DYNAMISCHE UITVOER van de reken-JS (woorden → NL)
        Bv. "20 years and 6 months", "3 years saved",
        "Equivalent to 300 months", "€100.00/mo saved"
     ============================================================ */
  function translateDynamicString(s) {
    return s
      .replace(/Equivalent to/g, "Overeenkomt met")
      .replace(/\/mo\b/g, "/mnd")
      .replace(/\bmonths\b/g, "maanden")
      .replace(/\bmonth\b/g, "maand")
      .replace(/\byears\b/g, "jaar")
      .replace(/\byear\b/g, "jaar")
      .replace(/\bsaved\b/g, "bespaard")
      .replace(/\band\b/g, "en");
  }

  /* ---- Helpers: tekstknopen doorlopen ---- */
  function eachTextNode(root, fn) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(fn);
  }

  function applyStatic(root) {
    eachTextNode(root, function (node) {
      var key = node.nodeValue.trim();
      if (key && MAP.hasOwnProperty(key)) {
        node.nodeValue = node.nodeValue.replace(key, MAP[key]);
      }
    });
  }

  function applyDynamic(root) {
    eachTextNode(root, function (node) {
      var v = node.nodeValue;
      if (!v || !v.trim()) return;
      var nv = translateDynamicString(v);
      if (nv !== v) node.nodeValue = nv;
    });
  }

  /* ============================================================
     3) WOORDENLIJST  (volledige NL-versie)
     ============================================================ */
  var GLOSSARY_NL =
    '<h2 class="heading-style-h2">Woordenlijst</h2>' +
    '<h3>Wat is een vervroegde aflossing?</h3>' +
    '<p>Een vervroegde aflossing is het (gedeeltelijk of volledig) terugbetalen van je openstaande saldo vóór het einde van de afgesproken looptijd. Door het openstaande saldo te verlagen, verlaag je ook de rente die je over dat bedrag zou betalen tot het einde van het contract.</p>' +
    '<p><strong>Voorbeeld:</strong> stel dat je €150.000 openstaand saldo hebt tegen een nominale jaarrente van 4,5% over 25 jaar. Als je vandaag €10.000 vervroegd aflost, berekent de bank rente over €140.000 — niet over €150.000. Dat verschil, vermenigvuldigd met alle resterende maanden, levert duizenden euro’s aan rentebesparing op. Bekijk het volledige maandoverzicht van je lening via het tabblad <strong>Aflossingsschema</strong> in de calculator hierboven.</p>' +
    '<h3>Maandlast verlagen of looptijd verkorten?</h3>' +
    '<p>Na een gedeeltelijke aflossing biedt de bank je meestal twee opties:</p>' +
    '<ul>' +
    '<li><strong>Maandlast verlagen:</strong> de oorspronkelijke looptijd blijft gelijk, maar je maandbedrag daalt. Handig als je je maandbudget wat lucht wilt geven.</li>' +
    '<li><strong>Looptijd verkorten:</strong> je maandlast blijft gelijk, maar je bent sneller klaar met aflossen. Dit levert de grootste totale rentebesparing op, omdat je de periode verkort waarin de bank rente in rekening brengt.</li>' +
    '</ul>' +
    '<p>Puur wiskundig gezien bespaart <strong>het verkorten van de looptijd altijd meer rente</strong>. Het verlagen van de maandlast geeft je echter meer flexibiliteit op korte termijn — en die maandelijkse ademruimte kun je inzetten om te beleggen, extra af te lossen of een noodfonds op te bouwen.</p>' +
    '<h3>Hoe werkt deze tool?</h3>' +
    '<p>Met deze calculator vul je het huidige openstaande saldo, de nominale jaarrente van je lening, de resterende looptijd en het bedrag dat je vervroegd wilt aflossen in. Op basis daarvan berekent de tool:</p>' +
    '<ul>' +
    '<li>De nieuwe maandlast (of de nieuwe looptijd, afhankelijk van de gekozen optie)</li>' +
    '<li>De totale rentebesparing ten opzichte van het huidige scenario</li>' +
    '<li>Het volledige overzicht vóór en na de aflossing</li>' +
    '</ul>' +
    '<p>De resultaten gaan ervan uit dat de nominale jaarrente constant blijft tot het einde van het contract. Voor leningen met variabele rente (bijvoorbeeld gekoppeld aan Euribor) variëren de werkelijke bedragen bij elke renteherziening.</p>' +
    '<h3>Gerelateerde tools (suggestie)</h3>' +
    '<ul>' +
    '<li><a href="https://www.eupersonalfinance.eu/nl/compound-interest-calculator-euro"><strong>Rente-op-rente calculator</strong></a> — zie hoe een eenmalig bedrag of periodieke inleg in de loop van de tijd groeit. Handig om de rente die je bespaart met aflossen te vergelijken met het rendement dat je zou kunnen halen door datzelfde geld te beleggen.</li>' +
    '<li><a href="https://www.eupersonalfinance.eu/nl/fire-calculator"><strong>FIRE-calculator</strong></a> — schat in hoeveel je moet beleggen, en voor hoelang, om financiële onafhankelijkheid te bereiken.</li>' +
    '<li><a href="https://www.eupersonalfinance.eu/articles/how-and-where-to-invest-100-1000-or-10000-euros"><strong>Hoe en waar €100, €1.000 of €10.000 beleggen</strong></a> — een praktische gids om spaargeld aan het werk te zetten, in plaats van of naast vervroegd aflossen.</li>' +
    '</ul>' +
    '<h3>Gebruikte formules</h3>' +
    '<p>De calculator gebruikt de klassieke annuïteitenformule (constante maandlasten):</p>' +
    '<p>Maandlast = C × [i × (1 + i)ⁿ] / [(1 + i)ⁿ − 1]</p>' +
    '<p>Waarbij:</p>' +
    '<ul>' +
    '<li><strong>C:</strong> openstaand saldo</li>' +
    '<li><strong>i:</strong> maandrente (nominale jaarrente gedeeld door 12)</li>' +
    '<li><strong>n:</strong> totaal aantal resterende maandtermijnen</li>' +
    '</ul>' +
    '<p>Om de <strong>rentebesparing</strong> te berekenen, vergelijkt de calculator de totale rente in het oorspronkelijke scenario met de totale rente na de aflossing (inclusief de rente over het resterende schema).</p>' +
    '<p><strong>Let op:</strong> de nominale jaarrente wordt omgerekend naar een maandrente door te delen door 12. Een nominale jaarrente van 4,5% komt bijvoorbeeld overeen met een maandrente van 0,375% (4,5% / 12).</p>' +
    '<h3>Is vervroegd aflossen altijd de moeite waard?</h3>' +
    '<p>Vervroegd aflossen verlaagt de rente, maar het is niet altijd de beste financiële keuze. Weeg vóór je beslist het volgende af:</p>' +
    '<ul>' +
    '<li><strong>Opportuniteitskosten:</strong> als de rente op je lening 4,5% is, maar je op lange termijn een hoger rendement zou kunnen halen door datzelfde geld te beleggen — bijvoorbeeld in een <a href="https://www.eupersonalfinance.eu/articles/best-accumulating-etfs">gespreide ETF</a> — kan beleggen meer vermogen opbouwen dan de rente die je bespaart. Historisch gezien <a href="https://www.eupersonalfinance.eu/articles/average-annual-return-sp500">hebben brede aandelenindices over lange periodes meer opgeleverd dan dat</a>, al zijn rendementen nooit gegarandeerd en gaan ze gepaard met volatiliteit.</li>' +
    '<li><strong>Kosten van vervroegd aflossen:</strong> op grond van de Europese hypothekenrichtlijn heb je doorgaans het recht om vervroegd af te lossen, maar geldverstrekkers mogen een vergoeding voor vervroegde aflossing in rekening brengen. De maximumhoogte en de regels verschillen per land (sommige beperken het tot een klein percentage van het afgeloste bedrag; sommige laten het vervallen bij leningen met variabele rente). Controleer je leningovereenkomst en de totale kredietkosten (JKP) voordat je beslist.</li>' +
    '<li><strong>Noodfonds:</strong> put nooit je noodfonds uit om af te lossen. Houd minstens 3 tot 6 maanden uitgaven aan op een liquide, laag-risico plek, zoals een <a href="https://www.eupersonalfinance.eu/articles/best-savings-accounts-europe">spaarrekening met hoge rente</a>.</li>' +
    '<li><strong>Belastingvoordeel:</strong> in sommige Europese landen is hypotheekrente deels aftrekbaar of gesubsidieerd (bijvoorbeeld de hypotheekrenteaftrek in Nederland). Waar dat geldt, wordt een deel van je rente-“kosten” gecompenseerd door de staat, wat het voordeel van aflossen verkleint. Controleer de regels in jouw land.</li>' +
    '<li><strong>Heronderhandelen als alternatief (of aanvulling):</strong> als je rente ver boven de actuele markttarieven ligt, kan heronderhandelen of oversluiten bij je bank je meer opleveren dan een eenmalige aflossing — en je kunt ook beide doen.</li>' +
    '</ul>' +
    '<h3>Tot slot</h3>' +
    '<p>Vervroegd aflossen is een van de effectiefste manieren om de totale rente op je lening te verlagen. Maar als je nog aan je financiële basis bouwt, is het verstandig om eerst die basis op orde te krijgen — zie onze <a href="https://www.eupersonalfinance.eu/articles/beginners-guide-personal-finance">beginnersgids voor persoonlijke financiën in Europa</a>. De juiste keuze hangt af van de rente op je lening, je bredere financiële situatie en de beschikbare alternatieven.</p>' +
    '<p><strong>Reken vóór het aflossen altijd even door: soms bouwt hetzelfde bedrag beleggen op lange termijn meer vermogen op dan de rente die je zou besparen.</strong></p>';

  function replaceGlossary() {
    var wrap = document.querySelector(".glossario-content_wrapper");
    if (wrap && !wrap.getAttribute("data-nl-done")) {
      wrap.innerHTML = GLOSSARY_NL;
      wrap.setAttribute("data-nl-done", "1");
    }
  }

  /* ============================================================
     4) UITVOEREN + observer voor dynamische delen
     ============================================================ */
  var running = false;
  function localize() {
    if (running) return;
    running = true;
    try {
      applyStatic(document.body);              // labels overal op de pagina
      var res = document.getElementById("lfc-amort");
      var chart = document.getElementById("lfc-amort-chart-panel");
      // resultaten-/grafiek-/schema-zone: ook dynamische woorden vertalen
      var zone = (res && (res.closest("section") || res.parentElement)) || null;
      if (zone) applyDynamic(zone);
      if (chart) applyDynamic(chart);
      replaceGlossary();
    } finally {
      running = false;
    }
  }

  function start() {
    localize();
    // extra passes voor laat-ladende Webflow-interacties
    setTimeout(localize, 300);
    setTimeout(localize, 1200);

    // observer: opnieuw vertalen wanneer de calculator resultaten/schema rendert
    var target = document.getElementById("lfc-amort");
    var root = (target && (target.closest("section") || target.parentElement)) || document.body;
    var debounce;
    var obs = new MutationObserver(function () {
      clearTimeout(debounce);
      debounce = setTimeout(localize, 60);
    });
    obs.observe(root, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

/* ================= NL + PL: extra fixes (Oct 2026) ================= */
/*
  Texts that were still in English on /nl/ and /pl/ after calculating.
  Works on the page after the calculator has drawn it: exact texts,
  sentences split by <b>/<strong>, chart labels (translated on the live
  chart, so it does not matter when Chart.js loads) and, where the
  calculator prints English number format, 1,234.56 -> 1.234,56.
*/
(function () {
  var m = /^\/(nl|pl)(\/|$)/.exec(location.pathname);
  if (!m) return;
  var L = m[1];

  function eachText(root, fn) {
    if (!root) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false), n, a = [];
    while ((n = w.nextNode())) {
      var tag = n.parentNode && n.parentNode.nodeName;
      if (tag !== "SCRIPT" && tag !== "STYLE" && tag !== "NOSCRIPT") a.push(n);
    }
    a.forEach(fn);
  }
  /* rules: [[/^...$/, function (match) { return "new text"; }], ...] on whole text nodes */
  function swap(root, rules) {
    eachText(root, function (n) {
      var v = n.nodeValue, t = v.trim();
      if (!t) return;
      for (var i = 0; i < rules.length; i++) {
        var r = rules[i][0].exec(t);
        if (r) {
          var nv = rules[i][1](r);
          if (nv !== t) n.nodeValue = v.replace(t, nv);
          return;
        }
      }
    });
  }
  function exact(map) {
    return Object.keys(map).map(function (k) {
      var re = new RegExp("^" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$");
      return [re, function () { return map[k]; }];
    });
  }
  function fixCharts(map) {
    if (!window.Chart || !window.Chart.instances) return;
    function tr(s) { return (typeof s === "string" && Object.prototype.hasOwnProperty.call(map, s)) ? map[s] : null; }
    Object.keys(window.Chart.instances).forEach(function (k) {
      var c = window.Chart.instances[k], changed = false, v;
      ((c.data && c.data.datasets) || []).forEach(function (d) {
        if ((v = tr(d.label)) !== null) { d.label = v; changed = true; }
      });
      var o = c.options || {};
      if (o.plugins && o.plugins.title && (v = tr(o.plugins.title.text)) !== null) { o.plugins.title.text = v; changed = true; }
      ["x", "y"].forEach(function (ax) {
        var s = o.scales && o.scales[ax] && o.scales[ax].title;
        if (s && (v = tr(s.text)) !== null) { s.text = v; changed = true; }
      });
      if (changed) c.update("none");
    });
  }
  /* English number format -> NL "1.234,56" / PL "1 234,56" (only where the calculator prints English format) */
  function fixNumbers(roots) {
    var thou = L === "pl" ? " " : ".";
    roots.forEach(function (root) {
      eachText(root, function (n) {
        var v = n.nodeValue;
        if (!/\d[.,]\d/.test(v)) return;
        var nv = v.replace(/\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?(?![\d,])|\d+\.\d{1,2}(?![\d.])/g, function (x) {
          var p = x.split(".");
          return p[0].replace(/,/g, thou) + (p.length > 1 ? "," + p[1] : "");
        });
        if (nv !== v) n.nodeValue = nv;
      });
    });
  }
  function resultRoots() {
    return Array.prototype.slice.call(document.querySelectorAll(".all-results_wrapper, .table-content, [id^='lfc-']"));
  }
  function plLata(n) {
    n = parseInt(n, 10);
    if (n === 1) return "rok";
    var d = n % 10, dd = n % 100;
    return (d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14)) ? "lata" : "lat";
  }

  var running = false;
  function run() {
    if (running) return;
    running = true;
    try { apply(); } catch (e) {} finally { running = false; }
  }
  function start() {
    run();
    setTimeout(run, 300);
    setTimeout(run, 1200);
    var deb;
    new MutationObserver(function () { clearTimeout(deb); deb = setTimeout(run, 80); })
      .observe(document.body, { childList: true, subtree: true, characterData: true });
    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("#calcular")) { setTimeout(run, 300); setTimeout(run, 1200); setTimeout(run, 2500); }
    });
  }

  var P = L === "pl";
  function apply() {
    var res = document.querySelector(".all-results_wrapper");
    if (P) {
      swap(res, exact({ "Results": "Wyniki" }));
    } else {
      swap(res, exact({ "Total capital": "Totaal kapitaal", "(in euros €)": "(in euro's €)" }));
      fixCharts({ "Before": "Vóór", "After prepayment": "Na aflossing" });
      fixNumbers(resultRoots());
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
