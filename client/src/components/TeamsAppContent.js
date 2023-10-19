import React from 'react';
import * as msteams from '@microsoft/teams-js';

class TeamsAppContent extends React.Component {

    constructor(props) {
        super(props);
        msteams.app.initialize();
        this.state = {
            context: {}
        };
    }
    
    async getContext () {
        let context = await msteams.app.getContext();
        this.setState({ context: context });
    }

    render() {
        return (
            <div className='app-content-web'>
                <h1>The page is inside Teams ✅ {this.state.count}</h1>
                <button id='getContext' onClick={this.getContext.bind(this)}>getContext</button>
                <code>{this.state.context ? JSON.stringify(this.state.context) : "Context not found."}</code>

            </div>
        );
    }
}


export {TeamsAppContent};