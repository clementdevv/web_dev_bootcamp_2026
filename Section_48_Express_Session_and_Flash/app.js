const express = require('express');
const session = require('express-session');
const app = express();

// Session Configuration
app.use(session({
    secret: 'thisshouldbeabettersecret', // Used to sign the session ID cookie
    resave: false,               // Don't save session if unmodified
    saveUninitialized: true      // Save session even if it's empty
}));

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`);
});

const flash = require('connect-flash');

// Add this after your session middleware
app.use(flash());

// Middleware to handle flash messages for every request
app.use((req, res, next) => {
    // Whatever is in res.locals is accessible in your templates
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/test-locals', (req, res) => {
    req.flash('success', 'Locals are working!');
    res.redirect('/show-locals');
});

app.get('/show-locals', (req, res) => {
    // Notice we aren't passing ANYTHING to res.send manually from flash
    // In a real app, your EJS template would just look for 'success'
    res.send(`Check your server logic; success is: ${res.locals.success}`);
});

app.get('/register', (req, res) => {
    // Usually, you'd save a user to a DB here. 
    // For now, let's just 'flash' a success message.
    req.flash('success', 'Successfully registered a new user!');
    res.redirect('/greet');
});

app.get('/greet', (req, res) => {
    // Pull the message out of flash
    const message = req.flash('success');
    res.send(`Message from flash: ${message}`);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});