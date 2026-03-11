
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/products", (req, res) => {

    const products = [
        "Laptop",
        "Phone",
        "Tablet",
        "Headphones"
    ];

    res.render("products", { products });

});

app.listen(3000);