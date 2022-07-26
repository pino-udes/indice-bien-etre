
import React from 'react';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
// import RadarChartsDimensionsLabel from '@js/components/data/identify/RadarChartsDimensionsLabels'
import PropTypes from 'prop-types';
import './style/topchart.css';

class RadarChartsDimensions extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        width: PropTypes.string,
        height: PropTypes.string,
        name: PropTypes.string
    };

    static defaultProps = {
        name: ''
    }

    render() {
        var chartData = JSON.stringify(this.props.data[0]);
        var parsedChartData;

        var environnement_c1;
        var environnement_c2;
        var environnement_c3;
        var environnement_c4;
        var social_c1;
        var social_c2;
        var social_c3;
        var social_c4;
        var social_c5;
        var social_c6;
        var social_c7;
        var social_c8;
        var economique_c1;
        var economique_c2;
        var economique_c3;
        var economique_c4;

        var parsedRadarChartData;
        var chartColor;
        // var dataLabel;

        if (this.props.data[0] && ['aire_diffusion', 'ilot_diffusion', 'hexagone'].includes(this.props.data[0].layer.id)) {
            parsedChartData = JSON.parse(chartData);

            if (parsedChartData.response.features.length > 0) {

                environnement_c1 = parsedChartData.response.features[0].properties.ibe_d1_c1;
                environnement_c2 = parsedChartData.response.features[0].properties.ibe_d1_c2;
                environnement_c3 = parsedChartData.response.features[0].properties.ibe_d1_c3;
                environnement_c4 = parsedChartData.response.features[0].properties.ibe_d1_c4;

                social_c1 = parsedChartData.response.features[0].properties.ibe_d2_c1;
                social_c2 = parsedChartData.response.features[0].properties.ibe_d2_c2;
                social_c3 = parsedChartData.response.features[0].properties.ibe_d2_c3;
                social_c4 = parsedChartData.response.features[0].properties.ibe_d2_c4;
                social_c5 = parsedChartData.response.features[0].properties.ibe_d2_c5;
                social_c6 = parsedChartData.response.features[0].properties.ibe_d2_c6;
                social_c7 = parsedChartData.response.features[0].properties.ibe_d2_c7;
                social_c8 = parsedChartData.response.features[0].properties.ibe_d2_c8;

                economique_c1 = parsedChartData.response.features[0].properties.ibe_d3_c1;
                economique_c2 = parsedChartData.response.features[0].properties.ibe_d3_c2;
                economique_c3 = parsedChartData.response.features[0].properties.ibe_d3_c3;
                economique_c4 = parsedChartData.response.features[0].properties.ibe_d3_c4;
            }
        } else {
            parsedChartData = "";
        }

        const parsedEnvironnementData = [
            { name: 'Transport durable', A: JSON.stringify(environnement_c1), "fill": "#ffc658" },
            { name: 'Risques naturels', A: JSON.stringify(environnement_c2), "fill": "#ffc658" },
            { name: 'Accessibilité aux espaces verts', A: JSON.stringify(environnement_c3), "fill": "#ffc658" },
            { name: 'Environnement naturel et verdure', A: JSON.stringify(environnement_c4), "fill": "#ffc658" }
        ];

        const parsedSocialData = [
            { name: 'Sécurité', A: JSON.stringify(social_c1), "fill": "#ffc658" },
            { name: 'Services de soins et santé', A: JSON.stringify(social_c2), "fill": "#ffc658" },
            { name: 'Attraits socio-culturels et sportifs', A: JSON.stringify(social_c3), "fill": "#ffc658" },
            { name: 'Mobilité active', A: JSON.stringify(social_c4), "fill": "#ffc658" },
            { name: 'Éducation', A: JSON.stringify(social_c5), "fill": "#ffc658" },
            { name: 'Confort sensoriel', A: JSON.stringify(social_c6), "fill": "#ffc658" },
            { name: 'Défavorisation', A: JSON.stringify(social_c7), "fill": "#ffc658" },
            { name: 'Support aux personnes démunies', A: JSON.stringify(social_c8), "fill": "#ffc658" }
        ];

        const parsedEconomiqueData = [
            { name: 'Prix du logement', A: JSON.stringify(economique_c1), "fill": "#ffc658" },
            { name: 'Accession à la propriété', A: JSON.stringify(economique_c2), "fill": "#ffc658" },
            { name: 'Attraits touristiques (naturels et anthropiques)', A: JSON.stringify(economique_c3), "fill": "#ffc658" },
            { name: 'Commerces et marchés', A: JSON.stringify(economique_c4), "fill": "#ffc658" }
        ];

        // const environnementDataLabel = ['Transport durable', 'Risques naturels', 'Accessibilité aux espaces verts', 'Environnement naturel et verdure'];
        // const environnementData = [environnement_c1, environnement_c2, environnement_c3, environnement_c4];

        if (this.props.name === 'Environnement') {
            parsedRadarChartData = parsedEnvironnementData;
            chartColor =  '#3FB338';
        }

        if (this.props.name === 'Sociale') {
            parsedRadarChartData = parsedSocialData;
            chartColor = '#16BDFA';
        }
        if (this.props.name === 'Économique') {
            parsedRadarChartData = parsedEconomiqueData;
            chartColor = '#FF9412';
        }

        return (
            <>
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart label={false} cy="50%" outerRadius="75%" data={parsedRadarChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <PolarGrid gridType="polygon"/>
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis domain={[0, 100]}/>
                        <Radar  name="indice-bien-etre"  dataKey="A" stroke="#1e44ae" fill={chartColor} fillOpacity={0.4} strokeOpacity={0.5}/>
                    </RadarChart>
                </ResponsiveContainer>
            </>
        );
    }
}

export default RadarChartsDimensions;
