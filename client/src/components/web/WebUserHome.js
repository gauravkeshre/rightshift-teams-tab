import React, { Component } from 'react';
import TaskBarPanel from '../common/TaskBarPanel';


class WebUserHome extends Component {
    render() {
        let date = new Date('October 22, 2023 11:00:00');
        return (
            <div>
                    <TaskBarPanel punchInDate={date} lastActivtyDate={date} onActionButtonClick={this.handleTaskBarAction} >  </TaskBarPanel>
            </div>
        );
    }

    handleTaskBarAction(event) {
        console.log(event);
    }

}

export default WebUserHome;
