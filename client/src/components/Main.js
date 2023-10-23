import React from 'react';
import Navbar from './web/Navbar';
import { WebAppContent } from './web/WebAppContent';
import { TeamsAppContent } from './teams/TeamsAppContent';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleWebLogin = this.handleWebLogin.bind(this);
        
        this.state = {
            user: {
                name: null,
                email: null
            }
        }
    }

    render() {
        const isInsideTeams = this.props.inTeams;
        let component;

        if (isInsideTeams) {
            component = this.getTeamsComponent();
        } else {
            component = this.getWebComponent();
        }

        return (
            <div className="main-body">
                {component}
            </div>
        )
    }

    getTeamsComponent() {
        return (
            <TeamsAppContent> </TeamsAppContent>
        );
    }
    getWebComponent() {
        return (
            <div>
                <Navbar></Navbar>
                <WebAppContent loggedInUser={this.state.user}></WebAppContent>
            </div>
        );
    }

    handleWebLogin(event) {
        if (event.target.id === 'logout') {
            this.setState({ user: null });
        } else {
            this.setState({ user: { name: 'John Doe', email: 'johndoe@react.com' }});
        }
    }

    inTeams() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
}

export default Main;
