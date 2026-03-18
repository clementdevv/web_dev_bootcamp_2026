

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection Open!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR!!!");
        console.log(err);
    })

const preductSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    price: {
        type: Number,        
    }
})

const product = mongoose.model('Product', preductSchema); 

const bike = new product({name: 'Mountain Bike', price: 599});
