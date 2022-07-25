import React from 'react';
import PropTypes from 'prop-types';


class RadarChartsDimensionsLabel extends React.Component {
    static PropTypes = {
        text: PropTypes.string,
    };

    static defaultProps = {
        text: ''
    }

    render() {

        return (
            <>
                <p>{this.props.text}</p>
            </>
        );
    }
}

export default RadarChartsDimensionsLabel;
