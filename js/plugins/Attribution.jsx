/*
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import PropTypes from 'prop-types';
import src from '../../assets/universite_de_sherbrooke_logo.png';
import assign from 'object-assign';
import { Glyphicon } from 'react-bootstrap';

class Attribution extends React.Component {
    static propTypes = {
        src: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        src: src,
        style: {
            position: "absolute",
            width: "124px",
            left: 0,
            bottom: 0
        }
    };


    render() {
        return null;
    }
}


/**
 * Renders the logo of GeoSolutions in the {@link #plugins.NavMenu|NavMenu}
 * @name Attribution
 * @class
 * @memberof plugins
 * @prop {string} [label='GeoSolutions'] the tooltip for the logo
 * @prop {string} [href='https://www.geosolutionsgroup.com/'] the URL to redirect on click
 * @prop {string} [src] URL of the logo image. By default the GeoSolutions logo.
 */


export default {
    AttributionPlugin: assign(Attribution, {
        NavMenu: {
            tool: (props) => ({
                position: 0,
                label: props.label || 'Aide',
                href: <p>aasd</p>,
                img: <Glyphicon style={{fontSize: 30 + "px"}} glyph="question-sign" />,
                logo: true
            })
        }
    })
};