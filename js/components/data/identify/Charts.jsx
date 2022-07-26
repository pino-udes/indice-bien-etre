
import React from 'react';

import { RadialBarChart, RadialBar, ResponsiveContainer, Legend } from 'recharts';
import PropTypes from 'prop-types';
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
        name: ''
    }

    state = { activePanel: "panel-002" };

    render() {
        var chartData;
        var parsedChartData;

        var environnement = 0;
        var social = 0;
        var economique = 0;
        // console.log("WMS ", this.props.data.length);
        // console.log("WMS ", this.props.data);


        if (this.props.data.length === 1  && ['aire_diffusion', 'ilot_diffusion', 'hexagone'].includes(this.props.data[0].layer.id)) {
            chartData = JSON.stringify(this.props.data[0]);
            // console.log(this.props.data[0], " WWWWWW ");
            parsedChartData = JSON.parse(chartData);
            environnement = 0;
            social = 0;
            economique = 0;
            if (parsedChartData.response.features.length > 0) {
                environnement = parsedChartData.response.features[0].properties.ibe_d1;
                social = parsedChartData.response.features[0].properties.ibe_d2;
                economique = parsedChartData.response.features[0].properties.ibe_d3;
            }

        } else {
            parsedChartData = "";
        }

        const parsedRadarChartData = [
            { name: 'Environnement', A: JSON.stringify(environnement), "fill": "#09C342" },
            { name: 'Social', A: JSON.stringify(social), "fill": "#16BDFA" },
            { name: 'Économique', A: JSON.stringify(economique), "fill": "#FF9412" }
        ];

        return (
            <>
                <div className={"IdentifyGridCard"}>

                    <div style={{padding: '0px', display: 'flex', justifyContent: 'center'}}>
                        <h3>Indice de bien-être: {Math.round((environnement + social + economique) / 3)}</h3>
                    </div>

                    <ResponsiveContainer width="100%" height={150}>
                        <RadialBarChart barCategoryGap={1} barGap={1} barSize={17} width="100%" height={150} cy="70%" innerRadius="10%" outerRadius="100%" data={parsedRadarChartData} startAngle={180} endAngle={0}>
                            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise dataKey="A" />
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
