/*
  Translations for the sp500 calculator (EU Personal Finance).
  Loaded on every language version of the page, with the same footer code.
  Each block below checks the page language itself and does nothing on other
  languages. The code was moved here unchanged from the localized page footers
  in Webflow (NL/PL), so the result is the same as before.
*/

/* ======================== PL ======================== */
/*
  PL — Kalkulator S&P 500 (ETF): lokalizacja runtime
  ------------------------------------------------------------
  Logika jest w zewnętrznym calculadora-sp500.js. Waluta = USD ($)
  (S&P 500 jest w dolarach — NIE zamieniamy na zł). Ten skrypt
  tłumaczy interfejs i dynamiczne podsumowanie na polski, tylko /pl/.

  GDZIE: Page settings > Custom code > "Before </body> tag", NA KOŃCU.

  Uwaga: długie teksty FAQ/słownika na dole strony NIE są tu tłumaczone
  (to treść — najlepiej przetłumaczyć osobno). Tu jest kalkulator.
*/
(function () {
  if (!/^\/pl(\/|$)/.test(location.pathname)) return;

  /* ── Statyczne etykiety (dokładny tekst -> polski) ── */
  var MAP = {
    "Future return simulator": "Symulator przyszłych zwrotów",
    "Starting amount": "Kwota początkowa",
    "Monthly contribution": "Miesięczna wpłata",
    "Investment period": "Okres inwestowania",
    "years": "lata",
    "Expected return": "Oczekiwany zwrot",
    "Custom": "Własny",
    "Calculate": "Oblicz",
    "Results": "Wyniki",
    "Final balance": "Saldo końcowe",
    "Total investments": "Łączne wpłaty",
    "Total investment return": "Łączny zwrot z inwestycji",
    "See total returns": "Zobacz całkowite zwroty",
    "Download chart": "Pobierz wykres",
    "Share results": "Udostępnij wyniki",
    "Advertisement": "Reklama",
    "Learn more": "Dowiedz się więcej",
    "The results presented are simulations and do not constitute any form of financial advice.":
      "Przedstawione wyniki to symulacje i nie stanowią żadnej formy porady finansowej.",
    "The amount you invest at the beginning of the simulation. You can enter \"0\" if you plan to make only monthly investments.":
      "Kwota inwestowana na początku symulacji. Możesz wpisać „0”, jeśli planujesz wpłacać tylko co miesiąc.",
    "The amount you plan to invest regularly every month. You can enter \"0\" if you are making only a one-time initial investment.":
      "Kwota, którą planujesz wpłacać regularnie co miesiąc. Możesz wpisać „0”, jeśli dokonujesz tylko jednorazowej inwestycji początkowej.",
    "The total duration of the investment in years. For example, 10 years, 20 years, etc.":
      "Całkowity czas trwania inwestycji w latach. Na przykład 10 lat, 20 lat itd.",
    "The returns considered in each case correspond to the annualized return over the last 20 years (31/03/2005 - 31/03/2025). Past returns do not guarantee future results and should not be the sole factor when selecting an investment product or strategy.":
      "Uwzględnione zwroty odpowiadają zannualizowanemu zwrotowi z ostatnich 20 lat (31.03.2005–31.03.2025). Wyniki z przeszłości nie gwarantują przyszłych rezultatów i nie powinny być jedynym czynnikiem przy wyborze produktu lub strategii inwestycyjnej.",
    "* The S&P 500 is a stock market index that measures the performance of 500 of the largest publicly traded companies in the U.S.":
      "* S&P 500 to indeks giełdowy mierzący wyniki 500 największych spółek notowanych na giełdzie w USA.",
    "Thank you! Your submission has been received!": "Dziękujemy! Twoje zgłoszenie zostało odebrane!",
    "Oops! Something went wrong while submitting the form.": "Ups! Coś poszło nie tak podczas przesyłania formularza.",
    "Exclusive eToro bonus: Get up to": "Ekskluzywny bonus eToro: zdobądź do",
    "$500 in free assets": "$500 w wolnych aktywach",
    "eToro is a multi-asset investment platform. The value of your investments may go up or down. Your capital is at risk. Terms apply.":
      "eToro to platforma inwestycyjna z wieloma klasami aktywów. Wartość Twoich inwestycji może rosnąć lub spadać. Twój kapitał jest zagrożony. Obowiązują warunki."
  };
  /* Etykiety wykresu (do potwierdzenia po kliknięciu Oblicz) */
  var CHART_MAP = {
    "Final balance": "Saldo końcowe",
    "Total invested": "Łączne wpłaty",
    "Invested": "Wpłaty",
    "Investment value": "Wartość inwestycji",
    "Returns": "Zwroty",
    "Years": "Lata",
    "Year": "Rok"
  };

  function applyStatic(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var n, nodes = [];
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var key = node.nodeValue.trim();
      if (key && MAP.hasOwnProperty(key)) node.nodeValue = node.nodeValue.replace(key, MAP[key]);
    });
  }

  function plLata(n) {
    n = parseInt(n, 10);
    if (n === 1) return "rok";
    var d = n % 10, dd = n % 100;
    if (d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14)) return "lata";
    return "lat";
  }

  /* ── Podsumowanie "If you start with…" -> PL (zostaje $) ── */
  function findSummaryEl() {
    var c = document.querySelectorAll("p, span, div");
    var best = null, len = Infinity;
    for (var i = 0; i < c.length; i++) {
      var t = c[i].textContent || "";
      if (/initial investment of/i.test(t) && /total investment returns/i.test(t) && t.length < len) { best = c[i]; len = t.length; }
    }
    return (best && len < 800) ? best : null;
  }
  function translateSummary() {
    var el = findSummaryEl();
    if (!el) return;
    var m = (el.textContent || "").match(/initial investment of\s*(\$?[\d.,]+)\s*and invest\s*(\$?[\d.,]+)\s*per month at an annual expected return of\s*([\d.,]+\s*%?)\s*for\s*(\d+)\s*years,\s*you will reach a final balance of\s*(\$?[\d.,]+)\.\s*This amount is made up of\s*(\$?[\d.,]+)\s*in total investments and\s*(\$?[\d.,]+)\s*in total investment returns/i);
    if (!m) return;
    var ini = m[1].trim(), mon = m[2].trim(), ret = m[3].replace(/\s+/g, ""), yrs = parseInt(m[4], 10),
        fin = m[5].trim(), inv = m[6].trim(), rtn = m[7].trim();
    if (ret.indexOf("%") === -1) ret += "%";
    el.innerHTML =
      "Zaczynając od początkowej inwestycji <strong>" + ini + "</strong> i wpłacając <strong>" + mon + "</strong> miesięcznie " +
      "przy oczekiwanym rocznym zwrocie <strong>" + ret + "</strong> przez <strong>" + yrs + " " + plLata(yrs) + "</strong>, " +
      "osiągniesz saldo końcowe <strong>" + fin + "</strong>. " +
      "Kwota ta składa się z <strong>" + inv + " wpłat</strong> oraz <strong>" + rtn + " zwrotu z inwestycji</strong>.";
  }

  /* ── Wykres: bezpieczne opakowanie Chart.js ─────── */
  if (window.Chart && !window.__plChartWrapped) {
    var _Chart = window.Chart;
    function mapTerm(s) { return (typeof s === "string" && CHART_MAP[s]) ? CHART_MAP[s] : s; }
    function patch(cfg) {
      try {
        if (cfg && cfg.data && cfg.data.datasets)
          cfg.data.datasets.forEach(function (d) { if (d && d.label) d.label = mapTerm(d.label); });
        var o = cfg && cfg.options;
        if (o && o.scales) ["x", "y"].forEach(function (ax) {
          if (o.scales[ax] && o.scales[ax].title && typeof o.scales[ax].title.text === "string")
            o.scales[ax].title.text = mapTerm(o.scales[ax].title.text);
        });
        if (o && o.plugins && o.plugins.title && typeof o.plugins.title.text === "string")
          o.plugins.title.text = mapTerm(o.plugins.title.text);
      } catch (e) {}
      return cfg;
    }
    function PLChart(ctx, cfg) { return new _Chart(ctx, patch(cfg)); }
    Object.getOwnPropertyNames(_Chart).forEach(function (k) {
      if (k === "length" || k === "name" || k === "prototype") return;
      try { Object.defineProperty(PLChart, k, Object.getOwnPropertyDescriptor(_Chart, k)); } catch (e) {}
    });
    PLChart.prototype = _Chart.prototype;
    window.Chart = PLChart;
    window.__plChartWrapped = true;
  }

  var running = false;
  function run() {
    if (running) return;
    running = true;
    try { translateSummary(); applyStatic(document.body); } finally { running = false; }
  }
  function start() {
    run();
    setTimeout(run, 300);
    setTimeout(run, 1000);
    var deb;
    new MutationObserver(function () { clearTimeout(deb); deb = setTimeout(run, 80); })
      .observe(document.body, { childList: true, subtree: true, characterData: true });
    document.addEventListener("click", function (e) { if (e.target.closest("#calcular")) setTimeout(run, 250); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
