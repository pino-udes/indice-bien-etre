
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
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

class IdentifyCharts extends React.Component {
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
        console.log(chartData);
        var parsedChartData;

        if (this.props.data[0] !=  undefined) {
            parsedChartData = JSON.parse(chartData);
            var environnement = parsedChartData["response"]["features"][0]["properties"]["ibe_d1"];
            var social = parsedChartData["response"]["features"][0]["properties"]["ibe_d2"];
            var economique = parsedChartData["response"]["features"][0]["properties"]["ibe_d3"];
        }
        else {
            parsedChartData = "";
        }

        const parsedRadarChartData = [
            {            subject: 'Social',            A: JSON.stringify(environnement),              fullMark: 100,        },
            {            subject: 'Environnement',            A: JSON.stringify(social),                     fullMark: 100,        },
            {            subject: 'Économique',            A: JSON.stringify(economique),                  fullMark: 100,        },
        ];

        const style = {width: "100%", height: "100%", zIndex: 10000};
        var test = "AWE"


        return (
            <>
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart  cy="50%" outerRadius="75%"
                                data={parsedRadarChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <PolarGrid gridType="circle"/>
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar  name="indice-bien-etre"  dataKey="A" stroke="#1e44ae" fill="#2959da" fillOpacity={0.4} strokeOpacity={0.5} />
                    </RadarChart>
                </ResponsiveContainer>

            </>
        );
    }
}

export default IdentifyCharts;
