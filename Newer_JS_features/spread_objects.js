

// Spread with Objects
// The spread operator (...) copies key-value pairs from one object into another

const basicInfo = { name: 'Taylor', age: 30 };
const contactInfo = { email: 'taylor@email.com', phone: '555-1234' };

// Merge two objects
const fullProfile = { ...basicInfo, ...contactInfo };
console.log(fullProfile);
// { name: 'Taylor', age: 30, email: 'taylor@email.com', phone: '555-1234' }

// Copy an object (shallow copy)
const original = { x: 1, y: 2 };
const copy = { ...original };
copy.x = 99;
console.log(original); // { x: 1, y: 2 } — untouched
console.log(copy);     // { x: 99, y: 2 }

// Add or override properties
const defaults = { theme: 'light', language: 'en', notifications: true };
const userPrefs = { theme: 'dark', language: 'fr' };

// Later spreads win — userPrefs.theme overrides defaults.theme
const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: 'dark', language: 'fr', notifications: true }

// Practical: updating one field without mutating the original
const user = { id: 1, name: 'Sam', role: 'viewer' };
const promoted = { ...user, role: 'admin' };
console.log(user);     // { id: 1, name: 'Sam', role: 'viewer' } — unchanged
console.log(promoted); // { id: 1, name: 'Sam', role: 'admin' }