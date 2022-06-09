
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
import RadarChartsDimensions from '@js/components/data/identify/RadarChartsDimensions';
import IdentifyIBEAccordion from '@js/components/data/identify/IdentifyIBEAccordion';
import './style/topchart.css';


class IdentifyCharts extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        width: PropTypes.string,
        height: PropTypes.string,
        name: PropTypes.string,
        activePanel: PropTypes.string,
        selectedLayer: PropTypes.string
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
            var environnement = parsedChartData.response.features[0].properties.ibe_d1;
            var environnement_c1 = parsedChartData.response.features[0].properties.ibe_d1_c1;
            var environnement_c2 = parsedChartData.response.features[0].properties.ibe_d1_c2;
            var environnement_c3 = parsedChartData.response.features[0].properties.ibe_d1_c3;
            var environnement_c4 = parsedChartData.response.features[0].properties.ibe_d1_c4;
            var environnement_c5 = parsedChartData.response.features[0].properties.ibe_d1_c5;
            var environnement_c6 = parsedChartData.response.features[0].properties.ibe_d1_c6;
            var environnement_c7 = parsedChartData.response.features[0].properties.ibe_d1_c7;
            var environnement_c8 = parsedChartData.response.features[0].properties.ibe_d1_c8;

            var social = parsedChartData.response.features[0].properties.ibe_d2;
            var social_c1 = parsedChartData.response.features[0].properties.ibe_d2_c1;
            var social_c2 = parsedChartData.response.features[0].properties.ibe_d2_c2;
            var social_c3 = parsedChartData.response.features[0].properties.ibe_d2_c3;
            var social_c4 = parsedChartData.response.features[0].properties.ibe_d2_c4;
            var social_c5 = parsedChartData.response.features[0].properties.ibe_d2_c5;
            var social_c6 = parsedChartData.response.features[0].properties.ibe_d2_c6;
            var social_c7 = parsedChartData.response.features[0].properties.ibe_d2_c7;
            var social_c8 = parsedChartData.response.features[0].properties.ibe_d2_c8;

            var economique = parsedChartData.response.features[0].properties.ibe_d3;
            var economique_c1 = parsedChartData.response.features[0].properties.ibe_d3_c1;
            var economique_c2 = parsedChartData.response.features[0].properties.ibe_d3_c2;
            var economique_c3 = parsedChartData.response.features[0].properties.ibe_d3_c3;
            var economique_c4 = parsedChartData.response.features[0].properties.ibe_d3_c4;
            var economique_c5 = parsedChartData.response.features[0].properties.ibe_d3_c5;
            var economique_c6 = parsedChartData.response.features[0].properties.ibe_d3_c6;
            var economique_c7 = parsedChartData.response.features[0].properties.ibe_d3_c7;
            var economique_c8 = parsedChartData.response.features[0].properties.ibe_d3_c8;
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

        const parsedSocialData = [
            {            name: 'Indicateur 1',            A: JSON.stringify(social_c1),              "fill": "#ffc658"        },
            {            name: 'Indicateur 2',            A: JSON.stringify(social_c2),              "fill": "#ffc658"        },
            {            name: 'Indicateur 3',            A: JSON.stringify(social_c3),              "fill": "#ffc658"        },
            {            name: 'Indicateur 4',            A: JSON.stringify(social_c4),              "fill": "#ffc658"        },
            {            name: 'Indicateur 5',            A: JSON.stringify(social_c5),              "fill": "#ffc658"        },
            {            name: 'Indicateur 6',            A: JSON.stringify(social_c6),              "fill": "#ffc658"        },
            {            name: 'Indicateur 7',            A: JSON.stringify(social_c7),              "fill": "#ffc658"        },
            {            name: 'Indicateur 8',            A: JSON.stringify(social_c8),              "fill": "#ffc658"        },
        ];

        const parsedEconomiqueData = [
            {            name: 'Indicateur 1',            A: JSON.stringify(economique_c1),              "fill": "#ffc658"        },
            {            name: 'Indicateur 2',            A: JSON.stringify(economique_c2),              "fill": "#ffc658"        },
            {            name: 'Indicateur 3',            A: JSON.stringify(economique_c3),              "fill": "#ffc658"        },
            {            name: 'Indicateur 4',            A: JSON.stringify(economique_c4),              "fill": "#ffc658"        },
            {            name: 'Indicateur 5',            A: JSON.stringify(economique_c5),              "fill": "#ffc658"        },
            {            name: 'Indicateur 6',            A: JSON.stringify(economique_c6),              "fill": "#ffc658"        },
            {            name: 'Indicateur 7',            A: JSON.stringify(economique_c7),              "fill": "#ffc658"        },
            {            name: 'Indicateur 8',            A: JSON.stringify(economique_c8),              "fill": "#ffc658"        },
        ];

        const style = {width: "100%", height: "100%", zIndex: 10000};

        const formatCards = {
            TEXT: {
                titleId: 'layerProperties.textFormatTitle',
                descId: 'layerProperties.textFormatDescription',
                glyph: 'ext-txt',
                body: () => <div className="test-preview"/>
            },
            HTML: {
                titleId: 'layerProperties.htmlFormatTitle',
                descId: 'layerProperties.htmlFormatDescription',
                glyph: 'ext-html',
                body: () => <div className="test-preview"/>
            },
            PROPERTIES: {
                titleId: 'layerProperties.propertiesFormatTitle',
                descId: 'layerProperties.propertiesFormatDescription',
                glyph: 'ext-json',
                body: () => <div className="test-preview"/>
            },
            TEMPLATE: {
                titleId: 'layerProperties.templateFormatTitle',
                descId: 'layerProperties.templateFormatDescription',
                glyph: 'ext-empty',
                body: () => <div className="test-preview"/>
            }
        };


        const style_radial = {
            top: '50%',
            right: 0,
            transform: 'translate(0, -50%)',
            lineHeight: '20px',
        };

        return (
            <>
                <div className={"IdentifyGridCard"}>

                    <div style={{padding: '0px', display: 'flex', justifyContent: 'center'}}>
                        <h3>Indice de bien-être: {Math.round((environnement + social+economique) / 3)}</h3>
                    </div>

                    <ResponsiveContainer width="100%" height={150}>
                        <RadialBarChart barCategoryGap={1} barGap={1} barSize={17} width="100%" height={150} cy="70%" innerRadius="10%" outerRadius="100%" data={parsedRadarChartData} startAngle={180} endAngle={0}>
                            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey="A" />
                            <Legend iconSize={14} layout="horizontal" verticalAlign="bottom"  />
                        </RadialBarChart>
                    </ResponsiveContainer>

                </div>

                <IdentifyIBEAccordion data={this.props.data} selectedLayer={this.props.selectedLayer}/>

            </>
        );
    }
}

export default IdentifyCharts;
