/*
----------------------------------------
| ⚙️ Importing express                 | 
----------------------------------------
*/
const { application, response } = require('express');
const express = require('express');
///////////////////////////////////////////
/*
----------------------------------------
| ⚙️ Importing Mongodb                 | 
----------------------------------------
*/
const MongoClient = require('mongodb').MongoClient
//////////////////////////////////////////
/*
----------------------------------------
| ⚙️ Creating express app              | 
----------------------------------------
*/
const app = express()
/*
----------------------------------------
| ⚙️ Importing Swagger                 | 
----------------------------------------
*/
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//////////////////////////////////////////

app.use(express.json())
var database


/*
----------------------------------------
| ⚙️ Creating the options to Swagger   | 
----------------------------------------
*/
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
///////////////////////////////////////////

/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if get method is working or not.
 *      description: This api is used to check if get method is working or not.
 *      responses: 
 *          200:
 *              description: To test Get method
 */
app.get('/', (req,resp) => {
    resp.send('Welcome to Mongo API');
})

/**
 * @swagger
 * components:
 *      schema:
 *          Book:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * /api/books:
 *  get:
 *      summary: To get all books from mongodb.
 *      description: This api is used to fetch data from MongoDB.
 *      responses: 
 *          200:
 *              description: This api is used to fetch data from MongoDB.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
 */
app.get('/api/books',(req,resp) => {
    database.collection('books').find({}).toArray((err,result) =>{
        if(err) throw err;
        resp.send(result)
    })
})

/**
 * @swagger
 * /api/books/{id}:
 *  get:
 *      summary: To get a book from mongodb.
 *      description: This api is used to fetch data from MongoDB.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID required
 *          schema:
 *              type: integer
 *      responses: 
 *          200:
 *              description: This api is used to fetch data from MongoDB.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
 */
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