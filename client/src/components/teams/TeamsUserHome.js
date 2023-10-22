import React, { Component } from 'react';
import AttendanceBarPanel from '../common/AttendanceBarPanel';
import PunchInPanel from '../common/PunchInPanel';

class TeamsUserHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: "NONE",
            user: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                age: 30
            },
            punchInDate: null,
            lastActivtyDate: null,
        };
    }
    render() {
        return (
                (this.state.punchInDate == null) ? this.getInitalView() : this.getPunchedInView()
        );
    }

    // UI Utils
    getPunchedInView() {
        return (
            <div>
                <AttendanceBarPanel punchInDate={this.state.punchInDate} lastActivtyDate={this.state.lastActivtyDate} onBreak={this.handleTaskBarAction.bind(this)} onPunch={this.handlePunchIn.bind(this)}>  </AttendanceBarPanel>
            </div>
        );
    }

    getInitalView() {
        return (
            <div>
                <PunchInPanel onClick={this.handlePunchIn.bind(this)}/>
            </div>

        );
    }

    // Button Actions
    handlePunchIn(event) {
        console.log(event.target.id);
        if (event.target.id === "btn-punch-out") {
            this.setState({punchInDate: null, lastActivtyDate: null});
        }else {
            let date = new Date();
            this.setState({punchInDate: date, lastActivtyDate: date});
        }
    }

    handleTaskBarAction(isBreakOn) {
        this.setState({lastActivtyDate: new Date(), punchInDate: this.state.punchInDate});
    }
}

export { TeamsUserHome };
