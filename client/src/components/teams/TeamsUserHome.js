import React, { Component } from 'react';
import AttendanceBarPanel from '../common/AttendanceBarPanel';
import PunchInPanel from '../common/PunchInPanel';
import WorkOrderList from '../common/WorkOrderList';
import TaskBar from '../common/TaskBar';
import Button from '../common/Button';

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
            displayingForm: false,
        };
    }
    render() {
        return (
                (this.state.punchInDate == null) ? this.getInitalView() : this.getPunchedInView()
        );
    }

    // UI Utils
    getPunchedInView() {
        if (this.state.displayingForm) {
            return (
                <Button onAddClick={this.handleFormDismiss.bind(this)} text="DUMMY FORM"/>
            );
        }
        return (
            <div>
                <AttendanceBarPanel punchInDate={this.state.punchInDate} lastActivtyDate={this.state.lastActivtyDate} onBreak={this.handleTaskBarAction.bind(this)} onPunch={this.handlePunchIn.bind(this)}>  </AttendanceBarPanel>
                <TaskBar onClick={this.handleAdd.bind(this)}/>
                <WorkOrderList onAddClick={this.handleAdd.bind(this)}/>
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

    // Forms

    handleFormDisplay() {
        this.setState({displayingForm: true, ...this.state});
    }

    handleFormDismiss() {
        this.setState({displayingForm: false, ...this.state});
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
        this.setState({lastActivtyDate: new Date(), ...this.state});
    }

    handleAdd(event ) {
        this.setState({displayingForm: true, ...this.state});
    }
}

export { TeamsUserHome };
