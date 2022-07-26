/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// import Message from '@mapstore/components/I18N/Message';
// import NewMapDialog from '@mapstore/components/misc/NewMapDialog';
import { FormControl, FormGroup, Checkbox, ControlLabel, ButtonToolbar, Grid, Col, Tabs, Tab} from 'react-bootstrap';
import ButtonB from '@mapstore/components/misc/Button';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';

// import {showNewMapDialog, createNewMap} from '@mapstore/actions/createnewmap';

import {
    hasContextsSelector,
    loadingSelector,
    loadFlagsSelector
} from '@mapstore/selectors/createnewmap';

import {mapTypeSelector} from '@mapstore/selectors/maptype';


import createnewmap from '@mapstore/reducers/createnewmap';
import * as epics from '@mapstore/epics/createnewmap';

//
import NewIndicesDashboardForm from "@js/plugins/NewIndicesDashboard/NewIndicesDashboardForm";
// import Dropzone from 'react-dropzone';
import Modal from "@mapstore/components/misc/ResizableModal";
import axios from '@mapstore/libs/ajax';
import { reloadMaps } from '@mapstore/actions/maps';
import FileUploader from '@js/components/file/FileUploader';
import sample_data from '../../assets/sample_data.json';
import xml2js from 'xml2js';
import uuid from 'uuid';
import Spinner from 'react-spinkit';
// import {createSelector} from 'reselect';
// import { userSelector } from '@mapstore/selectors/security';

const Button = tooltip(ButtonB);

// const saveSelector = createSelector(
//     userSelector,
//     (user) =>
//         ({ user })
// );


class NewIndicesDashboard extends React.Component {
    static propTypes = {
        showNewIndicesDashboardDialog: PropTypes.bool,
        loading: PropTypes.bool,
        loadFlags: PropTypes.object,
        mapType: PropTypes.string,
        showNewDashboard: PropTypes.bool,
        showNewGeostory: PropTypes.bool,
        colProps: PropTypes.object,
        isLoggedIn: PropTypes.bool,
        allowedRoles: PropTypes.array,
        user: PropTypes.object,
        fluid: PropTypes.bool,
        hasContexts: PropTypes.bool,
        reloadMaps: PropTypes.func
        // showNewMapDialog: PropTypes.bool,
        // onShowNewMapDialog: PropTypes.func,
        // onNewMap: PropTypes.func
    };

    static contextTypes = {
        router: PropTypes.object
    };

    static defaultProps = {
        showNewIndicesDashboardDialog: false,
        loading: false,
        loadFlags: {},
        mapType: "leaflet",
        showNewDashboard: true,
        showNewGeostory: true,
        isLoggedIn: false,
        allowedRoles: ["ADMIN", "USER"],
        colProps: {
            xs: 12,
            sm: 12,
            lg: 12,
            md: 12
        },
        fluid: false,
        hasContexts: false
        // showNewMapDialog: false,
        // onShowNewMapDialog: () => {},
        // onNewMap: () => {}
    };

    state = {
        municipalite: '',
        everyone_can_see: false,
        adFilename: '',
        idFilename: '',
        hexaFilename: '',
        verdureFilename: '',
        spinner: '',
        progressMessage: ''
    };

    getForm = () => {
        return (<NewIndicesDashboardForm
            role="body"
            ref="loginForm"
            showSubmitButton={false}
            user={this.props.user}
        />);
    };


