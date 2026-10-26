<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:FF6B9A,100:FFC857&height=200&section=header&text=Prism%20Hackathon%20Timer&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Fullscreen%20countdown%20%2B%20live%20schedule&descAlignY=58&descSize=16" width="100%" alt="Prism Hackathon Timer" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=FF6B9A&center=true&vCenter=true&width=680&lines=24%3A00%3A00+%E2%86%92+ship+it;Now%3A+Midnight+mentor+round;Final+hour+alerts;Press+F+for+fullscreen" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-hackathon-timer/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-hackathon-timer/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-hackathon-timer/"><img src="https://img.shields.io/badge/Live_Demo-Open-FF6B9A?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-FF6B9A?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-hackathon-timer?style=for-the-badge&color=FFC857" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Hackathon Timer screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="" />

## ⚡ Overview

**Prism Hackathon Timer** is the countdown you put on the big screen at a hackathon, game jam or build sprint. Set a duration like `24h` or `1h30m`, paste a simple schedule (`6h - Dinner`), and the screen shows the giant timer, a progress bar, what's happening now and what's next. It warns in the final hour, pulses in the last five minutes, chimes on milestones and keeps its state across reloads.

## ✨ Features

- **Giant tabular countdown**, fullscreen mode for projectors
- **Schedule by offset** — `0h Kickoff`, `90m Talk`, `23:30 Final commits`
- **Now / Up next** cards with time until the next event
- **Phases**: running → final hour → final minutes → time's up, with chimes
- **Pause / resume / reset**, state saved locally (survives refresh)
- Shortcuts: `Space` start/pause, `F` fullscreen; editable event name

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Hackathon Timer on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Hackathon Timer on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-hackathon-timer/](https://krishyaa06.github.io/prism-hackathon-timer/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-hackathon-timer.git
cd prism-hackathon-timer
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Set the duration and edit the schedule (one `offset - title` per line).
2. Click the event name to rename it.
3. Press **Start** (or `Space`), then **Fullscreen** (or `F`) on the projector.

## 📁 Project Structure

```text
prism-hackathon-timer/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # timer loop, chimes, fullscreen
│   ├── core.js   # duration/schedule parsing + status — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Hackathon Timer is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" alt="Soumya Bhandare" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFC857,50:FF6B9A,100:07060f&height=110&section=footer" width="100%" alt="" />
