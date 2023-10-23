import React from 'react';
import Button from './Button';
import {IconContext} from 'react-icons';
import {MdDataArray} from 'react-icons/md';

class EmptyView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'No Data',
            subtitle: 'There is nothing to show here.',
            icon: MdDataArray,
            buttonIcon: null,
            buttonText: null,

        };
    }   

    getButtonView() {
        if (this.props.buttonIcon || this.props.buttonText) {
            return (<Button className="card" icon={this.props.buttonIcon} text={this.props.buttonText} onClick={this.props.onClick}/>);
        }else {
            return null;
        }
    }
    render() {
        let { title, subtitle, icon, buttonIcon, buttonText } = this.props;
        
        if (title == null) title = this.state.title;
        if (subtitle == null) subtitle = this.state.subtitle;
        if (icon == null) icon = this.state.icon;
        if (buttonIcon == null) buttonIcon = this.state.buttonIcon;
        if (buttonText == null) buttonText = this.state.buttonText;
        
        return (

            <div className='empty-view'>
                 {icon && (
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                        {React.createElement(icon)}
                    </IconContext.Provider>
                )}
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                   {this.getButtonView()}
                </div>
        );

    }
}

export default EmptyView;
