# 🧠 debounced-input-listener

> A lightweight, dependency-free JavaScript utility to detect when a user stops typing in an input field — with built-in debouncing and easy cleanup.

---

[![npm version](https://img.shields.io/npm/v/debounced-input-listener.svg)](https://www.npmjs.com/package/debounced-input-listener)
[![license](https://img.shields.io/npm/l/debounced-input-listener.svg)](LICENSE)
[![bundle size](https://badgen.net/bundlephobia/minzip/debounced-input-listener)](https://bundlephobia.com/result?p=debounced-input-listener)

---

## ✨ Features

- ⌨️ Detect when the user **stops typing**
- ⏱️ Configurable **debounce delay**
- 🔁 Attach to **multiple inputs** at once
- 🧹 Built-in **cleanup function**
- ⚡ No dependencies – super lightweight

---

## 📦 Installation

```bash
npm install debounced-input-listener
```

---

## 📖 How to Use

### Step 1: Add an input field in HTML

```html
<input id="searchBox" placeholder="Type something..." />
```

### Step 2: Import and attach the listener

```js
import { attachDebouncedInputListener } from 'debounced-input-listener';

attachDebouncedInputListener('#searchBox', (e) => {
  console.log('User stopped typing:', e.target.value);
}, { delay: 500 });
```

✅ That’s it! The callback runs only after the user stops typing for 500ms.

- Works with any input or textarea.
- You can pass a CSS selector that matches one or more elements.

---

## 🎯 API Reference

### `attachDebouncedInputListener(selector, callback, options?)`

| Parameter | Type     | Description                                              |
|-----------|----------|----------------------------------------------------------|
| selector  | string   | CSS selector to match input(s)                           |
| callback  | Function | Runs when the user stops typing. Receives the event object. |
| options   | Object   | Optional `{ delay?: number, eventType?: string }`        |

#### Options
- `delay` — Time (in ms) to wait after the last keypress. **Default:** `500`
- `eventType` — Type of event to listen for (`input`, `keyup`, etc). **Default:** `'input'`

---

## 🧹 Cleanup Support

The function returns a `cleanup()` method to remove all event listeners:

```js
const cleanup = attachDebouncedInputListener('#input1', (e) => {
  console.log(e.target.value);
}, { delay: 600 });

// Later, when needed:
cleanup(); // removes all attached listeners
```

---

## 📄 License

MIT

---

**Developed by Venura Jayasingha**
