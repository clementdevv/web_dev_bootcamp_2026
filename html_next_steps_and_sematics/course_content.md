# What is learnt in this module:

### 1. HTML5
- What's HTML5 - latest evolution of the standard that defines HTML (new stuff in HTML); we never install HTML, we just implement it into a browser.  

---

### 2. Block vs Inline Elements
- Block vs Inline elements - Inline elements fit in alongside other elements. Block level elements take up a whole "block" of space.

---

### 3. Key Grouping Elements
- **`<div>`**
  - A block-level element.
  - Used to group elements for styling or layout purposes.
- **`<span>`**
  - An inline element.
  - Used to group inline content for styling.
  - Unlike `<button>`, `<span>` is not inherently interactive.
- **Other Elements**
  - `<sub>` — Subscript text (e.g., H₂O).  
  - `<sup>` — Superscript text (e.g., x²).

---

### 4. Nice-to-Have Elements
- `<hr>` — Horizontal rule, used to separate content.  
- `<br>` — Line break.  
- `<sub>` / `<sup>` — Subscript and superscript.  
- **Emmet (VS Code tool)**  
  - Helps write HTML quickly with shortcuts (e.g., type `div>p` + Tab → generates a `<div>` containing `<p>`).  

---

### 5. HTML Entities / Entity Codes
- Used to represent special characters that are reserved in HTML or hard to type.  
  Examples: `&lt;` for `<`, `&gt;` for `>`, `&amp;` for `&`.
- Avoid using reserved characters directly in HTML.

---

### 6. Semantic Markup
Semantic elements give meaning to the content, making it more accessible and easier to understand:  
- **`<section>` vs `<div>`** — `<section>` is semantic; `<div>` is generic.  
- **Navigation and Structure**  
  - `<nav>` — Navigation links  
  - `<header>` — Page or section header  
  - `<footer>` — Page or section footer  
  - `<main>` — Main content of the page  
- **Other Semantic Elements**  
  - `<aside>` — Sidebar or tangential content  
  - `<figure>` / `<figcaption>` — For images or media with captions  
  - `<abbr>` — Abbreviations or acronyms

---

### 7. Emmet VS Code Extension
- Provides shortcuts to quickly write HTML code.  
- Built-in in VS Code, no installation required.  
- Example: Typing `ul>li*3` + Tab → generates a `<ul>` with three `<li>` items.

---

**Tip**:
Understanding the difference between semantic and non-semantic elements is crucial for accessibility, SEO, and clean code.