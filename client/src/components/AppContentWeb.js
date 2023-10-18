import React from 'react';
// import * as msteams from '@microsoft/teams-js';
import { app } from '@microsoft/teams-js';

export class AppContentWeb extends React.Component {
 

    render() {
        return (
            <div className='app-content-web'>
                <h1>The page is not inside Teams</h1>
                
            </div>
        );
    }
}

export class AppContentTeams extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            context: null
        };
    }
    
    getContext () {
        app.initialize().then(() => {
            app.getContext((context) => {
                console.log("================= context ================");
                console.log(context);
                this.setState({ context: context });
            });
        });
    }

    render() {
        return (
            <div className='app-content-web'>
                <h1>The page is inside Teams ✅</h1>
                <button id='getContext' onClick={this.getContext}>getContext</button>
                <p>{this.state.context ? this.state.context : "Context not found."}</p>

            </div>
        );
    }
}
