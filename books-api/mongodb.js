const { application, response } = require('express');
const express = require('express');
const MongoClient = require('mongodb').MongoClient
const app = express()
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json())
var database

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS API Project for mongodb',
            version:'1.0.0'
        },
        servers:[
            {
               url: 'http://localhost:8080/'
            }
        ]
    },
    apis: ['./mongodb.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))


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

app.post('/api/books/addBook', (req, resp) =>{
    let res = database.collection('books').find({}).sort({id: -1}).limit(1)
    res.forEach(obj =>{
        if(obj){
            let book = {
                id: obj.id + 1,
                name: req.body.name
            }
            database.collection('books').insertOne(book, (err,result)=>{
                if(err) resp.status(500).send(err)
                resp.send('Added successfully')
            })
        }
    })
})

app.put('/api/books/:id',(req,resp) => {
    let query = {id: parseInt(req.params.id)}
    let book = {
        id: parseInt(req.params.id),
        name: req.body.name
    }
    let dataSet = {
        $set: book
    }
    database.collection('books').updateOne(query,dataSet, (err,result)=>{
        if(err) throw err
        resp.send(book)
    })
})

app.delete('/api/books/:id',(req,resp) => {
    database.collection('books').deleteOne({id: parseInt(req.params.id)},(err,result)=>{
        if(err) throw err
        resp.send("DeleteOperation Sucessfully")
    })
})

app.listen(8080, () =>{
    MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true},(error, result) =>{
        if(error) throw error;
        database = result.db('mydatabasse')
        console.log('Connection sucessfully established');
    })
})