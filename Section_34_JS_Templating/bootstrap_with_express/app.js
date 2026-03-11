

const express = require("express");
const app = express();

// tell express to use EJS
app.set("view engine", "ejs");

// route
app.get("/", (req, res) => {
    res.render("index");
});

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});