import React from 'react';

class TeamsUserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: props.loggedInUser
        };
    }

    buttonDidClick = event => {
        this.props.onUserCardClick(event);
    };

    render() {
        let user  = this.state.loggedInUser;
        if (user != null)  {
            return (
                <div id="logout" className='user-card' onClick={this.buttonDidClick.bind(this)}>
                    <img className='user-avatar' src={user.avatar} alt="logged in user"></img>
                    <div className='user-name'>{user.name}</div>
                </div>
            )
        } else {
            let button = <button id="login" className="login" onClick={this.buttonDidClick.bind(this)}>Login</button>;
            return (
                <div>
                    {button}
                </div>
            );
        }
   }
}

export default TeamsUserCard;