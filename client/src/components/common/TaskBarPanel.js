import React, { Component } from 'react';
import TimeTrackerPanel from './TimeTrackerPanel';
import iconPlay from '../../resources/icon-play.svg';
import iconPause from '../../resources/icon-pause.svg';
import Button from './Button';
import { BsPlayFill, BsFillPauseFill, BsFillGrid3X2GapFill } from 'react-icons/bs';
// Public enum representing the taskbar action
export const TaskbarAction = {
    PUNCH_IN: "PUNCH_IN",
    PUNCH_OUT: "PUNCH_OUT",
    START_BREAK: "START_BREAK",
    END_BREAK: "END_BREAK"
};

class TaskBarPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBreakOn: false
        };
    }
    render() {
        return (
            <div className='taskbar'>
                <TimeTrackerPanel title="Since" startDate={this.props.punchInDate} />
                <TimeTrackerPanel title="Total" startDate={this.props.lastActivtyDate} />
                <Button className="card" id="btn-pause" icon={this.state.isBreakOn ? BsPlayFill : BsFillPauseFill} onClick={this.handleButtonClick.bind(this)}></Button>
                <Button className="card" id="btn-more" text="More" onClick={this.handleButtonClick.bind(this)}>more</Button>
            </div>
        );
    }

    //Button
    handleButtonClick(event) {
        if (event.target.id === "btn-pause") {
            this.setState({ isBreakOn: !this.state.isBreakOn });
        }

        this.props.onActionButtonClick(event.target.id);
    }
}

export default TaskBarPanel;