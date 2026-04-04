
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');

// Your routes using catchAsync
app.get('/users', catchAsync(async (req, res) => {
    const users = await User.find();
    res.send(users);
}));

// Manual error throw example
app.get('/admin', (req, res, next) => {
    return next(new ExpressError("Unauthorized", 403));
});

// Error handler — must be LAST
app.use((err, req, res, next) => {
    if (err.name === 'CastError') {
        err.message = "Invalid ID";
        err.statusCode = 400;
    }
    if (err.name === 'ValidationError') {
        err.message = "Validation failed";
        err.statusCode = 400;
    }

    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).send(message);
});