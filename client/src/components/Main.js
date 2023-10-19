import React from 'react';
import Navbar from './Navbar';
import {WebAppContent} from './WebAppContent';
import {TeamsAppContent} from './TeamsAppContent';

import * as msteams from '@microsoft/teams-js';

class Main extends React.Component {
    render() { 
      
        const isInsideTeams = this.inTeams();
        let component;
        if (isInsideTeams) {
            component = this.getTeamsComponent();
        } else {
            component = this.getWebComponent();
        }
        
        return (
            <div>
            <Navbar onUserCardClick= {this.handleUserCardClick}></Navbar>
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
                    <WebAppContent></WebAppContent>
                    );
                }
                
                handleUserCardClick (event) {
                    if (event.target.id === 'logout') {
                        
                    } else {
                        msteams.authentication.getAuthToken({
                            successCallback: (token) => {
                                console.log(token);
                            },
                            failureCallback: (error) => {
                                console.log(error);
                            }
                        });
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
