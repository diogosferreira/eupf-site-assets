/*
  Translations for the fire calculator (EU Personal Finance).
  Loaded on every language version of the page, with the same footer code.
  Each block below checks the page language itself and does nothing on other
  languages. The code was moved here unchanged from the localized page footers
  in Webflow (NL/PL), so the result is the same as before.
*/

/* ======================== PL ======================== */
/*
  PL — Kalkulator FIRE: zamiana € na zł
  ------------------------------------------------------------
  Strona jest już po polsku; jedyne euro to wartości liczone przez
  zewnętrzny calculadora-fire.js (np. "350.340,00€"). Ten skrypt
  zamienia € na zł z polskim formatem (350 340,00 zł), tylko /pl/.

  Dotyczy: wartość FIRE, prefiks € w polach formularza, oś/tooltip wykresu.

  GDZIE: Page settings > Custom code > "Before </body> tag", NA KOŃCU.
*/
(function () {
  if (!/^\/pl(\/|$)/.test(location.pathname)) return;
  var ZL = "zł";

  function reNum(num) { return num.replace(/\./g, " "); } /* kropki tysięcy -> spacja */
  function eurToZl(s) {
    if (!s || s.indexOf("€") === -1) return s;
    /* sufiks: 350.340,00€ -> 350 340,00 zł */
    s = s.replace(/(\d[\d.]*(?:,\d{1,2})?)\s*€/g, function (_, num) { return reNum(num) + " " + ZL; });
    /* prefiks: €350.340,00 -> 350 340,00 zł */
    s = s.replace(/€\s*(\d[\d.]*(?:,\d{1,2})?)/g, function (_, num) { return reNum(num) + " " + ZL; });
    s = s.replace(/€/g, ZL); /* samodzielne € */
    return s;
  }
  function wordEuro(s) { return s ? s.replace(/\beuro\b/gi, "złotych") : s; }

  function convert(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var n, nodes = [];
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var v = node.nodeValue, nv = v;
      if (v.indexOf("€") !== -1) nv = eurToZl(nv);
      if (/\beuro\b/i.test(nv)) nv = wordEuro(nv);
      if (nv !== v) node.nodeValue = nv;
    });
  }

  /* ── Wykres: bezpieczne opakowanie Chart.js (€ w osi/tooltipie -> zł) ── */
  if (window.Chart && !window.__plChartWrapped) {
    var _Chart = window.Chart;
    function wrapCb(obj, key) {
      if (obj && typeof obj[key] === "function") {
        var orig = obj[key];
        obj[key] = function () { var r = orig.apply(this, arguments); return (typeof r === "string") ? eurToZl(r) : r; };
      }
    }
    function patch(cfg) {
      try {
        var o = cfg && cfg.options;
        if (o && o.scales) ["x", "y"].forEach(function (ax) {
          if (o.scales[ax] && o.scales[ax].ticks) wrapCb(o.scales[ax].ticks, "callback");
        });
        if (o && o.plugins && o.plugins.tooltip && o.plugins.tooltip.callbacks) {
          ["label", "title", "afterLabel"].forEach(function (k) { wrapCb(o.plugins.tooltip.callbacks, k); });
        }
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
  function run() { if (running) return; running = true; try { convert(document.body); } finally { running = false; } }
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
