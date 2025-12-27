# Core

Движок пользовательского интерфейса, который строит React-компоненты из декларативных конфигураций (AST), преобразуемых в runtime-состояние, сигналы и визуальное дерево.

⚛️ React · 🧠 Effector · 🛡 Zod · 🔐 Node Crypto

---

## Что это

**Core** — это UI-движок, в котором интерфейс описывается **не через JSX**, а через **декларативные конфигурации (AST)**.

Проект ориентирован на:

- масштабируемость
- строгие контракты
- разделение ответственности
- динамическое расширение UI во время выполнения

---

## Основная идея

UI описывается конфигурациями:

```ts
Config.Elements.Button({
  core: { id: 'btn_1', kind: 'button' },
  props: { text: 'Click me' },
  behavior: { emit: [...] }
})
```

Далее движок:

- парсит AST
- регистрирует runtime-state в сторах
- регистрирует сигналы
- возвращает React-компонент, подписанный на сторы и события

---

## Архитектура слоёв

```
┌──────────────────────────┐
│        Config (AST)      │  ← декларативное описание UI
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│          Engine          │  ← парсинг, валидация, маршрутизация
└───────┬────────┬─────────┘
        ↓        ↓
┌────────────┐ ┌──────────────┐
│  Register  │ │   Signals     │
│ (Effector) │ │ (Handlers)   │
└────┬───────┘ └────┬──────────┘
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

## Слои и ответственность

### Config (AST слой)

- чисто декларативный слой
- ❌ нет состояния
- ❌ нет эффектов
- ❌ нет DOM / React

```ts
interface NodeAstConfigType {
  core: { id: string; kind: string; children?: string[] }
  initialState?: unknown
  props?: unknown
  behavior?: unknown
}
```

Используется в IDE, devkit, валидации и engine.

---

### Engine

Точка входа.

Задачи:
- парсинг AST
- post-order DFS
- пропуск уже обработанных id
- маршрутизация данных в нужные слои

```ts
engine.run(ast)
```

Engine не хранит состояние, он:
- прокидывает state → Register
- прокидывает signals → SignalRegister

---

### Register (Effector)

Runtime-состояние.

- один стор = одна сущность (button, text, container)
- данные хранятся по id
- обновление через события

```ts
$buttons: Map<string, RuntimeButtonRegister>
```

---

### Signals Layer

Централизованный runtime-менеджер событий.

Особенности:
- глобальный singleton
- стабильные signalId (hash-based)
- несколько действий на один сигнал
- сортировка по elKind
- делегирование в handlers

```ts
onSignal(signalId, event)
```

---

### Handlers

Бизнес-логика реакций.

Каждый handler:
- хранит signalId → RuntimeSignal
- знает, как применить emit.payload
- обновляет нужный стор

Примеры:
- ButtonHandler
- TextHandler
- ContainerHandler

---

### Transformer

Преобразование runtime → React.

Задачи:
- подписаться на нужный стор
- получить данные по id
- вернуть UI-компонент

```tsx
<ButtonTransformer id="btn_1" kind="button" />
```

---

### Mount

Связка всего пайплайна.

```ts
const Component = Mount.create(ast)

Mount.dynamic([
  Config.Elements.ButtonDynamic(...),
  Config.Elements.TextDynamic(...)
])
```

- запускает engine
- возвращает React-компонент
- поддерживает динамическое добавление элементов

---

## Деревья и контейнеры

Контейнеры:
- хранят childrenIds
- сами собирают поддерево
- не требуют пересборки всего UI

```
Container → childrenIds → Transformer → React tree
```

---

## Dynamic UI

Поддерживается динамическое добавление элементов во время выполнения:

- парсятся только новые id
- старые узлы не трогаются
- сторы и сигналы обновляются инкрементально
- append-only подход

---

## DevKit (планиурется)

В проекте есть devkit для разработки:

```ts
items.register({ id, kind })
```

Используется для:
- подсказок
- отладки
- контроля id/kind
- будущей IDE-интеграции

---

## Алгоритмы и оптимизация

- post-order DFS
- skip уже обработанных id
- минимальные side-effects
- отсутствие пересборки дерева

---

## Валидация

Используется строгая runtime-валидация:

- AST
- behavior
- signals
- kinds / events

Ошибки ловятся **до runtime-рендера**.

---

## Зависимости

- **React** — визуальный слой, рендер компонентов, hooks
- **Effector** — runtime-state, stores, events
- **Zod** — строгая валидация и защита контрактов
- **Node Crypto** — генерация стабильных signalId
