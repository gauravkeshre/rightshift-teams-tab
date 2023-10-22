import React from 'react';
import logo from '../../resources/logo.png'
import TeamsUserCard from '../teams/TeamsUserCard';

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
                    <TeamsUserCard loggedInUser={this.props.loggedInUser} onUserCardClick={this.buttonDidClick}></TeamsUserCard>
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
