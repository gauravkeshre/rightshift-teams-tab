import React from 'react';
import logo from '../style/logo.png'
import TeamsUserCard from './TeamsUserCard';

class Navbar extends React.Component {
    render() {
        return (
            <nav>
            <img src={logo} alt="logo"></img>
            <div className='title'>Right Shift</div>
            {this.getLoginButton()}
            </nav>
            );
        }
        
        getLoginButton() {
            if (this.props.onUserCardClick != null) {
                return (
                    <div className='right-button'>
                    <TeamsUserCard loggedInUser={null} onUserCardClick={this.buttonDidClick}></TeamsUserCard>
                    </div>
                    );
            }else {
                return (
                    <div/>
                    );
                }
            }
                
        buttonDidClick = event => {
            this.props.onUserCardClick(event);
        };
    }
            
export default Navbar;
