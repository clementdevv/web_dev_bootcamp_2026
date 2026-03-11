
const express = require("express");
const path = require("path");
const app = express();

// Tell Express to use EJS
app.set("view engine", "ejs");

// manually set views folder
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


//The key line here is: app.set("view engine", "ejs"); It tells Express, that whenever a view is rendered,EJS should be used as the template engine. 

