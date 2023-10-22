import React from 'react';
import Button from '../common/Button';
import {BsMicrosoft} from 'react-icons/bs';
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
                <h2>Sign In</h2>
                <h3>You need to sign in to use this app</h3>
                <br/><br/><br/>
                <Button id="login" text={"SSO"} icon={BsMicrosoft} onClick={this.buttonDidClick.bind(this)}></Button>
            </div>
        );
    }

}
    
export { TeamsRequireSignIn };