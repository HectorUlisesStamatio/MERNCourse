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
        npm start
*/
import React from 'react';

/*
----------------------------------------
| ⚙️ Creating TODO class               | 
----------------------------------------
*/
class TODO extends React.Component {

    constructor(props) {
        super(props);
        /*
        ---------------------------------------------
        | ⚙️ Setting the state with the array items | 
        ---------------------------------------------
        |  💡text: the name of the new array item    |
       |   💡items: the to-do list                  |
        |                                             |                        
         |                                          |
        |                                            |
        |___________________________________________|
        */
        this.state = {
            text: '',
            items: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        /*
        ----------------------------------------
        | ⚙️ Prevent submit a blank space      | 
        ----------------------------------------
        */
        if (this.state.text.length === 0) return;

        
        /*
        ----------------------------------------
        | ⚙️ Creating the new todo item        | 
        ----------------------------------------
        */
        const newItem = {
            text: this.state.text,
            id: Date.now()
        }

        
        /*
        -----------------------------------------------
        | ⚙️ Setting the new array item on the array  | 
        -----------------------------------------------
        */
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }))
    }

    render() {
        /*
        ----------------------------------------
        | ⚙️ Return the front                  | 
        ----------------------------------------
        */
        return (
            <div>
                <h1>TODO Application</h1>
                <TODOList todoItems={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='id'>Input Item</label>
                    <input id='id' onChange={this.handleChange} value={this.state.text} />
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

/*
----------------------------------------
| ⚙️ Exporting the TODO Class          | 
----------------------------------------
*/
export default TODO;


/*
--------------------------------------------------------
| ⚙️ TODOList component to render the list of items    | 
--------------------------------------------------------
*/
class TODOList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.todoItems.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        )
    }
}

