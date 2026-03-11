
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    const loggedIn = true;

    res.render("dashboard", { loggedIn });

});

app.listen(3000);