import React, { Component } from 'react';
import DateTimePanel from './DateTimePanel';
import Button from './Button';
import {BsFillFileEarmarkPlusFill} from 'react-icons/bs';

class TaskBar extends Component {
    render() {
        return (
            <div className='card taskbar tasks'>
                <DateTimePanel />
                <Button className="card round-button" id="btn-add-report" icon={BsFillFileEarmarkPlusFill} onClick={this.handleButtonClick.bind(this)}></Button>
            </div>
        );
    }

    handleButtonClick(event) {

    }
}

export default TaskBar;
