import React, { Component } from 'react';

class WebRequireSignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Basic validation checks
        let errors = {};
        if (this.state.username === '') {
            errors.username = 'Username is required';
        }
        if (this.state.password === '') {
            errors.password = 'Password is required';
        }

        if (Object.keys(errors).length === 0) {
            // Submit the form
            console.log('Submitting form:', this.state);
            this.props.onLoginSuccess(); // Call the callback function passed as a prop
        } else {
            // Update the state with the errors
            this.setState({ errors });
        }
    }

    render() {
        return (
            <div className='login-box'>
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <div className='form-element'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                    {this.state.errors.username && (
                        <div className="error">{this.state.errors.username}</div>
                    )}
                </div>
                <div className='form-element'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    {this.state.errors.password && (
                        <div className="error">{this.state.errors.password}</div>
                    )}
                </div>
                <button type="submit">Login</button>
            </form>
</div>
        );
    }
}

export default WebRequireSignIn;