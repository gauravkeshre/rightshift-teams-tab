import React from 'react';

class TeamsRequireSignIn extends React.Component {
   
    constructor(props) {
        super(props);
        this.buttonDidClick = this.buttonDidClick.bind(this);
    }

    buttonDidClick(event) {
        if (this.props.onLoginButtonClick != null){
            this.props.onLoginButtonClick(event);
        }
    };

    render() {
        return (
            <div className='login-box'>
                <h1>Sign In</h1>
                <h3>You need to sign in to use this app</h3>
                <button id="login" onClick={this.buttonDidClick.bind(this)}>SSO</button>
            </div>
        );
    }

}
    
export { TeamsRequireSignIn };