
import React from 'react';

import PropTypes from 'prop-types';
import { Tooltip, Glyphicon, OverlayTrigger, Popover, Image } from 'react-bootstrap';
import { updateNode } from '@mapstore/actions/layers';
import { connect } from 'react-redux';
import ToggleButton from '@mapstore/components/buttons/ToggleButton';
import './style/topchart.css';
import IdentifyIBEAccordion from '@js/components/data/identify/IdentifyIBEAccordion';
import OpacitySlider from '@mapstore/components/TOC/fragments/OpacitySlider';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-cartesian-dist';
// import InfoButton from '@mapstore/components/buttons/InfoButton';
const Plot = createPlotlyComponent(Plotly);
// import Button from '@mapstore/components/misc/Button';

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
        iv_check: "glyphicon glyphicon-unchecked",
        ibe_opacity: 50,
        iv_opacity: 30,
        current_lock: "",
        legend_label: "Indice de bien-être global"
    }

    handleSelect() {

    }

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

    handleOpacityChange(layer, opacity) {
        // console.log("opacity", opacity);
        if (layer === 'indice_bien_etre') {
            this.setState({
                ibe_opacity: opacity
            });
            this.props.updateNode("aire_diffusion", 'layers', {opacity});
            this.props.updateNode("ilot_diffusion", 'layers', {opacity});
            this.props.updateNode("hexagone", 'layers', {opacity});
        }
        if (layer === 'indice_verdure') {
            this.setState({
                iv_opacity: opacity
            });
            this.props.updateNode("indice_verdure", 'layers', {opacity});
        }
    }

    changeLegend(layername) {

        var layer;
        var label = "Indice de bien-être global";
        if (layername === 'Environnement') {
            layer = '-environnement'; label = "Dimension environnementale";
        } else if (layername === 'Sociale') {
            layer = '-sociale'; label = "Dimension sociale";
        } else if (layername === 'Économique') {
            layer = '-economique'; label = "Dimension économique";
        } else layer = "";
        this.setState({
            current_lock: layer,
            legend_label: label
        });
    }

    handleChangeLegend(layername) {
        // console.log("QWEQWE " + layername);
        // this.setState({
        //     current_lock: layername
        // });
        this.changeLegend(layername);
    }


    render() {
        // const style = {width: "100%", height: "100%", zIndex: 10000};

        var chartData;
        var parsedChartData;

        var environnement = 0;
        var social = 0;
        var economique = 0;
        var indice_verdure = 0;

        if (this.props.data[0]  && ['aire_diffusion', 'ilot_diffusion', 'hexagone'].includes(this.props.data[0].layer.id)) {
            chartData = JSON.stringify(this.props.data[0]);
            parsedChartData = JSON.parse(chartData);
            environnement = 0;
            social = 0;
            economique = 0;
            if (parsedChartData.response.features.length > 0) {
                environnement = parsedChartData.response.features[0].properties.ibe_d1;
                social = parsedChartData.response.features[0].properties.ibe_d2;
                economique = parsedChartData.response.features[0].properties.ibe_d3;
            }

        }
        if (this.props.data[1]  && ['indice_verdure'].includes(this.props.data[1].layer.id)) {
            chartData = JSON.stringify(this.props.data[1]);
            parsedChartData = JSON.parse(chartData);
            indice_verdure = 0;
            if (parsedChartData.response.features.length > 0) {
                indice_verdure = Math.round(parsedChartData.response.features[0].properties.GRAY_INDEX * 100);
            }

        }


        // const parsedRadarChartData = [
        //     { name: 'Environnement', A: JSON.stringify(environnement), "fill": "#09C342" },
        //     { name: 'Social', A: JSON.stringify(social), "fill": "#16BDFA" },
        //     { name: 'Économique', A: JSON.stringify(economique), "fill": "#FF9412" }
        // ];

        // const parsedRadarChartDataVerdure = [
        //     { name: 'Indice de verdure', value: indice_verdure, "fill": "#09C342"}
        // ];

        const IndiceBienEtreDataLabel = ['Économique  ', 'Social  ', 'Environnement  '];
        const IndiceBienEtreData = [JSON.stringify(economique), JSON.stringify(social),  JSON.stringify(environnement)];
        const IndiceVerdureData = [indice_verdure];

        // const radarChartEnvironnement = <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Environnement"}/>


        const popoverIndiceBienEtreInfo = (
            <Popover id="popover-trigger-hover-focus" title={<div align="center"><strong>Légende</strong></div>}   >
                <div style={{ paddingTop: 5 + "px", paddingBottom: 5 + "px" }}>{this.state.legend_label}</div>
                <Image src={"./assets/legende-indice-bien-etre" + this.state.current_lock + ".png"} />
            </Popover>
        );

        const popoverIndiceVerdureInfo = (
            <Popover id="popover-trigger-hover-focus" title={<div align="center"><strong>Légende</strong></div>}   >
                <div style={{ paddingTop: 5 + "px", paddingBottom: 5 + "px" }}>Indice de verdure</div>
                <Image src="./assets/legende-indice-verdure.png" />
            </Popover>
        );

        // const glyphButtonInfo = (
        //     <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverIndiceBienEtreInfo}>
        //         <Glyphicon className="square-button" glyph="info-sign" style={{ fontSize: 24 + "px"}}/>
        //     </OverlayTrigger>
        // );


        return (
            <>
                        <div className="IdentifyGridCard" >
                            <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverIndiceBienEtreInfo}>
                                <Glyphicon className="square-button" glyph="info-sign" style={{alignItems: 'center', display: 'inline-flex', width: 38+"px", height: 38+"px", position: 'absolute', right: 0+"px", color: '#078aa3', fontSize: 24+"px"}}/>
                            </OverlayTrigger>

                            <p align="center" style={{marginTop: 0+"px", paddingTop: 5 + "px", paddingBottom: 0 + "px", fontSize: 24, fontWeight: "bold"}}>Indice de bien-être</p>
                            <div className={"ibeControls"}>
                                <p align="center" style={{marginBottom: -10+"px", paddingtop: 25 + "px", fontSize: 14}}>Opacité</p>
                                <div className={"opacityslider"}>
                                    <OpacitySlider
                                        opacity={0.6}
                                        disabled={false}
                                        hideTooltip={false}
                                        onChange={opacity => this.handleOpacityChange("indice_bien_etre", opacity) }/>
                                </div>

                                <p align="center" style={{marginBottom: -10+"px", paddingTop: 10 + "px", fontSize: 14}}>Échelle d'agrégation</p>
                                <div className={"buttoncard"}>
                                    <ToggleButton pressed={this.state.ibe_ad_pressed} glyphicon={this.state.ibe_ad_check} tooltip={<Tooltip id="showMousePositionCoordinates">Visualiser les résultats selon les polygones d'aires de diffusion</Tooltip>} text={"Aire de diffusion"} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('AD'); } }/>
                                    <ToggleButton pressed={this.state.ibe_id_pressed} glyphicon={this.state.ibe_id_check} tooltip={<Tooltip id="showMousePositionCoordinates">Visualiser les résultats selon les polygones d'ilots de diffusion</Tooltip>} text={"Îlot de diffusion"} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('ID'); } }/>
                                    <ToggleButton pressed={this.state.ibe_pix_pressed} glyphicon={this.state.ibe_pix_check} tooltip={<Tooltip id="showMousePositionCoordinates">Visualiser les résultats selon des hexagones de 200 mètres</Tooltip>} text={"Hexagones"} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('PIX'); } }/>
                                </div>


                            </div>
                            <p align="center" style={{marginTop: 20+"px", padding: 0 + "px", fontSize: 40}}>{Math.round((environnement + social + economique) / 3)}</p>
                            <p align="center" style={{ marginTop: -20+"px", padding: 0 + "px", fontSize: 14}}>Indice de bien-être globale</p>

                            <Plot style={{marginTop: -80+"px", marginBottom: -40+"px"}}
                                data =
                                    {[{
                                        type: 'bar',
                                        x: IndiceBienEtreData,
                                        y: IndiceBienEtreDataLabel,
                                        marker: {
                                            color: ['#FF9412', '#16BDFA', '#09C342']
                                        },
                                        orientation: 'h'
                                    }]}

                                layout={{
                                    autosize: true,
                                    yaxis: {
                                        automargin: true
                                    },
                                    xaxis1: {range: [0, 100]},
                                    yaxis1: {range: [0, 10]},
                                    height: 250,
                                    showlegend: false,
                                    legend: {"orientation": "h"},
                                    paper_bgcolor: 'rgba(0,0,0,0)'
                                }}

                                config={{ responsive: true, staticPlot:true }}
                            />

                            {/*<ResponsiveContainer width="100%" height={150}>*/}
                                {/*<RadialBarChart barCategoryGap={1} barGap={1} barSize={17} width="100%" height={150} cy="70%" innerRadius="10%" outerRadius="100%" data={parsedRadarChartData} startAngle={180} endAngle={0}>*/}
                                {/*    <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise dataKey="A" />*/}
                                {/*    <Legend iconSize={14} layout="horizontal" verticalAlign="bottom"  />*/}
                                {/*</RadialBarChart>*/}
                            {/*</ResponsiveContainer>*/}

                            <IdentifyIBEAccordion data={this.props.data} current_lock={this.state.current_lock} handleChangeLegend={this.handleChangeLegend.bind(this)} selectedLayer={this.props.selectedLayer} />
                        </div>


                    </div>
                    <p align="center" style={{marginTop: 20 + "px", padding: 0 + "px", fontSize: 40}}>{Math.round((environnement + social + economique) / 3)}</p>
                    <p align="center" style={{ marginTop: -20 + "px", padding: 0 + "px", fontSize: 14}}>Indice de bien-être globale</p>

                    <Plot style={{marginTop: -80 + "px", marginBottom: -40 + "px"}}
                        data =
                            {[{
                                type: 'bar',
                                x: IndiceBienEtreData,
                                y: IndiceBienEtreDataLabel,
                                marker: {
                                    color: ['#FF9412', '#16BDFA', '#09C342']
                                },
                                orientation: 'h'
                            }]}

                        layout={{
                            autosize: true,
                            yaxis: {
                                automargin: true
                            },
                            xaxis1: {range: [0, 100]},
                            yaxis1: {range: [0, 10]},
                            height: 250,
                            showlegend: false,
                            legend: {"orientation": "h"},
                            paper_bgcolor: 'rgba(0,0,0,0)'
                        }}

                        config={{ responsive: true, staticPlot: true }}
                    />

                    {/* <ResponsiveContainer width="100%" height={150}> */}
                    {/* <RadialBarChart barCategoryGap={1} barGap={1} barSize={17} width="100%" height={150} cy="70%" innerRadius="10%" outerRadius="100%" data={parsedRadarChartData} startAngle={180} endAngle={0}> */}
                    {/*    <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise dataKey="A" /> */}
                    {/*    <Legend iconSize={14} layout="horizontal" verticalAlign="bottom"  /> */}
                    {/* </RadialBarChart> */}
                    {/* </ResponsiveContainer> */}

                    <IdentifyIBEAccordion data={this.props.data} current_lock={this.state.current_lock} handleChangeLegend={this.handleChangeLegend.bind(this)} selectedLayer={this.props.selectedLayer} />
                </div>

                <div className="IdentifyGridCard" >
                    <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverIndiceVerdureInfo}>
                        <Glyphicon className="square-button" glyph="info-sign" style={{alignItems: 'center', display: 'inline-flex', width: 38  + "px", height: 38 + "px", position: 'absolute', right: 0 + "px", color: '#078aa3', fontSize: 24 + "px"}}/>
                    </OverlayTrigger>

                    <p align="center" style={{marginTop: 0 + "px", paddingTop: 5 + "px", paddingBottom: 0 + "px", fontSize: 24, fontWeight: "bold"}}>Indice de verdure</p>
                    <p align="center" style={{marginBottom: -18 + "px", paddingtop: 25 + "px", fontSize: 14}}>Opacité</p>
                    <div className={"ibeControls"}>
                        <div className={"opacityslider"}>
                            <OpacitySlider
                                opacity={0.3}
                                disabled={false}
                                hideTooltip={false}
                                onChange={opacity => this.handleOpacityChange("indice_verdure", opacity) }/>
                        </div>
                    </div>

                    <p align="center" style={{marginTop: 15 + "px", padding: 0 + "px", fontSize: 40}}>{indice_verdure}</p>
                    <p align="center" style={{marginTop: -20 + "px", paddingBottom: 10 + "px", fontSize: 14}}>Indice de verdure</p>

                    <Plot style={{marginTop: -80 + "px", marginBottom: -40 + "px"}}
                        data =
                            {[{
                                type: 'bar',
                                x: IndiceVerdureData,
                                y: ['Indice de verdure  '],
                                marker: {
                                    color: [ '#6ddb8f']
                                },
                                orientation: 'h'
                            }]}

                        layout={{
                            autosize: true,
                            yaxis: {
                                automargin: true
                            },
                            xaxis1: {range: [0, 100]},
                            yaxis1: {range: [0, 10]},
                            height: 200,
                            showlegend: false,
                            legend: {"orientation": "h"},
                            paper_bgcolor: 'rgba(0,0,0,0)'
                        }}

                        config={{ responsive: true, staticPlot: true }}
                    />

                    {/* <ResponsiveContainer width="100%" height={150}>*/}
                    {/*    <RadialBarChart domain={[0, 100]} barCategoryGap={1} barGap={1} barSize={17} width="100%" height={150} cy="70%" innerRadius="100%" outerRadius="50%" data={parsedRadarChartDataVerdure} startAngle={180} endAngle={0}> */}
                    {/*        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} /> */}
                    {/*        <RadialBar background minAngle={15} label={false} clockWise dataKey="value" angleAxisId={0} /> */}
                    {/*        <Legend iconSize={14} layout="horizontal" verticalAlign="bottom" /> */}
                    {/*    </RadialBarChart> */}
                    {/* </ResponsiveContainer> */}

                </div>
            </>
        );
        // onChange={opacity => this.props.updateNode("indice_verdure", 'layers', {opacity}) }

    }

}

export default connect(null, mapDispatchToProps)(IdentifyTabs);
