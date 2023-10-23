import React, { Component } from 'react';
import AttendanceBarPanel from '../common/AttendanceBarPanel';
import PunchInPanel from '../common/PunchInPanel';
import WorkOrderList from '../common/WorkOrderList';
import TaskBar from   '../common/TaskBar';
import Button from '../common/Button';  
import TeamsWorkOrderForm from '../teams/TeamsWorkOrderForm';

class WebUserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
               <div>
                 <Button className="card" onClick={this.handleFormDismiss.bind(this)} text="DUMMY FORM"/>
                <TeamsWorkOrderForm onClose={this.handleFormDismiss.bind(this)}/>
                </div>
            );
        }

        let date = new Date('October 22, 2023 11:00:00');
        return (
            <div>
                <AttendanceBarPanel punchInDate={date} lastActivtyDate={this.state.lastActivtyDate} onBreak={this.handleTaskBarAction.bind(this)} onPunch={this.handlePunchIn.bind(this)} >  </AttendanceBarPanel>
                <TaskBar  onClick={this.handleAdd.bind(this)} />
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
        this.setState({displayingForm: false});
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

    handleAdd(event) {
        this.setState({ displayingForm: true });
    }

}

export default WebUserHome;
