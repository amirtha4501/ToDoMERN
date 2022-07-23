const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();
require('dotenv').config();

const mongodb = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fqv0ljm.mongodb.net/item-database?retryWrites=true&w=majority`;
// const mongodb = `mongodb+srv://amirtha4501:amirtha4501%40gmail.com@cluster0.fqv0ljm.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongodb, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected");
    app.listen(3000);
}).catch((err) => {
    console.log("ERROR -> ", err);
});

app.set('view engine', 'ejs');

app.get('/create-item', (req, res) => {
    const item = new Item({
        name: 'computer',
        price: 75000
    });
    item.save().then(result => res.send(result));
})

app.get('/', (req, res) => {
    res.redirect('/get-items');
})

app.get('/get-items', (req, res) => {
    Item.find()
        .then(items => {
            res.render('index', { items });
        })
        .catch(err => console.log(err))
})

app.get('/get-item', (req, res) => {
    Item.findById("62dbdf550315ccf6fdbc640b")
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

app.get('/add-item', (req, res) => {
    res.render('add-item');
})

app.use((req, res) => {
    res.render('error');
})


