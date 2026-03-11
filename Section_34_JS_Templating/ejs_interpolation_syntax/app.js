

const express = require("express");
const app = express();

app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//     const username = "Clement";
//     res.render("index", { username });
// });

app.get("/user", (req, res) => {

    const user = {
        name: "Clement",
        age: 28,
        profession: "Developer"
    };

    res.render("profile", { user });

});

app.listen(3000);