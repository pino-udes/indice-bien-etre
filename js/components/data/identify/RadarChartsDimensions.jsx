
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

import { RadialBarChart, RadialBar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Glyphicon, Legend, Label, LabelList } from 'recharts';
import ToolsContainer from '@mapstore/plugins/containers/ToolsContainer';
import BorderLayout from '@mapstore/components/layout/BorderLayout';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Accordion from '@mapstore/components/misc/panels/Accordion';
import './style/topchart.css';


class RadarChartsDimensions extends React.Component {
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

        const parsedEnvironnementData = [
            { name: 'Transport durable', A: JSON.stringify(environnement_c1), "fill": "#ffc658" },
            { name: 'Risques naturels', A: JSON.stringify(environnement_c2), "fill": "#ffc658" },
            { name: 'Accessibilité aux espaces verts', A: JSON.stringify(environnement_c3), "fill": "#ffc658" },
            { name: 'Environnement naturel et verdure', A: JSON.stringify(environnement_c4), "fill": "#ffc658" },

        ];

        const parsedSocialData = [
            { name: 'Sécurité', A: JSON.stringify(social_c1), "fill": "#ffc658" },
            { name: 'Services de soins et santé', A: JSON.stringify(social_c2), "fill": "#ffc658" },
            { name: 'Attraits socio-culturels et sportifs', A: JSON.stringify(social_c3), "fill": "#ffc658" },
            { name: 'Mobilité active', A: JSON.stringify(social_c4), "fill": "#ffc658" },
            { name: 'Éducation', A: JSON.stringify(social_c5), "fill": "#ffc658" },
            { name: 'Confort sensoriel', A: JSON.stringify(social_c6), "fill": "#ffc658" },
            { name: 'Défavorisation', A: JSON.stringify(social_c7), "fill": "#ffc658" },
            { name: 'Support aux personnes démunies', A: JSON.stringify(social_c8), "fill": "#ffc658" },
        ];

        const parsedEconomiqueData = [
            { name: 'Prix du logement', A: JSON.stringify(economique_c1), "fill": "#ffc658" },
            { name: 'Accession à la propriété', A: JSON.stringify(economique_c2), "fill": "#ffc658" },
            { name: 'Attraits touristiques (naturels et anthropiques)', A: JSON.stringify(economique_c3), "fill": "#ffc658" },
            { name: 'Commerces et marchés', A: JSON.stringify(economique_c4), "fill": "#ffc658" },
        ];

        var parsedRadarChartData;
        var chartColor;

        if (this.props.name == 'Environnement') {
            parsedRadarChartData = parsedEnvironnementData;
            chartColor =  '#3FB338';
        }

        if (this.props.name == 'Sociale') {
            parsedRadarChartData = parsedSocialData;
            chartColor = '#FF9412';
        }
        if (this.props.name == 'Économique') {
            parsedRadarChartData = parsedEconomiqueData;
            chartColor = '#16BDFA';
        }

        console.log(parsedRadarChartData);

        const style = {width: "100%", height: "100%", zIndex: 10000};

        return (
            <>
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart  cy="50%" outerRadius="75%"
                                 data={parsedRadarChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <PolarGrid gridType="polygon"/>
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis domain={[0, 100]} />

                        <Radar  name="indice-bien-etre"  dataKey="A" stroke="#1e44ae" fill={chartColor} fillOpacity={0.4} strokeOpacity={0.5}/>
                    </RadarChart>
                </ResponsiveContainer>
            </>
        );
    }
}

export default RadarChartsDimensions;
