# Flexbox & Responsive Design Summary

## 1. Flexbox Container Properties
- **display: flex;**: Activates the flex context for children.
- **flex-direction**: Sets the main axis (row or column).
- **justify-content**: Aligns items along the **Main Axis** (horizontal if row).
- **align-items**: Aligns items along the **Cross Axis** (vertical if row).
- **flex-wrap**: Determines if items should stay on one line or wrap to multiple lines.
- **align-content**: Only works when `flex-wrap` is active; aligns the rows themselves.

## 2. Flexbox Item Properties
- **flex-grow**: Ability for an item to grow if there is extra space (ratio-based).
- **flex-shrink**: Ability for an item to shrink if there isn't enough space.
- **flex-basis**: The initial size of an item before growing/shrinking.
- **align-self**: Allows a specific item to override the container's `align-items` value.

## 3. Responsive Design & Media Queries
- **The Viewport Meta Tag**: Essential for mobile rendering.
- **Media Queries**: Use `@media (max-width: px)` to apply CSS only when the screen is smaller than a certain size.
- **Responsive Nav**: Usually involves switching `flex-direction` from `row` to `column` or hiding elements behind a  
   toggle menu.
   