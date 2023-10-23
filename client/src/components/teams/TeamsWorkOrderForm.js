import '../../style/Form.css';
import React, { Component } from 'react';
import Button from '../common/Button';

class TeamsWorkOrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            status: '',
            attachments: '',
            Priority: '',
        };
    }

    submitForm(event) {
        event.preventDefault();

        // Basic validation checks
        let errors = {};

        if (Object.keys(errors).length === 0) {
            // Submit the form
            console.log('Submitting form:', this.state);
            this.props.onClose(); // Call the callback function passed as a prop
        } else {
            // Update the state with the errors
            this.setState({ errors });
        }
    }

    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    
    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    handleStatusChange(event) {
        this.setState({ status: event.target.value });
    }
    handlePriorityChange(event) {
        this.setState({ priority: event.target.value });
    }
    handleAttachmentChange(event) {
        if (event.target.file && event.target.files[0]) {
            this.convertFileToBase64(event.target.files[0]).then(base64 => {
              this.setState({attachments: base64, ...this.state});
            });
        }
    }

    render() {
        return (
            <div className="card form-wrapper">
                <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input id="title" type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
                    
                </label>
                <br />
                <label>
                    Description:
                    <input id="desc" type="text"  value={this.state.description}  onChange={this.handleDescriptionChange.bind(this)}/>
                </label>
                <br />
                <label>
                    Status:
                    <input id="status" type="text" value={this.state.status} onChange={this.handleStatusChange.bind(this)}/>
                </label>
                <br />
                <label>
                    Priority:
                    <input id="pri" type="text" value={this.state.priority}  onChange={this.handlePriorityChange.bind(this)}/>
                </label>
                <br />
                <label>
                    Attachments:
                    <input id="att" type="file" className="imagePicker" name="myImage" accept="image/png, image/gif, image/jpeg" onChange={this.handleAttachmentChange.bind(this)}/>
                </label>
                <br />
                <Button text="Close" onClick={this.props.onClose}/>
                <Button text="Submit" onClick={this.submitForm.bind(this)}/>
            </form>
            </div>
        );
    }
}

export default TeamsWorkOrderForm;