    getModal = () => {
        return (
            <Modal
                clickOutEnabled={false}
                showClose={false}
                show={this.state ? this.state.showNewIndicesDashboardDialog : false}
                onClose={this.close}
                title={"Nouvelle visualisation cartographique"}
                buttons={[{
                    text: "Annuler",
                    onClick: this.close
                }, {
                    bsStyle: "primary",
                    text: "Créer",
                    onClick: this.createDashboard,
                    disabled: this.state.municipalite.length < 1 || this.state.adFilename.length < 1 || this.state.idFilename.length < 1 || this.state.hexaFilename.length < 1 || this.state.verdureFilename.length < 1
                }]}
                fitContent
            >
                <div className="ms-detail-body">
                    <form ref="loginForm">
                        <FormGroup>
                            <ControlLabel>Nom de la municipalité</ControlLabel>
                            <FormControl ref="username" key="username" type="text" value={this.state.municipalite} onChange={this.setMunicipalite}  />
                        </FormGroup>

                        <Checkbox onChange={this.setVisibility}>
                            Visible pour tout le monde
                        </Checkbox>
                    </form>

                    <>
                        <Tabs defaultActiveKey={"Indice de bien-être"} >
                            <Tab  eventKey={"Indice de bien-être"} title={"Indice de bien-être"}>

                                <p style={{marginTop: "20px"}}>Téléversez les fichiers Shapefiles en format ZIP</p>

                                <FileUploader dropMessage={"Aires de diffusion"} beforeUploadMessage={"Aires de diffusion"} setFilename={this.setADFilename}/>
                                <FileUploader dropMessage={"Îlots de diffusion"} beforeUploadMessage={"Îlots de diffusion"} setFilename={this.setIDFilename}/>
                                <FileUploader dropMessage={"Hexagones"} beforeUploadMessage={"Hexagones"} setFilename={this.setHexaFilename}/>

                            </Tab>
                            <Tab  eventKey={"Indice de verdure"} title={"Indice de verdure"}>
                                <p style={{marginTop: "20px"}}>Téléversez le fichier raster en format tif</p>

                                <FileUploader dropMessage={"Indice de verdure"} beforeUploadMessage={"Indice de verdure"} setFilename={this.setVerdureFilename}/>

                            </Tab>
                        </Tabs>

                        <div style={{marginTop: "20px", marginBottom: "20px"}}>
                            {this.state.spinner} {this.state.progressMessage}
                        </div>
                    </>

                </div>
                {/* {this.getFooter()} */}
            </Modal>
        );
    }


    render() {
        const display = this.isAllowed() ? null : "none";

        return (
            <div className="create-new-map-container">
                {this.getModal()}

                <Grid fluid={this.props.fluid} style={{marginBottom: "30px", padding: 0, display}}>
                    <Col {...this.props.colProps} >
                        <ButtonToolbar>
                            {this.props.showNewDashboard ?
                                <Button tooltipId="resources.dashboards.newDashboard" bsSize="large" bsStyle="primary" onClick={() => { this.displayNewIndicesDashboardDialog(); }}>
                                    <span className="glyphicon glyphicon-plus"></span> Nouvelle visualisation
                                </Button>
                                : null}
                        </ButtonToolbar>
                    </Col>
                </Grid>
            </div>
        );
    }

    setADFilename = (value) => {
        this.setState({
            adFilename: value
        });
    };

    setIDFilename = (value) => {
        this.setState({
            idFilename: value
        });
    };

    setHexaFilename = (value) => {
        this.setState({
            hexaFilename: value
        });
    };

    setVerdureFilename = (value) => {
        this.setState({
            verdureFilename: value
        });
    };

    setMunicipalite = (e) => {
        this.setState({
            municipalite: e.target.value
        });
    };
    setVisibility = (e) => {
        this.setState({
            everyone_can_see: e.target.checked
        });
    };
    isAllowed = () => this.props.isLoggedIn && this.props.allowedRoles.indexOf(this.props.user && this.props.user.role) >= 0;

    close = () => {
        // TODO Launch an action in order to change the state
        this.setState({
            showNewIndicesDashboardDialog: false,
            municipalite: '',
            everyone_can_see: false,
            adFilename: '',
            idFilename: '',
            hexaFilename: '',
            verdureFilename: '',
            spinner: '',
            progressMessage: ''
        });
    };

