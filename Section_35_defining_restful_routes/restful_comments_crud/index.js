
const express = require('express');
const methodOverride = require('method-override');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // Parsing (Video 3)
app.use(methodOverride('_method')); // Method Override (Video 11)

// Mock Data
let comments = [
    { id: 1, username: 'Todd', comment: 'lol so funny!' },
    { id: 2, username: 'Skyler', comment: 'I like turtles.' }
];

// INDEX - GET /comments (Video 6)
app.get('/comments', (req, res) => { res.send(comments); });

// NEW - GET /comments/new (Video 7)
// SHOW - GET /comments/:id (Video 9)

// CREATE - POST /comments (Video 2 & 5)
app.post('/comments', (req, res) => {
    // Logic to push to array
    res.redirect('/comments'); // Redirect (Video 8)
});

// UPDATE - PATCH /comments/:id (Video 12)
// DELETE - DELETE /comments/:id (Video 12)

app.listen(3000, () => console.log("Server running on port 3000"));