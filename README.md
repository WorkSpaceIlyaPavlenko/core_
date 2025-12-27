<!-- README.md (GitHub) -->
<div align="center">

<h1 style="margin:0;">Core</h1>
<p style="margin:8px 0 0 0; opacity:.85;">
UI engine that builds React components from declarative AST configs.
</p>

<div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:12px;">
  <span style="padding:6px 10px; border:1px solid rgba(255,255,255,.12); border-radius:999px;">⚛️ React</span>
  <span style="padding:6px 10px; border:1px solid rgba(255,255,255,.12); border-radius:999px;">🧠 Effector</span>
  <span style="padding:6px 10px; border:1px solid rgba(255,255,255,.12); border-radius:999px;">🛡 Zod</span>
  <span style="padding:6px 10px; border:1px solid rgba(255,255,255,.12); border-radius:999px;">🔐 Node Crypto</span>
</div>

</div>

<br/>

<div style="display:grid; grid-template-columns:repeat(12, 1fr); gap:12px;">

  <!-- What it is -->
  <div style="grid-column:span 7; padding:16px; border:1px solid rgba(255,255,255,.12); border-radius:16px;">
    <h2 style="margin:0 0 8px 0;">What is Core</h2>
    <p style="margin:0; opacity:.9; line-height:1.5;">
      <b>Core</b> is a UI engine that builds React components <b>not from JSX</b>, but from
      <b>declarative configurations (AST)</b> that are transformed into runtime-state, signals, and a visual tree.
    </p>
    <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
      <span style="padding:6px 10px; border:1px solid rgba(255,255,255,.12); border-radius:999px;">Scalability</span>
      <span style="padding:6px 10px; border:1px solid rgba(255,255,255,.12); border-radius:999px;">Strict contracts</span>
      <span style="padding:6px 10px; border:1px solid rgba(255,255,255,.12); border-radius:999px;">Separation of concerns</span>
      <span style="padding:6px 10px; border:1px solid rgba(255,255,255,.12); border-radius:999px;">Dynamic UI at runtime</span>
    </div>
  </div>

  <!-- Key idea -->
  <div style="grid-column:span 5; padding:16px; border:1px solid rgba(255,255,255,.12); border-radius:16px;">
    <h2 style="margin:0 0 8px 0;">Key idea</h2>
    <p style="margin:0; opacity:.9; line-height:1.5;">
      UI is described as <b>configs</b>, then the engine:
    </p>
    <ul style="margin:10px 0 0 18px; opacity:.9; line-height:1.55;">
      <li>parses AST</li>
      <li>registers runtime-state in stores</li>
      <li>registers signals</li>
      <li>returns a ready React component subscribed to stores & events</li>
    </ul>
  </div>

  <!-- Example -->
  <div style="grid-column:span 12; padding:16px; border:1px solid rgba(255,255,255,.12); border-radius:16px;">
    <h2 style="margin:0 0 10px 0;">Example</h2>

```ts
Config.Elements.Button({
  core: { id: 'btn_1', kind: 'button' },
  props: { text: 'Click me' },
  behavior: { emit: [...] }
})
