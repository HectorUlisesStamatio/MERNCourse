/*
----------------------------------------
| ⚙️ Importing express                 | 
----------------------------------------
*/
const { application, response } = require('express');
const express = require('express');

/*
----------------------------------------
| ⚙️ Creating express app              | 
----------------------------------------
*/

const app = express();
app.use(express.json())

/*
----------------------------------------
|🗄️ Creating a sample database         | 
----------------------------------------
*/
const books=[
    {title: 'Java Programming', id:1},
    {title: 'C# Programming', id:2},
    {title: 'NodeJS Programming', id:3},
]

/*

----------------------------------------
| 🎯 Simple Response                   | 
----------------------------------------
| Method: GET                          |
| URL: http://localhost:8080/          |
| Params: None                         |                              
| response:Message                     |
|                                      |
|______________________________________|

*/

app.get('/',(req,resp) =>{
    resp.send('Welcome to Study Automation to learn REST API with Node JS')
})

/*

------------------------------------------------
| 🎯 Get All Books                             | 
------------------------------------------------
| Method: GET                                  |
| URL: http://localhost:8080/api/books         |
| Params: None                                 |                              
| response: Array books                        |
|                                              |
|______________________________________________|

*/

app.get('/api/books', (req,resp) => {
    resp.send(books)
})

/*

------------------------------------------------
| 🎯 Get Book (Object)                         | 
------------------------------------------------
| Method: GET                                  |
| URL: http://localhost:8080/api/books/:id     |
| Params: int id                               |                              
| response: Book                               |
| On error: return 404 status code             |
|______________________________________________|

*/

app.get('/api/books/:id', (req,resp) => {
    const book = books.find(v => v.id === parseInt(req.params.id));
    if(!book) resp.status(404).send('Book not found')
    resp.send(book)
})

/*

------------------------------------------------
| 🎯 Insert Book                               | 
------------------------------------------------
| Method: POST                                 |
| URL: http://localhost:8080/api/books/addBook |
| Params: String Title                         |                              
| response: Book                               |
|                                              |
|______________________________________________|

*/

app.post('/api/books/addBook', (req,resp) => {
    const book = {
        id:books.length+1,
        title: req.body.title,
    }
    books.push(book)
    resp.send(book)
})

/*

------------------------------------------------
| 🎯 Update Book                               | 
------------------------------------------------
| Method: PUT                                  |
| URL: http://localhost:8080/api/books/:id     |
| Params: Int id,String Title                  |                              
| response: Book                               |
| On error: return 404 status code             |
|______________________________________________|

*/

app.put('/api/books/:id', (req,resp) => {
    const book = books.find(v => v.id === parseInt(req.params.id));
    if(!book) resp.status(404).send('Book not found')

    book.title = req.body.title
    resp.send(book)
})

/*

------------------------------------------------
| 🎯 Delete Book                               | 
------------------------------------------------
| Method: DELETE                               |
| URL: http://localhost:8080/api/books/:id     |
| Params: Int id                               |                              
| response: Book                               |
| On error: return 404 status code             |
|______________________________________________|

*/

app.delete('/api/books/:id', (req,resp) =>{
    const book = books.find(v => v.id === parseInt(req.params.id));
    if(!book) resp.status(404).send('Book not found')
    const index = books.indexOf(book)
    books.splice(index, 1)
    resp.send(book)
})



/*

----------------------------------------
| ⚙️ Start on port 8080                | 
----------------------------------------

*/
app.listen(8080)