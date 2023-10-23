import React from 'react';

class DateTimePanel extends React.Component {
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
        const options = { weekday: 'long'};
        const formattedDate = this.state.date.toLocaleDateString(undefined, options);

        const options2 = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate2 = this.state.date.toLocaleDateString(undefined, options2);
        

        const formattedTime = this.state.date.toLocaleTimeString();
        return (
            <div className={this.getDivClassName()}>
                <div className="day">{formattedDate}</div>
                <div className="date">{formattedDate2}</div>
                {this.props.showTime ? <div className="time">{formattedTime}</div> : null}
            </div>
        );
    }

    getDivClassName() {
        if (this.props.showAsCard) {
            return "card datepanel";
        } else {
            return "datepanel";
        }
    }
}

export default DateTimePanel;
