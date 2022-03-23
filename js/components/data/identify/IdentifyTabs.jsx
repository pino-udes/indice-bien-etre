
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
//import LayerSelector from '@mapstore/components/data/identify/LayerSelector';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import ToolsContainer from '@mapstore/plugins/containers/ToolsContainer';
import BorderLayout from '@mapstore/components/layout/BorderLayout';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import IdentifyCharts from '@js/components/data/identify/Charts'
import { Tabs, Tab, TabPane, Sonnet, ButtonToolbar, Button, ButtonGroup } from 'react-bootstrap';

import { layersSelector } from '@mapstore/selectors/layers'
import { createSelector } from 'reselect';
import { getLocalizedProp } from '@mapstore/utils/LocaleUtils';
import { updateNode } from '@mapstore/actions/layers';
import { connect } from 'react-redux';

const mapDispatchToProps = {
    updateNode
};

class IdentifyTabs extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        layers: PropTypes.array,
    };

    static defaultProps = {
        name: '',
        layers: []
    }



    render() {
        var chartData = JSON.stringify(this.props.data[0]);
        var parsedChartData;

        if (this.props.data[0] !=  undefined) {
            parsedChartData = JSON.parse(chartData);
            var environnement = parsedChartData["response"]["features"][0]["properties"]["_ibe_c1_me"];
            var social = parsedChartData["response"]["features"][0]["properties"]["_ibe_c2_me"];
            var economique = parsedChartData["response"]["features"][0]["properties"]["_ibe_c3_me"];
        }
        else {
            parsedChartData = "";
        }

        const parsedRadarChartData = [
            {            subject: 'Social',            A: JSON.stringify(environnement*100),              fullMark: 100,        },
            {            subject: 'Environnement',            A: JSON.stringify(social*100),                     fullMark: 100,        },
            {            subject: 'Économique',            A: JSON.stringify(economique*100),                  fullMark: 100,        },
        ];

        const style = {width: "100%", height: "100%", zIndex: 10000};
        var test = "AWE"



        //console.log(layers.length);
        const mylayer = this.props.layers[7];

        return (
            <>
            <Tabs  defaultActiveKey="first" >
                    <Tab  eventKey="first" title={
                        <span className="identify-icon glyphicon glyphicon-1-layer"> Indice de bien-être</span>
                    }>
                    <div className="charts" style={style}>
                        <IdentifyCharts width="100%" height="100%" data={this.props.data} name="indice-bien-etre" />
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.props.updateNode(mylayer.id, 'layers', {visibility: false});
                                console.log(JSON.stringify(this.props.layers ));}}
                            >
                            hgfh
                    </Button>
                    </div>
                </Tab>
                <Tab eventKey="second" title={
                    <span className="identify-icon glyphicon glyphicon-1-layer"> Indice de verdure</span>
                }>
                    Hii, I am 2nd tab content
                </Tab>
            </Tabs>

            </>
        );
    }
}

export default connect(null, mapDispatchToProps)(IdentifyTabs);
