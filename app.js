const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
// const mongodb = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fqv0ljm.mongodb.net/?retryWrites=true&w=majority`;;
// mongoose.connect(mongodb).then(() => { console.log("Connected") }).catch((err) => { console.log(err); });

app.set('view engine', 'ejs');
app.listen(3000);

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fqv0ljm.mongodb.net/?retryWrites=true&w=majority`;;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log(err, collection);
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
    const items = [
        { name: 'Laptop', price: 1000 },
        { name: 'Book', price: 30 },
        { name: 'Alexa', price: 2000 },
    ]
    res.render('index', { items });
})

app.get('/add-item', (req, res) => {
    res.render('add-item');
})

app.use((req, res) => {
    res.render('error');
})


