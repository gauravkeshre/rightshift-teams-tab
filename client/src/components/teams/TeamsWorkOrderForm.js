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
                Priority: '',
            },
            isTeams: false,
            teamsContext: null
        };
    }

    async checkIfTeams() {
        let isInsideTeams = await inTeams();
        this.setState({ ...this.state, isTeams: isInsideTeams});
    }

    async componentWillMount() {
        await this.checkIfTeams();
        microsoftTeams.getContext((context, error) => {
            this.setState({...this.state, teamsContext: context });
        });
    }

    submitForm(event) {
        event.preventDefault();

        // Basic validation checks
        let errors = {};

        if (Object.keys(errors).length === 0) {
            this.incidentRepository.enqueueForSync(this.state.incident);
            this.props.onClose();
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
        this.setState({ incident: {...this.state.incident, title: event.target.value}, ...this.state});
    }
    handleDescriptionChange(event) {
        this.setState({ incident: {...this.state.incident, description: event.target.value}, ...this.state });
    }
    handleStatusChange(event) {
        this.setState({ incident: {...this.state.incident, status: event.target.value}, ...this.state });
    }
    handlePriorityChange(event) {
        this.setState({ incident: {...this.state.incident, priority: event.target.value}, ...this.state });
    }
    handleAttachmentChange(event) {
        if (event.target.file && event.target.files[0]) {
            this.convertFileToBase64(event.target.files[0]).then(base64 => {
                this.setState({ incident: {...this.state.incident, attachments: base64}, ...this.state });
            });
        }
    }

    handleTeamsAttachmentChange() {
        let mediaInput = {
            mediaType: microsoftTeams.media.MediaType.Image,
            maxMediaCount: 1,
            imageProps: {
                sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
                startMode: microsoftTeams.media.CameraStartMode.Photo,
                ink: false,
                cameraSwitcher: false,
                textSticker: false,
                enableFilter: true,
            }
        };


        microsoftTeams.media.selectMedia(mediaInput, (error, attachments) => {
            if (error) {
                console.log(error);
            } else {
                this.convertFileToBase64(attachments[0]).then(base64 => {
                    this.setState({ incident: {...this.state.incident, attachments: base64}, ...this.state });
                });
            }
        });
    }

//    async handleTeamsAttachmentChange() {
//         let image = await microsoftTeams.media.captureImage().
//         this.setState({ ...this.state, isTeams: isInsideTeams});
//     }

//         microsoftTeams.captureImage((error, files) => {
//             if (error) {
//                 console.log(error);
//             } else {
//                 this.convertFileToBase64(files[0]).then(base64 => {
//                     this.setState({ incident: {...this.state.incident, attachments: base64}, ...this.state });
//                 });
//             }
//         });
//     }

    render() {
        return (
            <div className="card form-wrapper">
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
                    {
                        this.getAttachment()
                    }
                    <br />
                    <Button className="cancel" text="Close" onClick={this.props.onClose} />
                    <Button className="submit" text="Submit" onClick={this.submitForm.bind(this)} />
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