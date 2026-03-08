# process and argv in Node.js

Node.js provides a global object called **process** that contains
information about the current Node.js program and its environment.

One commonly used property is **process.argv**.

## What is process.argv?

**process.argv** is an array that stores the command-line arguments
passed when running a Node.js script.

Example command:

node app.js hello world

## What the array contains

process.argv[0] → path to the Node executable  
process.argv[1] → path to the script file  
process.argv[2+] → arguments provided by the user

Example:

console.log(process.argv);

Output may look like:

["/usr/bin/node", "/app.js", "hello", "world"]

This allows Node.js programs to accept **user input from the terminal**.
