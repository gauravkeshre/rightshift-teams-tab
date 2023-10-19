import React from 'react';
import logo from '../style/logo.png'
import TeamsUserCard from './TeamsUserCard';

class Navbar extends React.Component {
    render() {
        const user = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            avatar: logo
        };

        return (
            <nav>
                <img src={logo} alt="logo"></img>
                <div className='title'>Right Shift</div>
                <div className='right-button'>
                    <TeamsUserCard loggedInUser={null} onUserCardClick={this.buttonDidClick.bind(this)}></TeamsUserCard>
                </div>
            </nav>
        );
    }

    buttonDidClick = event => {
        this.props.onUserCardClick(event);
    };
}

export default Navbar;
