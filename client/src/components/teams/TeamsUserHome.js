import React, { Component } from 'react';
import TaskBarPanel from '../common/TaskBarPanel';

class TeamsUserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username:"NONE",
            user: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                age: 30
            }
        };

        this.loadData = this.loadData.bind(this);
        // this.loadData();
    }


async loadData() {
    const server = "http://localhost:3978";
    let endpoint = server + "/test"
    let response = await fetch(endpoint, {mode: 'no-cors'});
    // resolve response
    if (response.ok) {
        console.log(JSON.parse(response.data()));
        this.setState({username:JSON.stringify(response.data())});
    }else 
    {
        console.log("Error in fetching data");
        this.setState({username:"ERROR"});
    }
}
    render() {
        let date = new Date('October 22, 2023 11:00:00');
        return (
            <div>
                <h1>You are logged in</h1>
                <TaskBarPanel punchInDate={date} lastActivtyDate={date} onActionButtonClick={this.handleTaskBarAction} >  </TaskBarPanel>
                <code>{this.props.token ? JSON.stringify(this.props.token) : "You should not see this page if you are not logged in."}</code>
                <p>result: {this.state.username}</p>
                <p>error: {this.state.error}</p>
            </div>
        );
    }

    handleTaskBarAction(event) {
        console.log(event);
    }
}

export {TeamsUserHome};
