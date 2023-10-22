import React, { Component } from 'react';
import {FiEdit, FiDelete} from 'react-icons/fi';
import Button from '../common/Button';
class WorkOrderCell extends Component {
    render() {
        const { title, subtitle } = this.props.workOrder;

        return (
            <div className="work-order-cell">
                <div className="work-item-cell__details">
                <div className="work-order-cell__title">{title}</div>
                <div className="work-order-cell__subtitle">{subtitle}</div>
                </div>
                <div className="work-order-cell__actions">
                    <Button className="edit" icon={FiEdit}>Edit</Button>
                    <Button className="delete"icon={FiDelete}>Delete</Button>
                </div>
            </div>
        );
    }
}

export default WorkOrderCell;