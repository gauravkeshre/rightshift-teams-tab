import React, { Component } from 'react';
import {FiEdit, FiDelete} from 'react-icons/fi';
import Button from './Button';
class IncidentCell extends Component {
    render() {
        const { title, description, id } = this.props.incident;

        return (
            <div className="work-order-cell">
                <div className="work-item-cell__details">
                <div className="work-order-cell__title">{title}</div>
                <div className="work-order-cell__subtitle">{description}</div>
                </div>
                <div className="work-order-cell__actions">
                    {/* <Button className="edit" icon={FiEdit} onClick={this.props.onEdit(id)}>Edit</Button> */}
                    {/* <Button className="delete"icon={FiDelete} onClick={this.props.onDeleteRecord(id)}>Delete</Button> */}
                </div>
            </div>
        );
    }
}

export default IncidentCell;