// Call stack works in LIFO like a stack data structure

function multiply(x, y) {
  return x * y;
}

function square(n) {
  // square calls multiply
  return multiply(n, n);
}

function isRightTriangle(a, b, c) {
  // isRightTriangle calls square three times
  return square(a) + square(b) === square(c);
}

// The Trigger
isRightTriangle(3, 4, 5);

//Example of stack overflow:

// function chicken() {
//   egg();
// }

// function egg() {
//   chicken();
// }

// chicken();  Uncaught RangeError: Maximum call stack size exceeded