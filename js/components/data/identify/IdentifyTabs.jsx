
import React from 'react';

// import { Row } from 'react-bootstrap';
// import { get } from 'lodash';
// import Toolbar from '@mapstore/components/misc/toolbar/Toolbar';
// import Message from '@mapstore/components/I18N/Message';
// import DockablePanel from '@mapstore/components/misc/panels/DockablePanel';
// import GeocodeViewer from '@mapstore/components/data/identify/GeocodeViewer';
// import ResizableModal from '@mapstore/components/misc/ResizableModal';
// import Portal from '@mapstore/components/misc/Portal';
// import Coordinate from '@mapstore/components/data/identify/coordinates/Coordinate';
// import { responseValidForEdit } from '@mapstore/utils/IdentifyUtils';
// import LayerSelector from '@mapstore/components/data/identify/LayerSelector';

// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
// import ToolsContainer from '@mapstore/plugins/containers/ToolsContainer';
// import BorderLayout from '@mapstore/components/layout/BorderLayout';
// import { Col, Grid, Nav, NavItem, Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import IdentifyCharts from '@js/components/data/identify/Charts';
// import IdentifyIndiceText from '@js/components/data/identify/IndiceText';

import { Tabs, Tab, Tooltip } from 'react-bootstrap';

// import { layersSelector } from '@mapstore/selectors/layers';
// import { createSelector } from 'reselect';
// import { getLocalizedProp } from '@mapstore/utils/LocaleUtils';
import { updateNode } from '@mapstore/actions/layers';
import { connect } from 'react-redux';
// import { getNode } from '@mapstore/utils/LayersUtils';
// import aggregation1 from '../../../../assets/honeycomb.png';
// import aggregation2 from '../../../../assets/polygon1.png';
// import aggregation3 from '../../../../assets/polygon2.png';

import ToggleButton from '@mapstore/components/buttons/ToggleButton';
// import Accordion from '@mapstore/components/misc/panels/Accordion';
import './style/topchart.css';


const mapDispatchToProps = {
    updateNode
};


