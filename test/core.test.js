const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
const H = 36e5, M = 6e4;
test("parseDuration", () => {
  assert.equal(C.parseDuration("24h"), 24 * H);
  assert.equal(C.parseDuration("1h30m"), 90 * M);
  assert.equal(C.parseDuration("48:00:00"), 48 * H);
  assert.equal(C.parseDuration("45"), 45 * M);
  assert.ok(isNaN(C.parseDuration("soon")));
});
test("format", () => { assert.equal(C.format(25 * H + 61000), "25:01:01"); assert.equal(C.format(-5000), "+00:00:05"); });
test("schedule parse + order", () => {
  const s = C.parseSchedule("6h - Dinner\n0h Kickoff\n23:30 | Final commits\n90m - Talk");
  assert.deepEqual(s.map((e) => [e.at, e.title]), [[0, "Kickoff"], [90 * M, "Talk"], [6 * H, "Dinner"], [23.5 * H, "Final commits"]]);
});
test("status", () => {
  const sched = C.parseSchedule("0h Kickoff\n6h Dinner");
  const st = C.status(0, 24 * H, 2 * H, sched);
  assert.equal(st.current.title, "Kickoff"); assert.equal(st.next.title, "Dinner"); assert.equal(st.nextIn, 4 * H); assert.equal(st.phase, "running");
  assert.equal(C.status(0, 24 * H, 23.5 * H).phase, "last-hour");
  assert.equal(C.status(0, 24 * H, 24 * H - M).phase, "final");
  assert.equal(C.status(0, H, 2 * H).phase, "over");
});
