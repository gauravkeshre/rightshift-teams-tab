import React from 'react';

class DatePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = this.state.date.toLocaleDateString(undefined, options);
        const formattedTime = this.state.date.toLocaleTimeString();
        return (
            <div className='date-panel'>
                <h3>{formattedDate}</h3>
                <h1>{formattedTime}</h1>
            </div>
        );
    }
}

export default DatePanel;
