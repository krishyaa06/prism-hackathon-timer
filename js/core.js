/* Prism Hackathon Timer · core logic */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  function parseDuration(s) {
    s = String(s).trim().toLowerCase();
    if (/^\d+(:\d{1,2}){1,2}$/.test(s)) { const p = s.split(":").map(Number); while (p.length < 3) p.unshift(0); return ((p[0] * 60 + p[1]) * 60 + p[2]) * 1000; }
    let ms = 0, matched = false;
    s.replace(/(\d+(?:\.\d+)?)\s*(d|h|m|s)/g, (_, n, u) => { matched = true; ms += +n * { d: 864e5, h: 36e5, m: 6e4, s: 1e3 }[u]; });
    if (!matched && /^\d+$/.test(s)) return +s * 6e4;
    return matched ? ms : NaN;
  }
  function split(ms) {
    const neg = ms < 0; ms = Math.abs(ms);
    const t = Math.floor(ms / 1000);
    return { neg, d: Math.floor(t / 86400), h: Math.floor((t % 86400) / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
  }
  const pad = (n) => String(n).padStart(2, "0");
  function format(ms) {
    const x = split(ms), h = x.d * 24 + x.h;
    return `${x.neg ? "+" : ""}${pad(h)}:${pad(x.m)}:${pad(x.s)}`;
  }
  function parseSchedule(text) {
    return String(text).split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
      const m = /^(\d+m|\d+(?:[:.]\d+)?h?)\s*[-–|]?\s*(.+)$/i.exec(l); if (!m) return null;
      let off = m[1].toLowerCase();
      const at = off.endsWith("m") ? +off.slice(0, -1) * 6e4 : /[:.]/.test(off) ? (() => { const [h, mi] = off.replace("h", "").split(/[:.]/).map(Number); return (h * 60 + mi) * 6e4; })() : parseFloat(off) * 36e5;
      return { at, title: m[2].trim() };
    }).filter(Boolean).sort((a, b) => a.at - b.at);
  }
  function status(start, durationMs, now, schedule = []) {
    const elapsed = Math.max(0, now - start), remaining = start + durationMs - now;
    const progress = Math.min(1, Math.max(0, elapsed / durationMs));
    let current = null, next = null;
    for (const ev of schedule) { if (ev.at <= elapsed) current = ev; else { next = ev; break; } }
    const phase = remaining <= 0 ? "over" : remaining <= 5 * 6e4 ? "final" : remaining <= 60 * 6e4 ? "last-hour" : "running";
    return { elapsed, remaining, progress, current, next, nextIn: next ? next.at - elapsed : null, phase };
  }
  return { parseDuration, format, split, parseSchedule, status };
});
