import React, { Component } from 'react';
import DateTimePanel from './DateTimePanel';
import Button from './Button';
import {BsPlusLg} from 'react-icons/bs';

class TaskBar extends Component {
    render() {
        return (
            <div className='card taskbar tasks'>
                <DateTimePanel />
                <Button id="btn-add-report" text="Report" icon={BsPlusLg} onClick={ this.props.onClick}></Button>
                <Button id="btn-add-supplier" text="Supplier" icon={BsPlusLg} onClick={ this.props.onClick}></Button>
                <Button className="edit" text="Order" icon={BsPlusLg}>Edit</Button>
            </div>
        );
    }

    handleButtonClick(event) {
        this.props.onClick(event)
    }
}

export default TaskBar;
