# Comprehensive CSS Box Model Review

## 1. Width & Height
* **Content Box**: The core area where text and images appear.
* **Block Elements**: Take up 100% width by default.
* **Inline Elements**: Take up only as much width as their content.

## 2. Padding vs. Margin
* **Padding**: Inner space. It sits *inside* the border and shows the background color.
* **Margin**: Outer space. It pushes *other* elements away and is always transparent.
* **Shorthand**: `top right bottom left` (Clockwise).

## 3. Borders & Radius
* **Properties**: Width, Style (solid, dashed, etc.), and Color.
* **Border-Radius**: Rounds the corners. `50%` creates a circle if the element is a square.

## 4. Display Property
* **Block**: Starts on a new line (e.g., `<div>`, `<h1>`, `<p>`).
* **Inline**: Stays in the flow of text; ignores width/height (e.g., `<span>`, `<a>`).
* **Inline-Block**: Sits side-by-side like inline, but accepts width/height like block.

## 5. CSS Units (EM vs REM)
* **EM**: Relative to the **parent** element's font size. Good for components that should scale together.
* **REM**: Relative to the **root** (html) font size. Best for consistent spacing and accessibility.