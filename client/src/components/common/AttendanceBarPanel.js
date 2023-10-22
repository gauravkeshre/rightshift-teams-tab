import React, { Component } from 'react';
import TimeTrackerPanel from './TimeTrackerPanel';
import Button from './Button';
import { BsPlayFill, BsFillPauseFill } from 'react-icons/bs';
import {BiSolidLogOutCircle} from 'react-icons/bi';

// Public enum representing the taskbar action
export const TaskbarAction = {
    PUNCH_IN: "PUNCH_IN",
    PUNCH_OUT: "PUNCH_OUT",
    START_BREAK: "START_BREAK",
    END_BREAK: "END_BREAK"
};

class AttendanceBarPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBreakOn: false
        };
    }
    render() {
        return (
            <div className='taskbar attendancepanel'>
                <h3>{this.state.isBreakOn? "On Break" : "Active"}</h3>
                <TimeTrackerPanel title={this.state.isBreakOn ? "Paused Since" : "Active Since"} startDate={this.props.lastActivtyDate} />
                <TimeTrackerPanel title="Total" startDate={this.props.punchInDate} />
                <Button className={this.getButtonClass()} id="btn-pause" icon={this.state.isBreakOn ? BsPlayFill : BsFillPauseFill} onClick={this.handleButtonClick.bind(this)}></Button>
                <Button className="card" id="btn-punch-out" icon={BiSolidLogOutCircle} onClick={this.handleButtonClick.bind(this)}></Button>
            </div>
        );
    }

    //Utilities
    getButtonClass() {
        return this.state.isBreakOn ? "card paused" : "card active";
    }

    //Button
    handleButtonClick(event) {
       if(event.target.id === "btn-punch-out") {  
        this.props.onPunch(event);
       } else if (event.target.id === "btn-pause") {
        this.setState({ isBreakOn: !this.state.isBreakOn });
        this.props.onBreak(this.state.isBreakOn);
       }
    }
}

export default AttendanceBarPanel;