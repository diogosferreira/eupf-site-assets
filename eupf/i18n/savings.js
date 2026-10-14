/*
  Translations for the savings calculator (EU Personal Finance).
  Loaded on every language version of the page, with the same footer code.
  Each block below checks the page language itself and does nothing on other
  languages. The code was moved here unchanged from the localized page footers
  in Webflow (NL/PL), so the result is the same as before.
*/

/* ======================== NL ======================== */
/*
  ============================================================
  NL-vertaling – "Spaarcalculator"
  EU Personal Finance — pagina: /nl/savings-calculator
  ------------------------------------------------------------
  Vertaalt alle teksten die vastzitten in de Code Embeds van de
  spaarcalculator naar het Nederlands: het keuzemenu (welke variabele
  berekenen), de invoervelden, de resultaten (incl. labels die per
  modus veranderen), de dynamische resultaatzin, de grafiek, de
  jaartabel en de waarschuwingsmeldingen. Draait ALLEEN op /nl/.

  PLAATSEN (Webflow): pagina > Page settings > Custom code >
  "Before </body> tag" > deze code plakken > Save > Publish.

  De woordenlijst (glossary) staat in een apart bestand:
  nl-spaarcalculator-woordenlijst-embed.html

  Let op: de getalnotatie (150,000.00) zit vast in de JavaScript van
  de ontwikkelaar en wordt hier niet aangepast.
  ============================================================
*/
(function () {
  "use strict";

  var lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
  var path = location.pathname || "";
  var isNL = lang.indexOf("nl") === 0 || path === "/nl" || path.indexOf("/nl/") === 0;
  if (!isNL) return;

  /* ============================================================
     1) STATISCHE LABELS (exacte tekst -> Nederlands)
     ============================================================ */
  var MAP = {
    /* Keuze: welke variabele berekenen */
    "What would you like to calculate?": "Wat wil je berekenen?",
    "Final capital": "Eindkapitaal",
    "Monthly savings": "Maandelijkse inleg",
    "Time needed": "Benodigde tijd",
    "Initial capital": "Startkapitaal",
    "Interest rate": "Rentevoet",
    "How much you will accumulate by the end of the term.": "Hoeveel je aan het einde van de looptijd opbouwt.",
    "How much you need to save per month to reach your goal.": "Hoeveel je per maand moet sparen om je doel te bereiken.",
    "How long it will take to reach your target capital.": "Hoelang het duurt om je doelkapitaal te bereiken.",
    "How much you need to have already saved to reach your goal.": "Hoeveel je al gespaard moet hebben om je doel te bereiken.",
    "What return you need to grow your savings.": "Welk rendement je nodig hebt om je spaargeld te laten groeien.",

    /* Dynamische subtitel (verandert per gekozen variabele) */
    "Find out how much you can accumulate by the end of the term.": "Ontdek hoeveel je aan het einde van de looptijd kunt opbouwen.",
    "Find out how much you need to save per month to reach your goal.": "Ontdek hoeveel je per maand moet sparen om je doel te bereiken.",
    "Find out how long it will take to reach your target capital.": "Ontdek hoelang het duurt om je doelkapitaal te bereiken.",
    "Find out how much you need to have already saved to reach your goal.": "Ontdek hoeveel je al gespaard moet hebben om je doel te bereiken.",
    "Find out what return you need to grow your savings.": "Ontdek welk rendement je nodig hebt om je spaargeld te laten groeien.",

    /* Invoervelden */
    "Target final capital": "Gewenst eindkapitaal",
    "The amount you want to reach.": "Het bedrag dat je wilt bereiken.",
    "How much have you saved?": "Hoeveel heb je al gespaard?",
    "The amount you have already saved.": "Het bedrag dat je al gespaard hebt.",
    "How much do you want to save per month?": "Hoeveel wil je per maand sparen?",
    "The amount you plan to save every month.": "Het bedrag dat je elke maand wilt sparen.",
    "Estimated annual interest rate": "Geschatte jaarrente",
    "The estimated annual interest rate for your investment or deposit.": "De geschatte jaarrente voor je belegging of deposito.",
    "Savings term": "Spaartermijn",
    "How long you plan to save.": "Hoelang je van plan bent te sparen.",
    "Years": "Jaar",
    "Months": "Maanden",
    "Calculate": "Berekenen",

    /* Resultaten – KPI-labels (sommige veranderen per modus) */
    "Results": "Resultaten",
    "Estimated final capital": "Geschat eindkapitaal",
    "Required monthly savings": "Benodigde maandelijkse inleg",
    "Estimated term": "Geschatte looptijd",
    "Required initial capital": "Benodigd startkapitaal",
    "Required interest rate": "Benodigde rentevoet",
    "Total saved by you": "Totaal door jou gespaard",
    "Estimated interest": "Geschatte rente",
    "Interest share of total": "Aandeel rente in totaal",
    "Total in contributions over the term": "Totaal aan inleg over de looptijd",
    "Total saved": "Totaal gespaard",

    /* Disclaimers */
    "These results are indicative simulations and do not constitute financial advice. Always confirm the actual terms with your financial institution.": "Deze resultaten zijn indicatieve simulaties en vormen geen financieel advies. Bevestig de werkelijke voorwaarden altijd bij je financiële instelling.",
    "These results are simulations and do not constitute any form of financial advice.": "Deze resultaten zijn simulaties en vormen op geen enkele wijze financieel advies.",

    /* Grafiek */
    "Accumulated value": "Opgebouwde waarde",
    "Download graph": "Grafiek downloaden",

    /* Jaartabel */
    "Year": "Jaar",
    "Period interest": "Rente over periode",
    "Cumulative interest": "Cumulatieve rente",
    "Total amount": "Totaalbedrag",
    "Show more": "Meer tonen",
    "Show less": "Minder tonen",
    "Download table": "Tabel downloaden",
    "Share results": "Resultaten delen",

    /* Waarschuwing zonder ingebed bedrag (modus rentevoet) */
    "With the values you entered, you will already exceed your goal with monthly contributions alone, without needing any return. Try increasing the target final capital or reducing the term/monthly savings to see the required interest rate.": "Met de waarden die je hebt ingevoerd, overschrijd je je doel al met alleen de maandelijkse inleg, zonder enig rendement nodig te hebben. Verhoog het gewenste eindkapitaal of verlaag de looptijd/maandelijkse inleg om de benodigde rentevoet te zien."
  };

  /* ============================================================
     2) Tijds-woorden (looptijd-uitvoer van de JS)
     ============================================================ */
  function translateTimeWords(s) {
    return s
      .replace(/\bmonths\b/g, "maanden")
      .replace(/\bmonth\b/g, "maand")
      .replace(/\byears\b/g, "jaar")
      .replace(/\byear\b/g, "jaar")
      .replace(/\band\b/g, "en");
  }

  /* ============================================================
     3) Dynamische resultaatzin (per modus, met ingebedde bedragen)
        Vervangt verbindingswoorden zodat de zin Nederlands wordt.
        Volgorde is belangrijk: specifieker eerst.
     ============================================================ */
  var PHRASES = [
    /* waarschuwing met ingebed bedrag (modus startkapitaal) */
    ["With the monthly contributions and interest rate you entered, you will already exceed your goal of ",
      "Met de maandelijkse inleg en rentevoet die je hebt ingevoerd, overschrijd je je doel van "],
    [" without needing any initial capital. Try increasing the target final capital, or reducing the term, monthly savings, or estimated interest rate to see the required initial capital.",
      " al, zonder enig startkapitaal nodig te hebben. Verhoog het gewenste eindkapitaal, of verlaag de looptijd, maandelijkse inleg of geschatte rente om het benodigde startkapitaal te zien."],

    /* slotzinnen per modus */
    [", the required monthly savings is approximately ", ", is de benodigde maandelijkse inleg ongeveer "],
    [", the required initial capital is approximately ", ", is het benodigde startkapitaal ongeveer "],
    [", the required annual rate is approximately ", ", is de benodigde jaarrente ongeveer "],
    [", the estimated term is approximately ", ", is de geschatte looptijd ongeveer "],
    [" per year, the estimated final capital is ", " per jaar, is het geschatte eindkapitaal "],

    /* verbindingen */
    [", starting from ", " te bereiken, vanaf "],
    [", with monthly contributions of ", " te bereiken, met maandelijkse inleg van "],
    [", with ", " te bereiken, met "],
    [" already saved and monthly contributions of ", " al gespaard en maandelijkse inleg van "],
    [" already saved, monthly contributions of ", " al gespaard, maandelijkse inleg van "],
    [" already saved", " al gespaard"],
    [" and an annual rate of ", " en een jaarrente van "],
    [" at an annual rate of ", " tegen een jaarrente van "],
    [" per year", " per jaar"],
    [" over ", " gedurende "],
    [" at ", " tegen "],
    ["To reach ", "Om "],
    ["With ", "Met "]
  ];

  function looksLikeSummary(t) {
    return /^(To reach|With )/.test(t);
  }
  function translateSummaryEl(el) {
    var t = (el.textContent || "").trim();
    if (!looksLikeSummary(t)) return;
    // werk op de losse tekstknopen binnen de zin (tussen de <strong> bedragen)
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    var n, nodes = [];
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var v = node.nodeValue, nv = v;
      for (var i = 0; i < PHRASES.length; i++) {
        if (nv.indexOf(PHRASES[i][0]) !== -1) {
          nv = nv.split(PHRASES[i][0]).join(PHRASES[i][1]);
        }
      }
      if (nv !== v) node.nodeValue = nv;
    });
  }

  /* ============================================================
     4) Toepassen
     ============================================================ */
  function eachTextNode(root, fn) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var n, nodes = [];
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(fn);
  }
  function applyStatic(root) {
    eachTextNode(root, function (node) {
      var key = node.nodeValue.trim();
      if (key && MAP.hasOwnProperty(key)) node.nodeValue = node.nodeValue.replace(key, MAP[key]);
    });
  }
  function applyTimeWords(root) {
    eachTextNode(root, function (node) {
      var v = node.nodeValue;
      if (!v || !v.trim()) return;
      // alleen knopen die op een looptijd lijken (bevatten year/month)
      if (!/\b(year|years|month|months)\b/.test(v)) return;
      var nv = translateTimeWords(v);
      if (nv !== v) node.nodeValue = nv;
    });
  }

  var running = false;
  function localize() {
    if (running) return;
    running = true;
    try {
      applyStatic(document.body);
      var res = document.getElementById("lfc-amort") || document.getElementById("lfc-poupanca");
      var zone = (res && (res.closest("section") || res.parentElement)) || document.body;
      // resultaatzin(nen) binnen de resultaatzone
      var candidates = zone.querySelectorAll("p, span, div");
      for (var i = 0; i < candidates.length; i++) {
        var el = candidates[i];
        // alleen "blad"-achtige elementen met directe tekst
        if (el.children.length <= 4 && looksLikeSummary((el.textContent || "").trim())) {
          translateSummaryEl(el);
        }
      }
      applyTimeWords(zone);
    } finally {
      running = false;
    }
  }

  function start() {
    localize();
    setTimeout(localize, 300);
    setTimeout(localize, 1200);
    var target = document.getElementById("lfc-amort") || document.getElementById("lfc-poupanca");
    var root = (target && (target.closest("section") || target.parentElement)) || document.body;
    var debounce;
    new MutationObserver(function () {
      clearTimeout(debounce);
      debounce = setTimeout(localize, 60);
    }).observe(root, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
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

  function apply() {
    if (L !== "nl") return;
    fixCharts({ "Estimated interest": "Geschatte rente", "Total saved": "Totaal gespaard" });
    fixNumbers(resultRoots());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
