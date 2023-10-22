import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

class Button extends React.Component {
    render() {
        const { icon, text, ...rest } = this.props;

        return (
            <button {...rest}>
                {icon && (
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                        {React.createElement(icon)}
                    </IconContext.Provider>
                )}
                &nbsp;
                {text}
            </button>
        );
    }
}

Button.propTypes = {
    icon: PropTypes.elementType,
    text: PropTypes.string.isRequired
};

export default Button;
