import React, { Component } from 'react';
import DatePanel from './DatePanel';
import Button from './Button';
import {BsFillFileEarmarkPlusFill} from 'react-icons/bs';

class TaskBar extends Component {
    render() {
        return (
            <div className='card taskbar'>
                <DatePanel />
                <Button className="card" icon={BsFillFileEarmarkPlusFill} onClick={this.handleButtonClick.bind(this)}></Button>
            </div>
        );
    }

    handleButtonClick(event) {

    }
}

export default TaskBar;
