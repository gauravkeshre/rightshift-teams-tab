import React from 'react';

class WebAppContent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { count : 1 };
    }

    handleCountClick() {
        this.setState({
            count : this.state.count + 1
        });
    }

    render() {
        return (
            <div className='app-content-web'>
                <h1>The page is not inside Teams</h1>
                <h2>Count: {this.state.count}</h2>  
                <button id='countclick' onClick={this.handleCountClick.bind(this)}>Count</button>
            </div>
        );
    }
}


export {WebAppContent};