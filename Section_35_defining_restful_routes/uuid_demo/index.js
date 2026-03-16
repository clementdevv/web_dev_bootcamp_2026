
const { v4: uuid } = require('uuid');

const newComment = {
    id: uuid(), // Generates something like '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    username: req.body.username,
    comment: req.body.comment
};