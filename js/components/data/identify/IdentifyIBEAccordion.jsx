
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
import { Col, Grid, Nav, NavItem, Row, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Accordion from '@js/components/misc/panels/Accordion';
import RadarChartsDimensions from '@js/components/data/identify/RadarChartsDimensions';
import './style/topchart.css';

import { updateNode } from '@mapstore/actions/layers';
import { connect } from 'react-redux';
import { getNode } from '@mapstore/utils/LayersUtils';
import ToggleButton from '@mapstore/components/buttons/ToggleButton';


const mapDispatchToProps = {
    updateNode
};

class IdentifyIBEAccordion extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        activePanel: PropTypes.string,
        onChange: PropTypes.func,
        selectedLayer: PropTypes.string
    };

    static defaultProps = {
        name: '',
    }

    state = {
        activePanel: "panel-environnement",
        environnement_lock: "eye-close",
        sociale_lock: "eye-close",
        economique_lock: "eye-close",
        current_lock: "",
    };

    visualizationLockButtonGlyph(button) {
        if (this.state.current_lock == button) return 'eye-open';
        else return 'eye-close';
    }

    visualizationLockButtonToggled(button) {
        if (this.state.current_lock == button) return true;
        else return false;
    }

    toggleVisualizationLockButton(button) {
        console.log(button);
        if (button == this.state.current_lock) { this.setState({ current_lock: "" }, this.resetVisualization) }
        else { this.setState({ current_lock: button }, this.changeVisualization) }
    }

    changeVisualization(button) {
        if (this.state.current_lock == 'Environnement') {
            this.props.updateNode("Magog_IBE_AD__5", 'layers', {style: 'indice-bien-etre_environnement'});
            this.props.updateNode("Magog_IBE_HEXA__6", 'layers', {style: 'indice-bien-etre_environnement'});
            this.props.updateNode("Magog_IBE_ID__7", 'layers', {style: 'indice-bien-etre_environnement'});
        }
        if (this.state.current_lock == 'Sociale') {
            this.props.updateNode("Magog_IBE_AD__5", 'layers', {style: 'indice-bien-etre_environnement'});
            this.props.updateNode("Magog_IBE_HEXA__6", 'layers', {style: 'indice-bien-etre_environnement'});
            this.props.updateNode("Magog_IBE_ID__7", 'layers', {style: 'indice-bien-etre_environnement'});
        }
        if (this.state.current_lock == 'Économique') {
            this.props.updateNode("Magog_IBE_AD__5", 'layers', {style: 'indice-bien-etre_environnement'});
            this.props.updateNode("Magog_IBE_HEXA__6", 'layers', {style: 'indice-bien-etre_environnement'});
            this.props.updateNode("Magog_IBE_ID__7", 'layers', {style: 'indice-bien-etre_environnement'});
        }
    }

    resetVisualization() {
        console.log("RESETING VISZ");
        this.props.updateNode("Magog_IBE_AD__5", 'layers', {style: 'indice-bien-etre'});
        this.props.updateNode("Magog_IBE_ID__7", 'layers', {style: 'indice-bien-etre'});
        this.props.updateNode("Magog_IBE_HEXA__6", 'layers', {style: 'indice-bien-etre'});
    }

    handleToggleButtonClick(button) {
        this.toggleVisualizationLockButton(button);
        // if (button == 'Environnement') {
        //     this.setState({
        //         environnement_lock: this.toggleVisualizationLockButtonGlyph(button),
        //         sociale_lock: this.toggleVisualizationLockButtonGlyph(button),
        //         economique_lock: this.toggleVisualizationLockButtonGlyph(button),
        //         environnement_lock_pressed: true,
        //         sociale_lock_pressed: false,
        //         economique_lock_pressed: false,
        //     });
        //     this.props.updateNode("Magog_IBE_AD__5", 'layers', {visibility: true});
        //     this.props.updateNode("Magog_IBE_ID__7", 'layers', {visibility: false});
        //     this.props.updateNode("Magog_IBE_HEXA__6", 'layers', {visibility: false});
        // }
        // if (button == 'Sociale') {
        //     this.setState({
        //         environnement_lock: "eye-close",
        //         sociale_lock: "eye-open",
        //         economique_lock: "eye-close",
        //         environnement_lock_pressed: false,
        //         sociale_lock_pressed: true,
        //         economique_lock_pressed: false,
        //     });
        //     this.props.updateNode("Magog_IBE_AD__5", 'layers', {visibility: false});
        //     this.props.updateNode("Magog_IBE_ID__7", 'layers', {visibility: true});
        //     this.props.updateNode("Magog_IBE_HEXA__6", 'layers', {visibility: false});
        //
        // }
        //
        // if (button == 'Économique') {
        //     this.setState({
        //         environnement_lock: "eye-close",
        //         sociale_lock: "eye-close",
        //         economique_lock: "eye-open",
        //         environnement_lock_pressed: false,
        //         sociale_lock_pressed: false,
        //         economique_lock_pressed: true,
        //     });
        //     this.props.updateNode("Magog_IBE_AD__5", 'layers', {visibility: false});
        //     this.props.updateNode("Magog_IBE_ID__7", 'layers', {visibility: false});
        //     this.props.updateNode("Magog_IBE_HEXA__6", 'layers', {visibility: true});
        // }
    }

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
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Environnement"}/>,
                tool: <ToggleButton pressed={this.visualizationLockButtonToggled('Environnement')} glyphicon={this.visualizationLockButtonGlyph('Environnement')}
                                    tooltip={<Tooltip>Visualiser les résultats selon les polygones d'aires de diffusion</Tooltip>}
                                    style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}}
                                    onClick={ () => { this.handleToggleButtonClick('Environnement') } }
                    />
            },

            {
                id: 'panel-social',
                head: {
                    preview: <h1>{social}</h1>,
                    title: 'Social',
                    description: 'Indicateurs de la dimension sociale',
                    size: 'sm'
                },
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Sociale"}/>,
                tool: <ToggleButton pressed={this.visualizationLockButtonToggled('Sociale')} glyphicon={this.visualizationLockButtonGlyph('Sociale')}
                                    tooltip={<Tooltip>Visualiser les résultats selon les polygones d'aires de diffusion</Tooltip>}
                                    style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}}
                                    onClick={ () => { this.handleToggleButtonClick('Sociale') } }
                     />
            },
            {
                id: 'panel-economique',
                head: {
                    preview:<h1>{economique}</h1>,
                    title: 'Économique',
                    description: 'Indicateurs de la dimension économique',
                    size: 'sm'
                },
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Économique"}/>,
                tool: <ToggleButton pressed={this.visualizationLockButtonToggled('Économique')} glyphicon={this.visualizationLockButtonGlyph('Économique')}
                            tooltip={<Tooltip>Visualiser les résultats selon les polygones d'aires de diffusion</Tooltip>}
                            style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}}
                            onClick={ () => { this.handleToggleButtonClick('Économique') } }
                        />
            }
        ];

        return (
            <>
                <Accordion activePanel={this.props.activePanel} panels={panels} onSelect={ (key, value) => {
                    this.setState({activePanel: key});
                    //this.props.updateNode("Magog_IBE_AD__5", 'layers', {style: 'indice-bien-etre_environnement'});
                } } />
            </>
        );
    }
}

//export default IdentifyIBEAccordion;
export default connect(null, mapDispatchToProps)(IdentifyIBEAccordion);
