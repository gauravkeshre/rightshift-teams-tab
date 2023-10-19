import React from 'react';
import * as msteams from '@microsoft/teams-js';
import {TeamsRequireSignIn} from './TeamsRequireSignIn';
import {TeamsUserHome} from './TeamsUserHome';

class TeamsAppContent extends React.Component {

    constructor(props) {
        super(props);
        msteams.app.initialize();
        this.state = {
            context: {},
            token:null
        };
    }
    
    async getContext () {
        let context = await msteams.app.getContext();
        this.setState({ context: context });
    }

    render() {
        const isUserLoggedIn = this.state.token !== null ;
        let component;
        if (!isUserLoggedIn) {
            component = this.getSingedInComponent();
        }else {
            component = this.getMainContent();
        }
        return (
            <div>
                {component}
            </div>
        )
    }

    async handleLoginButtonClick(event) {
        let token  = await msteams.authentication.getAuthToken();
        console.log(JSON.stringify(token));
        this.setState({ token: JSON.stringify(token) });

    }

    getSingedInComponent() {
        return(
        <TeamsRequireSignIn onLoginButtonClick={this.handleLoginButtonClick.bind(this)}></TeamsRequireSignIn>
        );
    }

    getMainContent() {
        return (
            <TeamsUserHome token={this.state.token}> </TeamsUserHome>
        );
    }
}


export {TeamsAppContent};