
# Introduction to the JavaScript DOM

## What is the DOM?

The **Document Object Model (DOM)** is a programming interface that represents an HTML document as a structured tree of objects. When a browser loads a webpage, it parses the HTML and builds this tree — every tag becomes a **node**, and JavaScript can read and manipulate that tree in real time.

Think of it this way: your HTML file is a static blueprint. The DOM is the live, interactive building that exists in memory while the page is running. JavaScript talks to the DOM through the global `document` object.

---

## Concepts Covered

### 1. `getElementById`
`document.getElementById("id")` selects a **single element** by its unique `id` attribute. It returns the element directly, or `null` if nothing matches. Since IDs must be unique on a page, this is the fastest and most direct way to grab a specific element.

---

### 2. `getElementsByTagName` & `getElementsByClassName`
Both methods return a **live HTMLCollection** — a list that automatically updates if the DOM changes.

- `getElementsByTagName("li")` — returns every `<li>` on the page.
- `getElementsByClassName("card")` — returns every element that has the class `card`.

Because HTMLCollections aren't true arrays, you need to spread them (`[...collection]`) or use `for...of` to iterate with array methods.

---

### 3. `querySelector` & `querySelectorAll`
The modern and most flexible selectors. They accept **any valid CSS selector** — tags, classes, IDs, attribute selectors, combinators, pseudo-classes, all of it.

- `querySelector(".card")` — returns the **first** matching element (or `null`).
- `querySelectorAll(".card")` — returns a **static NodeList** of all matches.

Unlike HTMLCollection, a NodeList supports `forEach` directly. It's "static" meaning it won't update if the DOM changes after the call.

---

### 4. `innerHTML`, `innerText` & `textContent`
Three properties for reading or writing the content inside an element — each with different behaviour:

| Property | Reads | Writes | Notes |
|---|---|---|---|
| `innerHTML` | Raw HTML markup | Parses and renders HTML | Powerful but XSS risk with user input |
| `innerText` | Visible text only | Plain text (tags become literal) | Respects CSS `display:none` |
| `textContent` | All text nodes | Plain text | Includes hidden nodes; fastest and safest |

---

### 5. Attributes
HTML attributes (`href`, `src`, `id`, `data-*`, etc.) can be managed with four methods:

- `getAttribute("name")` — reads the current value of an attribute.
- `setAttribute("name", "value")` — creates or updates an attribute.
- `hasAttribute("name")` — returns `true` or `false`.
- `removeAttribute("name")` — deletes the attribute from the element entirely.

---

### 6. `classList`
`classList` is a `DOMTokenList` — a clean API for managing CSS classes without manually manipulating the raw `className` string.

- `.add("x")` — adds a class (no duplicate created if already present).
- `.remove("x")` — removes a class (no error if absent).
- `.toggle("x")` — adds it if missing, removes it if present. Returns `true` if the class is now on.
- `.contains("x")` — returns `true` or `false`.
- `.replace("old", "new")` — swaps one class for another.

---

### 7. Traversing Parent / Child / Sibling
Once you have a reference to one element, you can navigate to related elements without running a new query:

| Property | Goes to |
|---|---|
| `el.parentElement` | The direct parent |
| `el.children` | HTMLCollection of direct child elements |
| `el.firstElementChild` | First child element |
| `el.lastElementChild` | Last child element |
| `el.previousElementSibling` | The sibling immediately before |
| `el.nextElementSibling` | The sibling immediately after |

The `Element` variants (above) are preferred over the older `Node` variants (`childNodes`, `firstChild`, etc.) because they skip invisible whitespace text nodes.

---

### 8. `append` & `appendChild`
Both insert new nodes at the end of a parent element, but they differ in flexibility:

- `parent.appendChild(node)` — classic method, accepts a **single Node**, returns the appended element.
- `parent.append(node, "text", ...)` — modern method, accepts **multiple Nodes and/or strings** in one call. Returns `undefined`.
- `parent.prepend(...)` — same API as `append` but inserts at the **beginning**.

The typical workflow: `document.createElement("tag")` → set properties → `append` or `appendChild` to a parent.

---

### 9. `remove` & `removeChild`
Two ways to delete an element from the DOM:

- `el.remove()` — modern, clean. Called directly on the element. No parent reference needed.
- `parent.removeChild(el)` — classic method. Must be called on the **parent node**, passing the child as an argument. Returns the removed node, which lets you re-insert it elsewhere if needed.

For most cases, `el.remove()` is simpler. `removeChild` is useful when you want to hold on to the detached node and reuse it.