
const express = require("express");
const app = express();

app.set("view engine", "ejs");

// serve static files
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000);