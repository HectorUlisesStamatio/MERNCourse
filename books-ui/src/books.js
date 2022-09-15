import React from "react";

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allBooks:[]
        }
        this.getAllBooks = this.getAllBooks.bind(this);
    }

    getAllBooks(){      
        /*
        ----------------------------------------
        |Logic to fetch all books from the API | 
        ----------------------------------------
        */
       fetch('http://localhost:8080/api/books').then(res => {
        res.json()
       }).then(result =>{
            this.setState({
                allBooks: result
            })
       }).catch(error => console.log(error));
    }

    render(){
        return(
            <div>
                <button type="button" onClick={this.getAllBooks}>Get books</button>
                <button type="button">Add book</button>
            </div>
        )
    }
}

export default Books;