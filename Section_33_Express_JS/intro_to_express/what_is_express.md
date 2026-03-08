
# Express.js

**Express.js** is a minimal and flexible web framework for **Node.js** used to build web servers and APIs.

It sits on top of Node’s built-in HTTP module and simplifies common backend tasks.

## What Express Helps Us Do

Express helps us:

- start a server to listen for requests  
- parse incoming requests  
- match requests to routes  
- craft HTTP responses and associated content  

Example:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.listen(3000, () => console.log("Server running"));