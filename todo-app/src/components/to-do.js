import React from 'react';

class TODO extends React.Component {
    constructor(props) {
        super(props);
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
        if (this.state.text.length === 0) return;

        const newItem = {
            text: this.state.text,
            id: Date.now()
        }

        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }))
    }

    render() {
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

export default TODO;


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

