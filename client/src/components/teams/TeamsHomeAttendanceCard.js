import React, { Component } from 'react';

class TeamsHomeAttendanceCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsedTime: 0
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const elapsedTime = Date.now() - this.props.startDate.getTime();
            this.setState({ elapsedTime });
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
        const days = Math.floor(elapsedTime / 1000 / 60 / 60 / 24);

        return (
            <div>
                <h4>Title</h4>
                <h1>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</h1>
            </div>
        );
    }
}

export default TeamsHomeAttendanceCard;
