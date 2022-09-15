/*

                                                                                                                                      
88        88 88 88                                    ad88888ba                                                         88              
88        88 88 ""                                   d8"     "8b ,d                                               ,d    ""              
88        88 88                                      Y8,         88                                               88                    
88        88 88 88 ,adPPYba,  ,adPPYba, ,adPPYba,    `Y8aaaaa, MM88MMM ,adPPYYba, 88,dPYba,,adPYba,  ,adPPYYba, MM88MMM 88  ,adPPYba,   
88        88 88 88 I8[    "" a8P_____88 I8[    ""      `"""""8b, 88    ""     `Y8 88P'   "88"    "8a ""     `Y8   88    88 a8"     "8a  
88        88 88 88  `"Y8ba,  8PP"""""""  `"Y8ba,             `8b 88    ,adPPPPP88 88      88      88 ,adPPPPP88   88    88 8b       d8  
Y8a.    .a8P 88 88 aa    ]8I "8b,   ,aa aa    ]8I    Y8a     a8P 88,   88,    ,88 88      88      88 88,    ,88   88,   88 "8a,   ,a8"  
 `"Y8888Y"'  88 88 `"YbbdP"'  `"Ybbd8"' `"YbbdP"'     "Y88888P"  "Y888 `"8bbdP"Y8 88      88      88 `"8bbdP"Y8   "Y888 88  `"YbbdP"'   
                                                           
6969696969696969696969696969696969696969696969696969696969696696969696969696969696969696969696969696969696969696969696969669696969696969


    Watch the api docs on:
        http://localhost:8080/api-docs
    while the code is running
    
    💡Execute the code with the command:
        nodemon mongodb.js 
*/ 

/*
----------------------------------------
| ⚙️ Importing cors                    | 
----------------------------------------
*/

const cors = require('cors');
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
app.use(cors())
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
 *      schemas:
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
 *                              $ref: '#components/schemas/Book'
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
 *                              $ref: '#components/schemas/Book'
 */
app.get('/api/books/:id',(req,resp) => {
    database.collection('books').find({id: parseInt(req.params.id)}).toArray((err,result) =>{
        if(err) throw err;
        resp.send(result)
    })
})


/**
 * @swagger
 * /api/books/addBook:
 *  post:
 *      summary: used to insert data to mongodb.
 *      description: This api is used to fetch data from MongoDB.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Book' 
 *      responses: 
 *          200:
 *              description: Added successfully
 *             
 */
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

/**
 * @swagger
 * /api/books/{id}:
 *  put:
 *      summary: used to update data to mongodb.
 *      description: This api is used to fetch data from MongoDB.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *                 type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Book' 
 *      responses: 
 *          200:
 *              description: Updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Book'
 *             
 */
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


/**
 * @swagger
 * /api/books/{id}:
 *  delete:
 *      summary: To delete a book from mongodb.
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
 *              description: DeleteOperation Sucessfully
 */
app.delete('/api/books/:id',(req,resp) => {
    database.collection('books').deleteOne({id: parseInt(req.params.id)},(err,result)=>{
        if(err) throw err
        resp.send("DeleteOperation Sucessfully")
    })
})

/*
--------------------------------------------
| ⚙️ Starting the express app with MongoDb | 
--------------------------------------------
*/
app.listen(8080, () =>{
    MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true},(error, result) =>{
        if(error) throw error;
        database = result.db('mydatabasse')
        console.log('Connection sucessfully established');
    })
})