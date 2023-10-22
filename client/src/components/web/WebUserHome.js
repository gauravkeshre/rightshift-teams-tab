import React, { Component } from 'react';
import AttendanceBarPanel from '../common/AttendanceBarPanel';
import PunchInPanel from '../common/PunchInPanel';
import TaskBar from   '../common/TaskBar';

class WebUserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        let date = new Date('October 22, 2023 11:00:00');
        return (
            <div>
                <TaskBar />
              <AttendanceBarPanel punchInDate={date} lastActivtyDate={this.state.lastActivtyDate} onBreak={this.handleTaskBarAction.bind(this)} onPunch={this.handlePunchIn.bind(this)} >  </AttendanceBarPanel>
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
        this.setState({lastActivtyDate: new Date()});
    }

}

export default WebUserHome;
