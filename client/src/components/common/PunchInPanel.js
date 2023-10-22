import React, { Component } from 'react';
import DatePanel from './DatePanel';
import Button from './Button';
import {BiSolidLogInCircle} from 'react-icons/bi';

class PunchInPanel extends Component {
    render() {
        return (
            <div className='card taskbar punchinpanel'>
                <DatePanel />
                <Button className="card" id="btn-punch-in" icon={BiSolidLogInCircle} onClick={this.handleButtonClick.bind(this)}></Button>
            </div>
        );
    }

    handleButtonClick(event) {
        this.props.onClick(event)
    }
}

export default PunchInPanel;
