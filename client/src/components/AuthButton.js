import React from 'react';

export class AuthButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const { isLoggedIn } = this.props;
        let button;

        if (isLoggedIn) {
            button = <button className="logout" onClick={this.handleLogoutClick}>Logout</button>;
        } else {
            button = <button className="login" onClick={this.handleLoginClick}>Login</button>;
        }

        return (
            <div>
                {button}
            </div>
        );
    }
}