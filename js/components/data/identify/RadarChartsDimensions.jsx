
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

import { RadialBarChart, RadialBar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Glyphicon, Legend } from 'recharts';
import ToolsContainer from '@mapstore/plugins/containers/ToolsContainer';
import BorderLayout from '@mapstore/components/layout/BorderLayout';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Accordion from '@mapstore/components/misc/panels/Accordion';
import './style/topchart.css';


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

    state = { activePanel: "panel-002" };

    render() {
        var chartData = JSON.stringify(this.props.data[0]);
        //console.log(chartData);
        var parsedChartData;

        if (this.props.data[0] !=  undefined) {
            parsedChartData = JSON.parse(chartData);
            var environnement = parsedChartData["response"]["features"][0]["properties"]["ibe_d1"];
            var environnement_c1 = parsedChartData["response"]["features"][0]["properties"]["ibe_d1_c1"];
            var environnement_c2 = parsedChartData["response"]["features"][0]["properties"]["ibe_d1_c2"];
            var environnement_c3 = parsedChartData["response"]["features"][0]["properties"]["ibe_d1_c3"];
            var environnement_c4 = parsedChartData["response"]["features"][0]["properties"]["ibe_d1_c4"];
            var environnement_c5 = parsedChartData["response"]["features"][0]["properties"]["ibe_d1_c5"];
            var environnement_c6 = parsedChartData["response"]["features"][0]["properties"]["ibe_d1_c6"];
            var environnement_c7 = parsedChartData["response"]["features"][0]["properties"]["ibe_d1_c7"];
            var environnement_c8 = parsedChartData["response"]["features"][0]["properties"]["ibe_d1_c8"];
        }
        else {
            parsedChartData = "";
        }

        const parsedRadarChartData = [
            {            name: 'Environnement',            A: JSON.stringify(environnement),              "fill": "#3FB338"        },
            {            name: 'Social',            A: JSON.stringify(social),                     "fill": "#FF9412"        },
            {            name: 'Économique',            A: JSON.stringify(economique),                  "fill": "#16BDFA"        },
        ];

        const parsedEnvironnementData = [
            {            name: 'Indicateur 1',            A: JSON.stringify(environnement_c1),              "fill": "#ffc658"        },
            {            name: 'Indicateur 2',            A: JSON.stringify(environnement_c2),              "fill": "#ffc658"        },
            {            name: 'Indicateur 3',            A: JSON.stringify(environnement_c3),              "fill": "#ffc658"        },
            {            name: 'Indicateur 4',            A: JSON.stringify(environnement_c4),              "fill": "#ffc658"        },
            {            name: 'Indicateur 5',            A: JSON.stringify(environnement_c5),              "fill": "#ffc658"        },
            {            name: 'Indicateur 6',            A: JSON.stringify(environnement_c6),              "fill": "#ffc658"        },
            {            name: 'Indicateur 7',            A: JSON.stringify(environnement_c7),              "fill": "#ffc658"        },
            {            name: 'Indicateur 8',            A: JSON.stringify(environnement_c8),              "fill": "#ffc658"        },
        ];


        const style = {width: "100%", height: "100%", zIndex: 10000};

        const style_radial = {
            top: '50%',
            right: 0,
            transform: 'translate(0, -50%)',
            lineHeight: '20px',
        };

        return (
            <>
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart  cy="50%" outerRadius="75%"
                                 data={parsedData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <PolarGrid gridType="polygon"/>
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar  name="indice-bien-etre"  dataKey="A" stroke="#1e44ae" fill="#3FB338" fillOpacity={0.4} strokeOpacity={0.5} />
                    </RadarChart>
                </ResponsiveContainer>
            </>
        );
    }
}

export default IdentifyCharts;