    createDashboard = () => {
        // let actions = [];
        var newResource;
        var config;
        var newMapData;
        var newMapID;
        var securityRoleNewRessource;
        var changeSecurityRoleURL;
        // var tempXML;
        var createWorkspaceXML;
        var configGeoserver = {
            headers: {
                'Content-type': 'text/xml'
            },
            auth: {
                username: 'admin',
                password: 'geoserver'
            }
        };
        var configGeoserverUploadZip = {
            headers: {
                'Content-Type': 'application/zip'
            },
            auth: {
                username: 'admin',
                password: 'geoserver'
            }
        };
        var configGeoserverUploadTif = {
            headers: {
                'Content-Type': 'application/image'
            },
            auth: {
                username: 'admin',
                password: 'geoserver'
            }
        };
        var workspaceId = "ibe_" + uuid();

        // var parts = this.state.adFilename.split('/');
        // var lastSegment = parts.pop() || parts.pop();
        var geoserverDatastoreBaseURL;
        var file;
        // var config;
        var geoserverLayerBaseURL;
        var layerDefaultStyle = "<layer><defaultStyle><name>indice_bien_etre</name></defaultStyle></layer>";
        var WMSGetCapabilitiesADBBox;
        var WMSGetCapabilitiesIDBBox;
        var WMSGetCapabilitiesHEXABBox;
        var WMSGetCapabilitiesVerdureBBox;
        var x;
        // console.log("workspace ", workspaceId);

        const geoserverWorkspaceBaseURL = window.location.origin + "/geoserver/rest/workspaces";
        createWorkspaceXML = "<workspace><name>" + workspaceId + "</name></workspace>";

        this.setState({
            spinner: <Spinner style={{marginTop: "10px", marginBottom: "10px"}} spinnerName="circle" overrideSpinnerClassName="spinner"/>
        });

        // Create workspace on Geoserver
        this.setState({progressMessage: 'Création du nouveau workspace'});
        axios
            .post(geoserverWorkspaceBaseURL, createWorkspaceXML, configGeoserver)
            .then(() => {

                // Get the file from FileUploader (blob url) and upload to geoserver Indice verdure
                config = { responseType: 'blob' };
                axios.get(this.state.verdureFilename, config).then(responseverdureFilename => {
                    file = new File([responseverdureFilename.data], "indice_verdure.tif");
                    geoserverDatastoreBaseURL = window.location.origin + "/geoserver/rest/workspaces/" + workspaceId + "/coveragestores/indice_verdure/file.geotiff";

                    this.setState({progressMessage: 'Téléversement de l\'indice de verdure'});
                    axios
                        .put(geoserverDatastoreBaseURL, file, configGeoserverUploadTif)
                        .then(() => {
                            // Set default style //
                            // geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ workspaceId + "/layers/indice_verdure";
                            // axios
                            //     .put(geoserverLayerBaseURL, layerDefaultStyle, configGeoserver)
                            //     .then((response) => {
                            //         console.log("default style", response.data);
                            //     });
                            // //
                        });
                });

                // Get the file from FileUploader (blob url) and upload to geoserver aire_diffusion
                this.setState({progressMessage: 'Téléversement du shapefile d\'aire de diffusion'});
                config = { responseType: 'blob' };
                axios.get(this.state.adFilename, config).then(responseadFilename => {
                    file = new File([responseadFilename.data], "aire_diffusion.zip");
                    geoserverDatastoreBaseURL = window.location.origin + "/geoserver/rest/workspaces/" + workspaceId + "/datastores/aire_diffusion/file.shp";
                    // geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/layers/aire_diffusion";

                    axios
                        .put(geoserverDatastoreBaseURL, file, configGeoserverUploadZip)
                        .then(() => {
                            geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/" + workspaceId + "/layers/aire_diffusion";
                            axios
                                .put(geoserverLayerBaseURL, layerDefaultStyle, configGeoserver)
                                .then(() => {
                                    // console.log("default style", response.data);
                                });
                        });
                });
                // Get the file from FileUploader (blob url) and upload to geoserver ilot_diffusion
                this.setState({progressMessage: 'Téléversement du shapefile d\'îlots de diffusion'});
                config = { responseType: 'blob' };
                axios.get(this.state.idFilename, config).then(responseidFilename => {
                    file = new File([responseidFilename.data], "ilot_diffusion.zip");
                    geoserverDatastoreBaseURL = window.location.origin + "/geoserver/rest/workspaces/" + workspaceId + "/datastores/ilot_diffusion/file.shp";
                    // geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/layers/ilot_diffusion";

                    axios
                        .put(geoserverDatastoreBaseURL, file, configGeoserverUploadZip)
                        .then(() => {
                            // console.log("!Shapefile uploaded!");
                            geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/" + workspaceId + "/layers/ilot_diffusion";
                            axios
                                .put(geoserverLayerBaseURL, layerDefaultStyle, configGeoserver)
                                .then(() => {
                                    // console.log("default style", response.data);
                                });
                        });
                });

                // Get the file from FileUploader (blob url) and upload to geoserver hexagone
                this.setState({progressMessage: 'Téléversement du shapefile d\'hexagones'});
                config = { responseType: 'blob' };
                axios.get(this.state.hexaFilename, config).then(responsehexaFilename => {
                    file = new File([responsehexaFilename.data], "hexagone.zip");
                    geoserverDatastoreBaseURL = window.location.origin + "/geoserver/rest/workspaces/" + workspaceId + "/datastores/hexagone/file.shp";
                    axios
                        .put(geoserverDatastoreBaseURL, file, configGeoserverUploadZip)
                        .then(() => {
                            geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/" + workspaceId + "/layers/hexagone";
                            axios
                                .put(geoserverLayerBaseURL, layerDefaultStyle, configGeoserver)
                                .then(() => {
                                    // console.log("default style", response.data);

                                    this.setState({progressMessage: 'Configuration de la visualisation'});
                                    axios.get(window.location.origin + "/geoserver/" + workspaceId + "/wms?service=WMS&request=GetCapabilities", configGeoserver).then((responseGetCapabilities) => {
                                        // console.log(xml2js.parseString(responseGetCapabilities.data));

                                        const parser = new xml2js.Parser();
                                        parser.parseString(responseGetCapabilities.data, function(err, result) {

                                            // WMSGetCapabilitiesADnum
                                            // wmslayers = result.WMS_Capabilities;
                                            const wmslayers = result.WMS_Capabilities.Capability[0].Layer[0].Layer;
                                            // console.log(wmslayers);

                                            wmslayers.forEach((wmslayer) => {
                                                // console.log("bound ", wmslayer.EX_GeographicBoundingBox[0].westBoundLongitude[0]);
                                                if (wmslayer.Name[0] === "aire_diffusion") {
                                                    WMSGetCapabilitiesADBBox = {
                                                        "minx": wmslayer.EX_GeographicBoundingBox[0].westBoundLongitude[0],
                                                        "miny": wmslayer.EX_GeographicBoundingBox[0].southBoundLatitude[0],
                                                        "maxx": wmslayer.EX_GeographicBoundingBox[0].eastBoundLongitude[0],
                                                        "maxy": wmslayer.EX_GeographicBoundingBox[0].northBoundLatitude[0]
                                                    };
                                                }
                                                if (wmslayer.Name[0] === "ilot_diffusion") {
                                                    WMSGetCapabilitiesIDBBox = {
                                                        "minx": wmslayer.EX_GeographicBoundingBox[0].westBoundLongitude[0],
                                                        "miny": wmslayer.EX_GeographicBoundingBox[0].southBoundLatitude[0],
                                                        "maxx": wmslayer.EX_GeographicBoundingBox[0].eastBoundLongitude[0],
                                                        "maxy": wmslayer.EX_GeographicBoundingBox[0].northBoundLatitude[0]
                                                    };
                                                }
                                                if (wmslayer.Name[0] === "hexagone") {
                                                    WMSGetCapabilitiesHEXABBox = {
                                                        "minx": wmslayer.EX_GeographicBoundingBox[0].westBoundLongitude[0],
                                                        "miny": wmslayer.EX_GeographicBoundingBox[0].southBoundLatitude[0],
                                                        "maxx": wmslayer.EX_GeographicBoundingBox[0].eastBoundLongitude[0],
                                                        "maxy": wmslayer.EX_GeographicBoundingBox[0].northBoundLatitude[0]
                                                    };
                                                }
                                                if (wmslayer.Name[0] === "indice_verdure") {
                                                    WMSGetCapabilitiesVerdureBBox = {
                                                        "minx": wmslayer.EX_GeographicBoundingBox[0].westBoundLongitude[0],
                                                        "miny": wmslayer.EX_GeographicBoundingBox[0].southBoundLatitude[0],
                                                        "maxx": wmslayer.EX_GeographicBoundingBox[0].eastBoundLongitude[0],
                                                        "maxy": wmslayer.EX_GeographicBoundingBox[0].northBoundLatitude[0]
                                                    };
                                                }
                                            });
                                        });

                                        newMapData = sample_data;
                                        newMapData.map.center.x = WMSGetCapabilitiesADBBox.minx + ((WMSGetCapabilitiesADBBox.maxx - WMSGetCapabilitiesADBBox.minx) / 2);
                                        newMapData.map.center.y = WMSGetCapabilitiesADBBox.miny + ((WMSGetCapabilitiesADBBox.maxy - WMSGetCapabilitiesADBBox.miny) / 2);

                                        const putCreateNewMapBaseURL = window.location.origin + "/indice-bien-etre/rest/geostore/resources";
                                        const layers  = newMapData.map.layers;

                                        x = 0;
                                        layers.forEach((layer) => {
                                            // console.log(layer.id);
                                            if (layer.id === "aire_diffusion") {
                                                newMapData.map.layers[x].search.url = window.location.origin + "/geoserver/" + workspaceId + "/wfs";
                                                newMapData.map.layers[x].search.type = "wfs";
                                                newMapData.map.layers[x].type = "wms";
                                                newMapData.map.layers[x].url = window.location.origin + "/geoserver/" + workspaceId + "/wms";
                                                newMapData.map.layers[x].bbox.bounds.minx = WMSGetCapabilitiesADBBox.minx;
                                                newMapData.map.layers[x].bbox.bounds.miny = WMSGetCapabilitiesADBBox.miny;
                                                newMapData.map.layers[x].bbox.bounds.maxx = WMSGetCapabilitiesADBBox.maxx;
                                                newMapData.map.layers[x].bbox.bounds.maxy = WMSGetCapabilitiesADBBox.maxy;
                                            }
                                            if (layer.id === "ilot_diffusion") {
                                                newMapData.map.layers[x].search.url = window.location.origin + "/geoserver/" + workspaceId + "/wfs";
                                                newMapData.map.layers[x].search.type = "wfs";
                                                newMapData.map.layers[x].type = "wms";
                                                newMapData.map.layers[x].url = window.location.origin + "/geoserver/" + workspaceId + "/wms";
                                                newMapData.map.layers[x].bbox.bounds.minx = WMSGetCapabilitiesIDBBox.minx;
                                                newMapData.map.layers[x].bbox.bounds.miny = WMSGetCapabilitiesIDBBox.miny;
                                                newMapData.map.layers[x].bbox.bounds.maxx = WMSGetCapabilitiesIDBBox.maxx;
                                                newMapData.map.layers[x].bbox.bounds.maxy = WMSGetCapabilitiesIDBBox.maxy;
                                            }
                                            if (layer.id === "hexagone") {
                                                newMapData.map.layers[x].search.url = window.location.origin + "/geoserver/" + workspaceId + "/wfs";
                                                newMapData.map.layers[x].search.type = "wfs";
                                                newMapData.map.layers[x].type = "wms";
                                                newMapData.map.layers[x].url = window.location.origin + "/geoserver/" + workspaceId + "/wms";
                                                newMapData.map.layers[x].bbox.bounds.minx = WMSGetCapabilitiesHEXABBox.minx;
                                                newMapData.map.layers[x].bbox.bounds.miny = WMSGetCapabilitiesHEXABBox.miny;
                                                newMapData.map.layers[x].bbox.bounds.maxx = WMSGetCapabilitiesHEXABBox.maxx;
                                                newMapData.map.layers[x].bbox.bounds.maxy = WMSGetCapabilitiesHEXABBox.maxy;
                                            }
                                            if (layer.id === "indice_verdure") {
                                                newMapData.map.layers[x].type = "wms";
                                                newMapData.map.layers[x].url = window.location.origin + "/geoserver/" + workspaceId + "/wms";
                                                newMapData.map.layers[x].bbox.bounds.minx = WMSGetCapabilitiesVerdureBBox.minx;
                                                newMapData.map.layers[x].bbox.bounds.miny = WMSGetCapabilitiesVerdureBBox.miny;
                                                newMapData.map.layers[x].bbox.bounds.maxx = WMSGetCapabilitiesVerdureBBox.maxx;
                                                newMapData.map.layers[x].bbox.bounds.maxy = WMSGetCapabilitiesVerdureBBox.maxy;
                                            }
                                            x++;
                                        });


                                        // console.log(JSON.parse(JSON.stringify(newMapData)));
                                        newResource = "<Resource><description></description><metadata></metadata><name>" + this.state.municipalite + "</name><category><name>MAP</name></category><store><data><![CDATA[ " + JSON.stringify(newMapData) + " ]]></data></store></Resource>";
                                        config = {
                                            headers: {
                                                'Content-Type': 'text/xml'
                                            }
                                        };
                                        this.setState({progressMessage: 'Création de la visualisation'});
                                        axios.post(putCreateNewMapBaseURL, newResource, config)
                                            .then((newMapIDResponse) => {
                                                newMapID = newMapIDResponse.data;

                                                changeSecurityRoleURL = window.location.origin + "/indice-bien-etre/rest/geostore/resources/resource/" + newMapID + "/permissions";

                                                securityRoleNewRessource = "<SecurityRuleList><SecurityRule><canRead>true</canRead><canWrite>true</canWrite><user><id>12</id><name>admin</name></user></SecurityRule></SecurityRuleList>";
                                                if (this.state.everyone_can_see === true) {
                                                    securityRoleNewRessource = "<SecurityRuleList><SecurityRule><canRead>true</canRead><canWrite>true</canWrite><user><id>12</id><name>admin</name></user></SecurityRule><SecurityRule><canRead>true</canRead><canWrite>false</canWrite><group><groupName>everyone</groupName><id>9</id></group></SecurityRule></SecurityRuleList>";

                                                    this.setState({progressMessage: 'Configuration des accès'});
                                                    axios.post(changeSecurityRoleURL, securityRoleNewRessource, config)
                                                        .then(() => {
                                                            this.setState({
                                                                everyone_can_see: false
                                                            });
                                                        });
                                                }

                                                this.setState({
                                                    showNewIndicesDashboardDialog: false,
                                                    spinner: ''
                                                });

                                                this.props.reloadMaps();
                                            });

                                    });


                                });
                        });
                });
            });
        this.setState({progressMessage: ''});
    };

