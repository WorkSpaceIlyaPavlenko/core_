# Core

UI engine that builds React components from declarative configurations (AST) converted into runtime state, signals, and a visual tree.

⚛️ React · 🧠 Effector · 🛡 Zod · 🔐 Node Crypto

---

## What is it

**Core** is a UI engine where interfaces are described **not with JSX**, but with **declarative AST configurations**.

The project focuses on:

- scalability
- strict contracts
- separation of concerns
- runtime UI extension

---

## Core idea

UI is described via configurations:

```ts
Config.Elements.Button({
  core: { id: 'btn_1', kind: 'button' },
  props: { text: 'Click me' },
  behavior: { emit: [...] }
})
```

The engine then:

- parses AST
- registers runtime state in stores
- registers signals
- returns a React component subscribed to stores and events

---

## Layered architecture

```
┌──────────────────────────┐
│        Config (AST)      │  ← declarative UI description
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│          Engine          │  ← parsing, validation, routing
└───────┬────────┬─────────┘
        ↓        ↓
┌────────────┐ ┌──────────────┐
│  Register  │ │   Signals    │
│ (Effector) │ │  (Handlers)  │
└────┬───────┘ └────┬─────────┘
     ↓               ↓
┌──────────────────────────┐
│       Transformer        │  ← runtime → React
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│        React UI          │
└──────────────────────────┘
```

---

## Layers and responsibilities

### Config (AST layer)

- pure declarative layer
- ❌ no state
- ❌ no effects
- ❌ no DOM / React

```ts
interface NodeAstConfigType {
  core: { id: string; kind: string; children?: string[] }
  initialState?: unknown
  props?: unknown
  behavior?: unknown
}
```

---

### Engine

Entry point.

Responsibilities:
- AST parsing
- post-order DFS
- skip already processed ids
- routing data into required layers

```ts
engine.run(ast)
```

---

### Register (Effector)

Runtime state.

- one store per entity (button, text, container)
- data stored by id
- updates via events

---

### Signals layer

Centralized runtime event manager.

Features:
- global singleton
- stable hash-based signalId
- multiple actions per signal
- sorting by elKind
- delegation to handlers

---

### Handlers

Reaction business logic.

Each handler:
- stores signalId → RuntimeSignal
- applies emit.payload
- updates required store

---

### Transformer

Runtime → React conversion.

---

### Mount

Pipeline glue and dynamic extension.

---

## Dependencies

- **React** — rendering layer
- **Effector** — runtime state and events
- **Zod** — runtime validation and contracts
- **Node Crypto** — stable signal identifiers
