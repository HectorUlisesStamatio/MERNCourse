const { application, response } = require('express');
const express = require('express');
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(express.json())
var database

app.get('/', (req,resp) => {
    resp.send('Welcome to Mongo API');
})

app.get('/api/books',(req,resp) => {
    database.collection('books').find({}).toArray((err,result) =>{
        if(err) throw err;
        resp.send(result)
    })
})

app.get('/api/books/:id',(req,resp) => {
    database.collection('books').find({id: parseInt(req.params.id)}).toArray((err,result) =>{
        if(err) throw err;
        resp.send(result)
    })
})

app.listen(8080, () =>{
    MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true},(error, result) =>{
        if(error) throw error;
        database = result.db('mydatabasse')
        console.log('Connection sucessfully established');
    })
})