    displayNewIndicesDashboardDialog = () => {
        this.setState({
            showNewIndicesDashboardDialog: true
        });
        // console.log(process.env.REACT_APP_GEOSTORE_PWD);
    };

    displayNewIndicesDashboardDialogSpinner = () => {
        this.setState({
            showSpinner: true
        });
    };
}

/**
 * Button bar to create a new contents.
 * @memberof plugins
 * @class NewIndiceDashboard
 * @static
 * @prop {boolean} cfg.showNewDashboard show/hide th create new dashboard button.
 * @prop {boolean} cfg.showNewGeostory show/hide th create new geostory button.
 * @prop {boolean} cfg.showNewContext show/hide the create new context button.
 * @prop {string[]} cfg.allowedRoles array of users roles allowed to create maps and/or dashboards. default: `["ADMIN", "USER"]`. Users that don't have these roles will never see the buttons.
 */

export default {
    CreateNewMapPlugin: connect((state) => ({
        loading: loadingSelector(state),
        loadFlags: loadFlagsSelector(state),
        mapType: mapTypeSelector(state),
        isLoggedIn: state && state.security && state.security.user && state.security.user.enabled && !(state.browser && state.browser.mobile) && true || false,
        user: state && state.security && state.security.user,
        hasContexts: hasContextsSelector(state)
    }), {
        reloadMaps
    })(NewIndicesDashboard),
    reducers: {
        createnewmap
    },
    epics


};
