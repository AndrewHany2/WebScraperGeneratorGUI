import React, { Component } from 'react';
import axios from "axios";


class GenerateSchema extends Component {
    state = {}

    componentWillMount = () => {
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/todos')
			.then((response) => {
				this.setState({
					todos: response.data,
					uiLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
    console.log(this.state.todos)
    };
    

    render() {
        return (
        <div>
            Hello World
            {console.log(this.state.todos)}
        </div>
        );
    }
}

export default GenerateSchema;