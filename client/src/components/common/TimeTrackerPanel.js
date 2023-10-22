import React, { Component } from 'react';

class TimeTrackerPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsedTime: 0
        };
    }

    //LifeCycle methods
    componentDidMount() {
        this.calculateAndRenderElapsedTime();
        this.interval = setInterval(() => {
            this.calculateAndRenderElapsedTime();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { elapsedTime } = this.state;
        const seconds = Math.floor(elapsedTime / 1000) % 60;
        const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
        const hours = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;

        return (
            <div className='card time-tracker'>
                <p>{this.props.title}</p>
                <h4>{`${hours}:${minutes}:${seconds}`}</h4>
            </div>
        );
    }

      //Utility function to calculate and render elapsed time
      calculateAndRenderElapsedTime() {
        const elapsedTime = Date.now() - this.props.startDate.getTime();
        this.setState({ elapsedTime });
    }
}

export default TimeTrackerPanel;