class IdentifyTabs extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        layers: PropTypes.array,
        selectedLayer: PropTypes.string
    };

    static defaultProps = {
        name: '',
        layers: [],
        selected_tab: "Magog_IBE_ID__7",
        selectedLayer: 'Aire de diffusion',
        ibe_check: "glyphicon glyphicon-check",
        iv_check: "glyphicon glyphicon-unchecked"
    }

    state = {
        selected_tab: "Magog_IBE_ID__7",
        selectedLayer: 'Aire de diffusion',
        ibe_check: "glyphicon glyphicon-check",
        ibe_ad_check: "check",
        ibe_ad_pressed: true,
        ibe_id_check: "unchecked",
        ibe_id_pressed: false,
        ibe_pix_check: "unchecked",
        ibe_pix_pressed: false,
        iv_check: "glyphicon glyphicon-unchecked"
    }

    handleSelect() {

    }
    // handleSelect(event) {
    // if (event == "Magog_IBE_ID__7") {
    //     this.setState( { selected_tab: "Magog_IBE_ID__7"});
    //     this.setState( { ibe_check: "glyphicon glyphicon-check"});
    //     this.setState( { iv_check: "glyphicon glyphicon-unchecked"});
    //     this.props.updateNode("Magog_IBE_AD__5", 'layers', {visibility: false});
    //     this.props.updateNode("Magog_IBE_ID__7", 'layers', {visibility: true});
    //     console.log(this.state.selected_tab);
    // }
    // if (event == "Magog_IBE_AD__5") {
    //     this.setState({selected_tab: "Magog_IBE_AD__5"});
    //     this.setState({ibe_check: "glyphicon glyphicon-unchecked"});
    //     this.setState({iv_check: "glyphicon glyphicon-check"});
    //     this.props.updateNode("Magog_IBE_AD__5", 'layers', {visibility: true});
    //     this.props.updateNode("Magog_IBE_ID__7", 'layers', {visibility: false});
    //     console.log(this.state.selected_tab);
    // }
    // }
    // Magog_IBE_HEXA__6
    handleToggleButtonClick(button) {
        if (button === 'AD') {
            this.setState({
                ibe_ad_check: "check",
                ibe_id_check: "unchecked",
                ibe_pix_check: "unchecked",
                selectedLayer: 'Aire de diffusion',
                ibe_ad_pressed: true,
                ibe_id_pressed: false,
                ibe_pix_pressed: false
            });
            this.props.updateNode("aire_diffusion", 'layers', {visibility: true});
            this.props.updateNode("ilot_diffusion", 'layers', {visibility: false});
            this.props.updateNode("hexagone", 'layers', {visibility: false});
        }
        if (button === 'ID') {
            this.setState({
                ibe_ad_check: "unchecked",
                ibe_id_check: "check",
                ibe_pix_check: "unchecked",
                selectedLayer: 'Îlot de diffusion',
                ibe_ad_pressed: false,
                ibe_id_pressed: true,
                ibe_pix_pressed: false
            });
            this.props.updateNode("aire_diffusion", 'layers', {visibility: false});
            this.props.updateNode("ilot_diffusion", 'layers', {visibility: true});
            this.props.updateNode("hexagone", 'layers', {visibility: false});

        }

        if (button === 'PIX') {
            this.setState({
                ibe_ad_check: "unchecked",
                ibe_id_check: "unchecked",
                ibe_pix_check: "check",
                selectedLayer: 'Pixel',
                ibe_ad_pressed: false,
                ibe_id_pressed: false,
                ibe_pix_pressed: true
            });
            this.props.updateNode("aire_diffusion", 'layers', {visibility: false});
            this.props.updateNode("ilot_diffusion", 'layers', {visibility: false});
            this.props.updateNode("hexagone", 'layers', {visibility: true});
        }
    }


    render() {
        const style = {width: "100%", height: "100%", zIndex: 10000};
        // const ToggleButtonStyle = {padding: '10px', border: '0px'};

        return (

            <>
                <style type="text/css">
                    {`
                        .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover {
                            float:none;
                            display:inline-block;
                            zoom:1;
                            box-shadow: 0px -4px 4px 2px rgb(0 0 0 / 20%);
                            width: 99%;
                        }
                        .nav-tabs > li {
                            float:none;
                            display:inline-block;
                            zoom:1;
                            width: 50%;
                        }
                        .nav-tabs {
                            text-align:center;
                            box-shadow: inset 0px -6px 4px -4px rgb(0 0 0 / 20%);
                            margin-top: 15px;
                            width: 99%;
                        }
                    `}
                </style>

                <Tabs onSelect={ (event) => { this.handleSelect(event); } } defaultActiveKey={this.state.selected_tab}>
                    <Tab  eventKey={"Magog_IBE_ID__7"} title={
                        <><h4>Indice de bien-être</h4></>
                    }>

                        <div className="charts" style={style}>
                            <div className={"buttoncard"}>
                                <ToggleButton pressed={this.state.ibe_ad_pressed} glyphicon={this.state.ibe_ad_check} tooltip={<Tooltip id="showMousePositionCoordinates">Visualiser les résultats selon les polygones d'aires de diffusion</Tooltip>} text={"Aire de diffusion"} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('AD'); } }/>
                                <ToggleButton pressed={this.state.ibe_id_pressed} glyphicon={this.state.ibe_id_check} tooltip={<Tooltip id="showMousePositionCoordinates">Visualiser les résultats selon les polygones d'ilots de diffusion</Tooltip>} text={"Îlot de diffusion"} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('ID'); } }/>
                                <ToggleButton pressed={this.state.ibe_pix_pressed} glyphicon={this.state.ibe_pix_check} tooltip={<Tooltip id="showMousePositionCoordinates">Visualiser les résultats selon des hexagones de 200 mètres</Tooltip>} text={"Pixel"} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('PIX'); } }/>
                            </div>

                            <IdentifyCharts width="100%" height="100%" data={this.props.data} name="indice-bien-etre" selectedLayer={this.state.selectedLayer} />

                        </div>
                    </Tab>

                    <Tab eventKey={"Magog_IBE_AD__5"} title={
                        <><h4>Indice de verdure</h4></>
                    }>
                        <p align={"center"}><br/><br/><br/><span className="glyphicon glyphicon-wrench"></span></p>

                    </Tab>
                </Tabs>

            </>
        );
    }
}

export default connect(null, mapDispatchToProps)(IdentifyTabs);
