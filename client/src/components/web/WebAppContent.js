import React from 'react';
import WebRequireSignIn from './WebRequireSignIn';
import WebUserHome from './WebUserHome';

class WebAppContent extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.state = {
            count: 0
        };
    }

    handleLoginClick() {
        this.setState({
            count : this.state.count + 1
        });
    }
getContentPanel() {
    return (
      <div>
        <WebUserHome>  </WebUserHome>
      </div>  
    );
}
getLoginPanel() {
 return (
    <div className='app-content-web'> 
    <WebRequireSignIn onLoginSuccess= {this.handleLoginClick}></WebRequireSignIn>
</div>
 );
}

    render() {
        let component;
        if (this.state.count === 0) {
            component = this.getLoginPanel();
        } else {
            component = this.getContentPanel();
        }
       
        return (
            <div>
                {component}
            </div>
        )
    }
}

export {WebAppContent};