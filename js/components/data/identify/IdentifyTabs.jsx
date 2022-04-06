
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
import { Col, Grid, Nav, NavItem, Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import IdentifyCharts from '@js/components/data/identify/Charts'
import { Tabs, Tab, TabPane, Sonnet, ButtonToolbar, Button, ButtonGroup, Tooltip } from 'react-bootstrap';

import { layersSelector } from '@mapstore/selectors/layers'
import { createSelector } from 'reselect';
import { getLocalizedProp } from '@mapstore/utils/LocaleUtils';
import { updateNode } from '@mapstore/actions/layers';
import { connect } from 'react-redux';
import { getNode } from '@mapstore/utils/LayersUtils';
import aggregation1 from '../../../../assets/honeycomb.png';
import aggregation2 from '../../../../assets/polygon1.png';
import aggregation3 from '../../../../assets/polygon2.png';

import ToggleButton from '@mapstore/components/buttons/ToggleButton';

const mapDispatchToProps = {
    updateNode
};


class IdentifyTabs extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        layers: PropTypes.array,
        selected_tab: PropTypes.string,
    };

    static defaultProps = {
        name: '',
        layers: [],
        selected_tab: "Magog_IBE_ID__7",

    }

    handleSelect(event) {

        if (event == "Magog_IBE_ID__7") {
            this.setState( { selected_tab: "Magog_IBE_ID__7" });
            this.props.updateNode("Magog_IBE_AD__5", 'layers', {visibility: false});
            this.props.updateNode("Magog_IBE_ID__7", 'layers', {visibility: true});
        }
        if (event == "Magog_IBE_AD__5") {
            this.setState({selected_tab: "Magog_IBE_AD__5"});
            this.props.updateNode("Magog_IBE_AD__5", 'layers', {visibility: true});
            this.props.updateNode("Magog_IBE_ID__7", 'layers', {visibility: false});
        }
    }



    render() {
        const style = {width: "100%", height: "100%", zIndex: 10000};
        const ToggleButtonStyle = {padding: '10px', border: '0px'};
        const mylayer = this.props.layers[7];

        return (

            <>
            <Tabs onSelect={ (event) => { this.handleSelect(event); } } defaultActiveKey={this.props.selected_tab} >
                    <Tab  eventKey={"Magog_IBE_ID__7"} title={
                        <span className="identify-icon glyphicon glyphicon-check"> Indice de bien-être</span>
                    }>

                    <div className="charts" style={style}>
                        <div style={{padding: '20px', display: 'flex', justifyContent: 'center'}}>
                            <ToggleButton pressed={true} glyphicon={"check"}
                                          tooltip={<Tooltip id="showMousePositionCoordinates">Test!</Tooltip>}
                                          text={"Aire de diffusion"}
                                          style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}}
                            />

                            <ToggleButton pressed={false} glyphicon={"unchecked"}
                                          tooltip={<Tooltip id="showMousePositionCoordinates">Test!</Tooltip>}
                                          text={"Îlots de diffusion"}
                                          style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}}
                            />

                            <ToggleButton pressed={false} glyphicon={"unchecked"}
                                          tooltip={<Tooltip id="showMousePositionCoordinates">Test!</Tooltip>}
                                          text={"Pixels"}
                                          style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}}
                            />
                        </div>

                        <IdentifyCharts width="100%" height="100%" data={this.props.data} name="indice-bien-etre" />
                    </div>
                </Tab>
                <Tab eventKey={"Magog_IBE_AD__5"} title={
                    <span className="identify-icon glyphicon glyphicon-unchecked"> Indice de verdure</span>
                }>
                    ibe:ibe-criteres__5
                </Tab>
            </Tabs>

            </>
        );
    }
}

export default connect(null, mapDispatchToProps)(IdentifyTabs);
