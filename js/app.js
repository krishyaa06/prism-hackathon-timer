(() => {
  const { $, $$, store, toast } = Prism;
  const SCHED = `0h - Kickoff & team formation\n1h - Hacking begins\n6h - Dinner\n12h - Midnight mentor round\n18h - Breakfast\n22h - Submissions open\n23:30 - Final commits\n24h - Demos`;
  let S = store.get("hk:state", { start: null, pausedAt: null, dur: "24h", sched: SCHED, name: "Prism Hack Night" });
  const save = () => store.set("hk:state", S);
  let lastPhase = null, lastEvent = null;
  const beep = () => { if (!$("#chime").checked) return; try { const a = new AudioContext(), o = a.createOscillator(), g = a.createGain(); o.frequency.value = 880; o.connect(g); g.connect(a.destination); g.gain.setValueAtTime(.2, a.currentTime); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + .6); o.start(); o.stop(a.currentTime + .6); } catch {} };
  function tick() {
    const dur = Core.parseDuration(S.dur), sched = Core.parseSchedule(S.sched);
    $("#dur").classList.toggle("bad", isNaN(dur));
    if (isNaN(dur)) return;
    const now = S.pausedAt ?? Date.now(), start = S.start ?? now;
    const st = Core.status(start, dur, now, sched);
    $("#digits").textContent = Core.format(S.start ? Math.max(0, st.remaining) : dur);
    $("#bar").style.width = `${(S.start ? st.progress : 0) * 100}%`;
    const phase = !S.start ? "ready" : S.pausedAt ? "paused" : st.phase;
    $("#phase").textContent = { ready: "Ready", paused: "Paused", running: `${Math.round(st.progress * 100)}% elapsed`, "last-hour": "Final hour", final: "Final minutes", over: "Time's up — pencils down" }[phase];
    $("#clock").className = `card clock ${phase}`;
    $("#cur").textContent = S.start && st.current ? st.current.title : "—";
    $("#nxt").textContent = st.next ? `${st.next.title} · in ${Core.format(S.start ? st.nextIn : st.next.at)}` : "—";
    if (S.start && !S.pausedAt) {
      if (lastPhase && phase !== lastPhase) { beep(); toast($("#phase").textContent); }
      if (lastEvent !== null && st.current && st.current !== lastEvent && st.current.title !== lastEvent?.title) { beep(); toast(`Now: ${st.current.title}`); }
    }
    lastPhase = phase; lastEvent = st.current || null;
    document.title = S.start ? `${Core.format(Math.max(0, st.remaining))} · ${S.name}` : "Prism Hackathon Timer";
  }
  $("#dur").value = S.dur; $("#sched").value = S.sched; $("#name").textContent = S.name;
  $("#dur").oninput = (e) => { S.dur = e.target.value; save(); tick(); };
  $("#sched").oninput = (e) => { S.sched = e.target.value; save(); tick(); };
  $("#name").oninput = (e) => { S.name = e.target.textContent; save(); };
  $$("#presets button").forEach((b) => (b.onclick = () => { $("#dur").value = S.dur = b.dataset.d; save(); tick(); }));
  $("#start").onclick = () => { if (S.pausedAt) { S.start += Date.now() - S.pausedAt; S.pausedAt = null; } else if (!S.start) S.start = Date.now(); save(); tick(); };
  $("#pause").onclick = () => { if (S.start && !S.pausedAt) { S.pausedAt = Date.now(); save(); tick(); } };
  $("#reset").onclick = () => { if (!S.start || confirm("Reset the timer?")) { S.start = S.pausedAt = null; save(); tick(); } };
  $("#fs").onclick = () => (document.fullscreenElement ? document.exitFullscreen() : $("#clock").requestFullscreen?.());
  document.addEventListener("keydown", (e) => { if (e.target.closest("input,textarea,[contenteditable]")) return; if (e.key === " ") { e.preventDefault(); (S.start && !S.pausedAt ? $("#pause") : $("#start")).click(); } if (e.key === "f") $("#fs").click(); });
  window.prismTimer = S;
  tick(); setInterval(tick, 250);
})();
