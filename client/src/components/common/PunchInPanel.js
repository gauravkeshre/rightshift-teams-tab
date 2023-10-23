import React, { Component } from 'react';
import DateTimePanel from './DateTimePanel';
import Button from './Button';
import {BiSolidLogInCircle} from 'react-icons/bi';

class PunchInPanel extends Component {
    render() {
        return (
            <div className='card taskbar punchinpanel'>
                <DateTimePanel showTime={true}  showAsCard={true} />
                <Button className="card taskbar" id="btn-punch-in" text="Punch In" icon={BiSolidLogInCircle} onClick={this.handleButtonClick.bind(this)}></Button>
            </div>
        );
    }

    handleButtonClick(event) {
        this.props.onClick(event)
    }
}

export default PunchInPanel;
