const m = "CNY", f = {
  usd: "USD",
  dollar: "USD",
  dollars: "USD",
  美元: "USD",
  美金: "USD",
  cny: "CNY",
  rmb: "CNY",
  yuan: "CNY",
  人民币: "CNY",
  元: "CNY",
  eur: "EUR",
  euro: "EUR",
  欧元: "EUR",
  jpy: "JPY",
  yen: "JPY",
  日元: "JPY",
  hkd: "HKD",
  港币: "HKD",
  gbp: "GBP",
  pound: "GBP",
  英镑: "GBP"
}, b = {
  kg: { base: "g", factor: 1e3 },
  千克: { base: "g", factor: 1e3 },
  公斤: { base: "g", factor: 1e3 },
  g: { base: "g", factor: 1 },
  克: { base: "g", factor: 1 },
  斤: { base: "g", factor: 500 },
  兩: { base: "g", factor: 50 },
  两: { base: "g", factor: 50 },
  lb: { base: "g", factor: 453.59237 },
  lbs: { base: "g", factor: 453.59237 },
  磅: { base: "g", factor: 453.59237 },
  km: { base: "m", factor: 1e3 },
  千米: { base: "m", factor: 1e3 },
  公里: { base: "m", factor: 1e3 },
  m: { base: "m", factor: 1 },
  米: { base: "m", factor: 1 },
  cm: { base: "m", factor: 0.01 },
  厘米: { base: "m", factor: 0.01 },
  mm: { base: "m", factor: 1e-3 },
  毫米: { base: "m", factor: 1e-3 },
  l: { base: "ml", factor: 1e3 },
  L: { base: "ml", factor: 1e3 },
  升: { base: "ml", factor: 1e3 },
  ml: { base: "ml", factor: 1 },
  毫升: { base: "ml", factor: 1 }
}, i = (e) => Number.isInteger(e) ? String(e) : e.toLocaleString("zh-CN", { maximumFractionDigits: 6 }), I = (e, t, r, o, a = {}) => ({
  id: e,
  title: t,
  content: r,
  summarize: "tool",
  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0ZjQ2ZTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSI0IiB5PSIyIiB3aWR0aD0iMTYiIGhlaWdodD0iMjAiIHJ4PSIyIi8+PGxpbmUgeDE9IjgiIHkxPSI2IiB4Mj0iMTYiIHkyPSI2Ii8+PGxpbmUgeDE9IjgiIHkxPSIxMCIgeDI9IjgiIHkyPSIxMCIvPjxsaW5lIHgxPSIxMiIgeTE9IjEwIiB4Mj0iMTIiIHkyPSIxMCIvPjxsaW5lIHgxPSIxNiIgeTE9IjEwIiB4Mj0iMTYiIHkyPSIxMCIvPjxsaW5lIHgxPSI4IiB5MT0iMTQiIHgyPSI4IiB5Mj0iMTQiLz48bGluZSB4MT0iMTIiIHkxPSIxNCIgeDI9IjEyIiB5Mj0iMTQiLz48bGluZSB4MT0iMTYiIHkxPSIxNCIgeDI9IjE2IiB5Mj0iMTQiLz48bGluZSB4MT0iOCIgeTE9IjE4IiB4Mj0iMTYiIHkyPSIxOCIvPjwvc3ZnPg==",
  metadata: {
    source: "quick-tools",
    query: o,
    ...a
  }
}), d = (e) => {
  const t = e.trim().replace(/（/g, "(").replace(/）/g, ")").replace(/×/g, "*").replace(/÷/g, "/").replace(/＝/g, "=").replace(/^calc(?:ulate)?\s*/i, "").replace(/^计算\s*/, "").replace(/=$/, "").trim();
  return !/[0-9]/.test(t) || !/^[\d+\-*/%().\s]+$/.test(t) || !/[+\-*/%]/.test(t) ? null : t;
}, M = (e) => {
  const t = d(e);
  if (!t) return null;
  try {
    const r = Function(`"use strict"; return (${t})`)();
    if (typeof r != "number" || !Number.isFinite(r)) return null;
    const o = i(r);
    return I("quick-tools-calc", `${t} = ${o}`, o, e, {
      tool: "calculator"
    });
  } catch {
    return null;
  }
}, S = (e) => {
  const t = e.trim().match(/^([\d.]+)\s*([a-zA-Z]+|[\u4e00-\u9fa5]+)\s*(?:=|to|转|换算(?:成)?|是多少)?\s*([a-zA-Z]+|[\u4e00-\u9fa5]+)$/i);
  if (!t) return null;
  const r = Number(t[1]), o = b[t[2]], a = b[t[3]];
  if (!Number.isFinite(r) || !o || !a || o.base !== a.base) return null;
  const n = r * o.factor / a.factor;
  return {
    amount: r,
    fromLabel: t[2],
    toLabel: t[3],
    value: n
  };
}, P = (e) => {
  const t = S(e);
  if (!t) return null;
  const r = i(t.value);
  return I(
    "quick-tools-unit",
    `${i(t.amount)} ${t.fromLabel} = ${r} ${t.toLabel}`,
    `${r} ${t.toLabel}`,
    e,
    { tool: "unit-converter" }
  );
}, l = (e) => f[e.trim().toLowerCase()] ?? f[e.trim()] ?? null, p = (e) => {
  const t = e.trim(), r = t.match(/^([\d.]+)\s*([a-zA-Z]+|[\u4e00-\u9fa5]+)\s*(?:=|to|转|换算(?:成)?|是多少)?\s*([a-zA-Z]+|[\u4e00-\u9fa5]+)$/i), o = t.match(/^([\d.]+)\s*([a-zA-Z]+|[\u4e00-\u9fa5]+)$/i);
  if (!r && o) {
    const s = Number(o[1]), u = l(o[2]);
    return !Number.isFinite(s) || !u || u === m ? null : { amount: s, from: u, to: m };
  }
  if (!r) return null;
  const a = Number(r[1]), n = l(r[2]), c = l(r[3]);
  return !Number.isFinite(a) || !n || !c || n === c ? null : { amount: a, from: n, to: c };
}, v = async (e) => {
  const t = p(e);
  if (!t) return null;
  try {
    const r = `https://api.frankfurter.dev/v2/rate/${t.from}/${t.to}`, o = await fetch(r);
    if (!o.ok) return null;
    const a = await o.json(), n = typeof a.rate == "number" ? a.rate * t.amount : void 0;
    if (typeof n != "number") return null;
    const c = a.date, s = i(n);
    return I(
      "quick-tools-currency",
      `${i(t.amount)} ${t.from} = ${s} ${t.to}`,
      `${s} ${t.to}，汇率日期 ${c ?? "latest"}`,
      e,
      {
        tool: "currency-converter",
        date: c,
        provider: "Frankfurter"
      }
    );
  } catch {
    return null;
  }
}, g = {
  pluginId: "quick-tools",
  source: "quick-tools",
  async search(e) {
    const t = [], r = P(e);
    r && t.push(r);
    const o = M(e);
    o && t.push(o);
    const a = await v(e);
    return a && t.push(a), [
      {
        source: "quick-tools",
        items: t
      }
    ];
  }
};
function C(e) {
  e.registerSearchProvider({
    source: g.source,
    search: (t) => g.search(t)
  });
}
export {
  C as activate,
  C as default
};
