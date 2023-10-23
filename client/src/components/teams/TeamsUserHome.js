import React, { Component } from 'react';
// import AttendanceBarPanel from '../common/AttendanceBarPanel';
import PunchInPanel from '../common/PunchInPanel';
import IncidentsListPanel from '../common/IncidentsListPanel';
import TaskBar from '../common/TaskBar';
import TeamsWorkOrderForm from '../teams/TeamsWorkOrderForm';

class TeamsUserHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            punchInDate: null,
            lastActivtyDate: null,
            displayingForm: false
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
                <TeamsWorkOrderForm onClose={this.handleFormDismiss.bind(this)}/>
            );
        }
        return (
            <div>
                {/* <AttendanceBarPanel punchInDate={this.state.punchInDate} lastActivtyDate={this.state.lastActivtyDate} onBreak={this.handleTaskBarAction.bind(this)} onPunch={this.handlePunchIn.bind(this)}>  </AttendanceBarPanel> */}
                <TaskBar onClick={this.handleAdd.bind(this)}/>
                <IncidentsListPanel onAddClick={this.handleAdd.bind(this)}/>
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
        this.setState({...this.state, displayingForm: true});
    }

    handleFormDismiss() {
        this.setState({...this.state, displayingForm: false});
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
        this.setState({...this.state, displayingForm: true});
    }
}

export { TeamsUserHome };
