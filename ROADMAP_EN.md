# Project Roadmap

Core is designed not as a finished library, but as the core of an ecosystem.
Below is a holistic vision of its future development.

---

## 🔧 DevKit (Developer Kit)

DevKit is a tooling layer for authoring configurations, not part of runtime.

### 🎯 DevKit Goals
- AST authoring assistance
- id / kind control
- conflict prevention
- convenient signal workflows
- future IDE integration

### 📦 Current State

Currently, DevKit:
- stores a registry of `{ id, kind }`
- is used during configuration development
- does not participate in runtime
- is excluded from production

```ts
items.register({ id: 'button_1', kind: 'button' })
```

### 🔮 Planned DevKit Features

#### 1. AST Index
- global registry of all elements
- id uniqueness validation
- fast lookup by kind / owner

#### 2. IDE Hints
- autocomplete for `targetId` in `behavior.emit`
- allowed `elKind` suggestions
- payload hints by entity type

#### 3. Dev Warnings
Warnings for:
- missing `targetId`
- incompatible `payload`
- unused signals

#### 4. AST Inspector
- tree visualization
- signal relationship view
- behavior debugging

---

## 🧩 Engine Extensions

### 🔹 Improved Parser
- optimized DFS
- partial-run support
- hot-reparse of modified branches only

### 🔹 Containers
- advanced layout containers
- grid / flow / virtual
- lazy-children

### 🔹 Behavior Extensions
- system signals
- conditional emits
- chained emits

---

## 🔔 Signals & Handlers

Planned:
- signal middleware
- async handlers
- debounce / throttle
- transactional emits
- dev signal logs

```
UI Event
   ↓
Signal
   ↓
Handler
   ↓
Store patch
```

---

## 🧠 Runtime Optimizations
- update batching
- memo selectors
- selective re-render
- tree diff without React reconciliation

---

## 🏗 Builder App

### 🎯 Idea

A standalone web application that uses Core as its engine.
Not part of core — just a consumer.

### Builder App Capabilities

#### 🖱 Visual Editor
- drag & drop elements
- props editing
- children management

#### 🔗 Signal Editor
- visual wiring
- emit configuration
- event chain inspection

#### 🌳 AST Tree View
- component tree
- id navigation
- quick node jump

#### 🧪 Runtime Preview
- instant runtime rendering
- signal validation
- live updates

### Builder App Architecture

```
Builder UI
   ↓
AST Editor
   ↓
Core
   ↓
Preview Renderer
```

Core stays clean and universal.
Builder is just one of its consumers.

---

## 📦 Ecosystem

```
┌───────────────┐
│   DevKit      │
└───────┬───────┘
        ↓
┌───────────────┐
│  Core         │
└───────┬───────┘
        ↓
┌───────────────┐
│ Builder App   │
└───────┬───────┘
        ↓
┌───────────────┐
│ Production UI │
└───────────────┘
```

---

## 🧠 Project Philosophy
- Core is minimal
- DevKit is powerful
- Builder is optional
- Runtime is strict
- UI is fully declarative

---

## 🏁 Conclusion

is not “just another UI framework”,
but a foundation for declarative and extensible UI systems.
