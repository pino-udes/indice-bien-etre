
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
import './style/topchart.css';

import { updateNode } from '@mapstore/actions/layers';
import { connect } from 'react-redux';
import { getNode } from '@mapstore/utils/LayersUtils';

const mapDispatchToProps = {
    updateNode
};

class IdentifyIBEAccordion extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        activePanel: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: '',
    }

    state = { activePanel: "panel-environnement" };


    render() {
        var chartData = JSON.stringify(this.props.data[0]);
        //console.log(chartData);
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


        const style = {width: "100%", height: "100%", zIndex: 10000};

        const style_radial = {
            top: '50%',
            right: 0,
            transform: 'translate(0, -50%)',
            lineHeight: '20px',
        };

        const panels = [
            {
                id: 'panel-environnement',
                head: {
                    preview: <h1>{environnement}</h1>,
                    title: 'Environnement',
                    description: 'Indicateurs de la dimension environnementale',
                    size: 'sm'
                },
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Environnement"}/>
            },

            {
                id: 'panel-social',
                head: {
                    preview: <h1>{social}</h1>,
                    title: 'Social',
                    description: 'Indicateurs de la dimension sociale',
                    size: 'sm'
                },
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Sociale"}/>
            },
            {
                id: 'panel-economique',
                head: {
                    preview:<h1>{economique}</h1>,
                    title: 'Économique',
                    description: 'Indicateurs de la dimension économique',
                    size: 'sm'
                },
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Économique"}/>
            }
        ];

        return (
            <>
                <Accordion activePanel={this.props.activePanel} panels={panels} onSelect={ (key, value) => { this.setState({activePanel: key}); this.props.updateNode("Magog_IBE_AD__5", 'layers', {style: 'indice-bien-etre_environnement'}); } } />
            </>
        );
    }
}

//export default IdentifyIBEAccordion;
export default connect(null, mapDispatchToProps)(IdentifyIBEAccordion);
