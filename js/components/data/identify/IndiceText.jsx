
import React from 'react';

//import { Row } from 'react-bootstrap';
import { get } from 'lodash';
import Toolbar from '@mapstore/components/misc/toolbar/Toolbar';
import Message from '@mapstore/components/I18N/Message';
import DockablePanel from '@mapstore/components/misc/panels/DockablePanel';
import GeocodeViewer from '@mapstore/components/data/identify/GeocodeViewer';
import ResizableModal from '@mapstore/components/misc/ResizableModal';
import Portal from '@mapstore/components/misc/Portal';
import Coordinate from '@mapstore/components/data/identify/coordinates/Coordinate';
import { responseValidForEdit } from '@mapstore/utils/IdentifyUtils';
import LayerSelector from '@mapstore/components/data/identify/LayerSelector';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import ToolsContainer from '@mapstore/plugins/containers/ToolsContainer';
import BorderLayout from '@mapstore/components/layout/BorderLayout';
import { Col, Grid, Nav, NavItem, Row, Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

class IdentifyIndiceText extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        width: PropTypes.string,
        height: PropTypes.string,
        name: PropTypes.string,
    };

    static defaultProps = {
        name: '',
    }

    render() {
        var chartData = JSON.stringify(this.props.data[0]);
        var parsedChartData;

        if (this.props.data[0] !=  undefined) {
            parsedChartData = JSON.parse(chartData);
            var environnement = parsedChartData["response"]["features"][0]["properties"]["ibe_d1"];
            var social = parsedChartData["response"]["features"][0]["properties"]["ibe_d2"];
            var economique = parsedChartData["response"]["features"][0]["properties"]["ibe_d3"];
        }
        else {
            parsedChartData = "";
            environnement = social = economique = 0;
        }

        return (
            <div style={{padding: '5px', display: 'flex', justifyContent: 'center'}}>
                <h2>Indice de bien-être: {Math.round((environnement+social+economique)/3)}</h2>
            </div>
        );
    }
}

export default IdentifyIndiceText;
