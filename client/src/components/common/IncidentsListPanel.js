import React, { Component } from 'react';
import EmptyView from './EmptyView';
// import { mockWorkOrders } from '../../services/WorkOrderService';
import IncidentCell from './IncidentCell';

import IncidentRepository from '../../storage/IncidentRepository';


class IncidentsListPanel extends Component {
    constructor(props) {
        super(props);
        this.incidentRepository = new IncidentRepository();
        this.state = {
            incidents: [],
        };
        this.loadData.bind(this);
    }
    
    componentDidMount() {
        this.loadData();
    }

    handleEdit = (id) => {
        // handle edit button click
    };

    handleDelete = (id) => {
        // this.incidentRepository.deleteRecord(id);
        // this.loadData();
    };

    async loadData() {
        let records = await this.incidentRepository.getRecords();
        this.setState({incidents: records});
    }

    render() {
        const { incidents } = this.state.incidents;
        
        if (incidents == null || incidents.length === 0) {
            return (<EmptyView buttonText="Add +" onClick={this.props.onAddClick}/>);
        }

        const listItems = incidents.map((incident) => (
            <IncidentCell incident={incident} key={incident.id} onEdit={this.handleEdit.bind(this)} onDelete={this.handleDelete.bind(this)}/>
        ));

        return (
            <div>
                <br/>
                <label>Work Orders</label>
                <br/>
                {listItems}
            </div>
        );
    }
}

export default IncidentsListPanel;
