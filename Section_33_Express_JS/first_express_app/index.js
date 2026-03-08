const express = require("express"); 
const app = express();

// Root route
app.get('/', (req, res) => {
    res.send("This is the root route");
});

// Basic routes
app.get('/cats', (req, res) => {
    res.send("Meow");
});

app.post('/cats', (req, res) => {
    res.send("Post request here for route cats");
});

app.get('/dogs', (req, res) => {
    res.send("Woof");
});


// Express Path Parameters
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`Browsing the ${subreddit} subreddit`);
});


app.get('/r/:subreddit/comments/:id', (req, res) => {
    const { subreddit, id } = req.params;
    res.send(`Viewing comment ${id} in ${subreddit}`);
});




// Query Strings
app.get('/search', (req, res) => {
    const { q } = req.query;

    if (!q) {
        res.send("Nothing to search for!");
    } else {
        res.send(`Search results for: ${q}`);
    }
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});

