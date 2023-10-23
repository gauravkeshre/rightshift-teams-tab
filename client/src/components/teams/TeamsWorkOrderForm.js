import '../../style/Form.css';
import React, { Component } from 'react';
import Button from '../common/Button';
import * as microsoftTeams from "@microsoft/teams-js";
import { inTeams } from '../../Utility/TeamsUtils';
import IncidentRepository from '../../storage/IncidentRepository';
import { v4 as uuid } from "uuid";

class TeamsWorkOrderForm extends Component {

    constructor(props) {
        super(props);

        microsoftTeams.initialize();
        this.incidentRepository = new IncidentRepository();
        this.state = {
            incident: {
                key: uuid(),
                title: '',
                description: '',
                status: '',
                attachments: '',
                priority: ''
            },
            isTeams: false,
            errors: []
        };

        this.validateFields = this.validateFields.bind(this);
    }

    async checkIfTeams() {
        try {
        let isInsideTeams = await inTeams();
        this.setState({ ...this.state, isTeams: isInsideTeams});
        }catch(e) {
            alert(e);
        }
    }

    async componentWillMount() {
        await this.checkIfTeams();
        // microsoftTeams.getContext((context, error) => {
        //     this.setState({...this.state, teamsContext: context });
        // });
    }

    submitForm(event) {
        event.preventDefault();

        // Basic validation checks
        let errors = this.validateFields();

        if (Object.keys(errors).length === 0) {
            this.incidentRepository.enqueueForSync(this.state.incident);
            this.props.onClose();
        } else {
            // Update the state with the errors
            this.setState({ ...this.state, errors: errors });

        }
    }

    validateFields() {
        let errors = [];
        if (this.state.incident.title === '') {
            errors.push('Title is required');
        }
        if (this.state.incident.description === '') {
            errors.push('Description is required');
        }
        if (this.state.incident.status === '') {
            errors.push('Status is required');
        }
        if (this.state.incident.priority === '') {
            errors.push('Priority is required');
        }
        return errors;
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
        this.setState({
            ...this.state,
            incident: {
                ...this.state.incident,
                title: event.target.value
            }
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            ...this.state,
            incident: {
                ...this.state.incident,
                description: event.target.value
            }
        });
    }
    handleStatusChange(event) {
        this.setState({
            ...this.state,
            incident: {
                ...this.state.incident,
                status: event.target.value
            }
        });
    }
    handlePriorityChange(event) {
        this.setState({
            ...this.state,
            incident: {
                ...this.state.incident,
                priority: event.target.value
            }
        });
    }
    harndleAttachmentChange(event) {
        if (event.target.file && event.target.files[0]) {
            this.convertFileToBase64(event.target.files[0]).then(base64 => {
                this.setState({
                    ...this.state,
                    incident: {
                        ...this.state.incident,
                        attachments: base64
                    }
                });
            });
        }
    }

    handleTeamsAttachmentChange(event) {
        let imageProp = {
            sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
            startMode: microsoftTeams.media.CameraStartMode.Photo,
            ink: false,
            cameraSwitcher: false,
            textSticker: false,
            enableFilter: true,
        };
        let mediaInput = {
            mediaType: microsoftTeams.media.MediaType.Image,
            maxMediaCount: 10,
            imageProps: imageProp
        };
        microsoftTeams.media.selectMedia(mediaInput, (error, attachments) => {
            // If there's any error, an alert shows the error message/code
            if (error) {
                if (error.message) {
                    alert(" ErrorCode: " + error.errorCode + error.message);
                } else {
                    alert(" ErrorCode: " + error.errorCode);
                }
            } else if (attachments) {
                // creating image array which contains image string for all attached images. 
                const imageArray = attachments.map((item, index) => {
                    return ("data:" + item.mimeType + ";base64," + item.preview)
                })
            }
        });
    //     try {

    //         microsoftTeams.media.selectMedia((error, files) => {
    //         // If there's any error, an alert shows the error message/code
    //         if (error) {
    //             if (error.message) {
    //                 alert(" ErrorCodeAndMessage: " + error.errorCode + error.message);
    //             } else {
    //                 alert(" ErrorCode: " + error.errorCode);
    //             }
    //         } else if (files) {
    //             let imgItem = files[0].content;
    //             var src = "data:" + imgItem.mimeType + ";base64," + imgItem.preview;
    //             this.setState({
    //                 ...this.state,
    //                 incident: {
    //                     ...this.state.incident,
    //                     attachments: src
    //                 }
    //             });
    //         }
    //     }); }
    //     catch(e) {
    //         alert(e);
    //     }
        
    }

    handleAttachmentChange() {
        
    }

    render() {
        return (
            <div className="card form-wrapper">
                <div className="error-header">
                    <ul>
                    {this.state.errors.map(error => (
                            <li>{error}</li>
                    ))}
                    </ul>
                </div>
                <form>
                    <label>
                        Title:
                        <input id="title" type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input id="desc" type="text" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        Status:
                        <input id="status" type="text" value={this.state.status} onChange={this.handleStatusChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        Priority:
                        <input id="pri" type="text" value={this.state.priority} onChange={this.handlePriorityChange.bind(this)} />
                    </label>
                    <br />
                        {this.getAttachment()}
                    <br />
                    <br />
                    <br />
                    <hr />

                    <div className='form-button-wrapper'>
                    <Button text="Close" onClick={this.props.onClose} />
                    <Button className="submit" text="Submit" onClick={this.submitForm.bind(this)} />
                    </div>
                </form>
            </div>
        );
    }

    getAttachment() {
        if (this.state.isTeams) {
            return (
                <label>
                    Team Attachment:
                    <button id="attachment" onClick={this.handleTeamsAttachmentChange.bind(this)}>Upload</button>
                </label>
            );
        } else {
            return (
                <label>
                    Web Attachment:
                    <input id="att" type="file" className="imagePicker" name="myImage" accept="image/png, image/gif, image/jpeg" onChange={this.handleAttachmentChange.bind(this)} />
                </label>
            );
        }
    }
}

export default TeamsWorkOrderForm;