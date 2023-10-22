import React, { Component } from 'react';
import EmptyView from './EmptyView';
import { mockWorkOrders } from '../../services/WorkOrderService';
import WorkOrderCell from './WorkOrderCell';
class WorkOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workOrders: mockWorkOrders,
        };
    }

    handleEdit = (id) => {
        // handle edit button click
    };

    handleDelete = (id) => {
        // handle delete button click
    };

    render() {
        const { workOrders } = this.state;
        
        if (workOrders && workOrders.length === 0) {
            return (<EmptyView buttonText="Add +" onClick={this.props.onAddClick}/>);
        }

        const listItems = workOrders.map((workOrder) => (
            <WorkOrderCell workOrder={workOrder} key={workOrder.id} />
        ));

        return (
            <div>
                {listItems}
            </div>
        );
    }
}

export default WorkOrderList;
