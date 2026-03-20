---
title: ""
---

<div class="home-hero">
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<p class="eyebrow">✦ Personal Knowledge Base</p>

# A mind *laid open.*

Notes, ideas, and half-formed thoughts — captured before they disappear. This is where curiosity gets to roam freely.

<div class="hero-btns">

[Browse Topics →](/tags)

<button class="btn-ghost" id="open-graph-btn">🕸 View Graph</button>

</div>

<div class="stats-row">
<div class="stat"><span class="snum">12+</span><span class="slbl">Notes</span></div>
<div class="sdiv"></div>
<div class="stat"><span class="snum">3</span><span class="slbl">Topics</span></div>
<div class="sdiv"></div>
<div class="stat"><span class="snum">∞</span><span class="slbl">Connections</span></div>
</div>

</div>

<div class="home-quote">

> The mind is not a vessel to be filled, but a fire to be kindled. — *Plutarch*

</div>

<div class="home-topics">

<p class="stag">EXPLORE</p>

## Topics

Pick a thread and pull.

- 🤖 **[Supervised Learning](/Supervised-Learning)** — Regression, classification, loss functions and the math behind machines that learn.
- 🧠 **[What is AI](/What-is-AI)** — Foundations, philosophy, and the big question — what does it mean for a machine to think?
- 📖 **More coming soon** — This garden is actively growing. New ideas get planted regularly.

</div>

<div class="home-how">

<p class="stag">HOW TO USE</p>

## Find your way around

- 🗂 **Browse the Explorer** — Use the sidebar to navigate folders and notes.
- 🔍 **Search anything** — Click the search bar or hit `/` to find any note instantly.
- 🕸 **Follow the Graph** — Click "View Graph" above to see all notes connected visually.
- 🔗 **Backlinks** — Every note shows what links to it — trace ideas backwards.

</div>

<script>
document.addEventListener("nav", () => {
  const btn = document.getElementById("open-graph-btn")
  if (!btn) return

  btn.addEventListener("click", () => {
    // Try clicking the global-graph-icon with retries
    let attempts = 0
    const tryClick = () => {
      const icons = document.getElementsByClassName("global-graph-icon")
      if (icons.length > 0) {
        icons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }))
      } else if (attempts < 10) {
        attempts++
        setTimeout(tryClick, 100)
      }
    }
    tryClick()
  })
})
</script>