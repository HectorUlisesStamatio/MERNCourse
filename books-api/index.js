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


    💡Execute the code with the command:
        nodemon index.js 
*/ 

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