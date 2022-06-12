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

import Message from '@mapstore/components/I18N/Message';
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
import Dropzone from 'react-dropzone';
import Modal from "@mapstore/components/misc/ResizableModal";
// import { createResource, updateResource, getResource, createCategory } from '@mapstore/api/persistence';
import axios from '@mapstore/libs/ajax';
// import xml2js from 'xml2js';
import { reloadMaps } from '@mapstore/actions/maps';
import FileUploader from '@js/components/file/FileUploader';
//


const Button = tooltip(ButtonB);
// const SplitButton = tooltip(SplitButtonB);

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
        reloadMaps: PropTypes.func,
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
        hexaFilename: ''
    };

    getForm = () => {
        return (<NewIndicesDashboardForm
            role="body"
            ref="loginForm"
            showSubmitButton={false}
            user={this.props.user}
            // loginError={this.props.loginError}
            // onLoginSuccess={this.props.onLoginSuccess}
            // onSubmit={this.props.onSubmit}
            // onError={this.props.onError}
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
                    text: <Message msgId="Annuler" />,
                    onClick: this.close
                }, {
                    bsStyle: "primary",
                    text: <Message msgId="Créer" />,
                    onClick: this.createDashboard
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

                            </Tab>
                        </Tabs>
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
            showNewIndicesDashboardDialog: false
        });
    };

    createDashboard = () => {
        var newResource;
        var config;
        var newMapData;
        var newMapID;
        // var username = 'admin';
        // var password = 'geoserver';
        var securityRoleNewRessource;
        var changeSecurityRoleURL;
        var tempXML;
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
        var configGeoserverUpload = {
            headers: {
                'Content-Type': 'application/zip'
            },
            auth: {
                username: 'admin',
                password: 'geoserver'
            }
        };

        console.log("123123 ", this.state.adFilename);

        const geoserverWorkspaceBaseURL = window.location.origin + "/geoserver/rest/workspaces";
        // todo changer pour un random. Pas besoin d'avoir le nom dans le workspace nécessairment.
        createWorkspaceXML = "<workspace><name>" + this.state.municipalite + "</name></workspace>";



        var parts = this.state.adFilename.split('/');
        var lastSegment = parts.pop() || parts.pop();
        var geoserverDatastoreBaseURL;
        var file;
        var config;
        var geoserverLayerBaseURL;
        var layerDefaultStyle = "<layer><defaultStyle><name>indice_bien_etre</name></defaultStyle></layer>";

        // Create workspace on Geoserver
        axios
            .post(geoserverWorkspaceBaseURL, createWorkspaceXML, configGeoserver)
            .then(() => {
                // Get the file from FileUploader (blob url) and upload to geoserver aire_diffusion
                config = { responseType: 'blob' };
                axios.get(this.state.adFilename, config).then(response => {
                    file = new File([response.data], "aire_diffusion.zip");
                    geoserverDatastoreBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/datastores/aire_diffusion/file.shp";
                    // geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/layers/aire_diffusion";

                    axios
                        .put(geoserverDatastoreBaseURL, file, configGeoserverUpload)
                        .then((response) => {
                            console.log("!Shapefile uploaded!");
                            geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/layers/aire_diffusion";
                            axios
                                .put(geoserverLayerBaseURL, layerDefaultStyle, configGeoserver)
                                .then((response) => {
                                    console.log("default style", response.data);
                                });
                        });
                });
                // Get the file from FileUploader (blob url) and upload to geoserver ilot_diffusion
                config = { responseType: 'blob' };
                axios.get(this.state.idFilename, config).then(response => {
                    file = new File([response.data], "ilot_diffusion.zip");
                    geoserverDatastoreBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/datastores/ilot_diffusion/file.shp";
                    // geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/layers/ilot_diffusion";

                    axios
                        .put(geoserverDatastoreBaseURL, file, configGeoserverUpload)
                        .then((response) => {
                            console.log("!Shapefile uploaded!");
                            geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/layers/ilot_diffusion";
                            axios
                                .put(geoserverLayerBaseURL, layerDefaultStyle, configGeoserver)
                                .then((response) => {
                                    console.log("default style", response.data);
                                });
                        });
                });

                // Get the file from FileUploader (blob url) and upload to geoserver hexagone
                config = { responseType: 'blob' };
                axios.get(this.state.hexaFilename, config).then(response => {
                    file = new File([response.data], "hexagone.zip");
                    geoserverDatastoreBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/datastores/hexagone/file.shp";
                    axios
                        .put(geoserverDatastoreBaseURL, file, configGeoserverUpload)
                        .then((response) => {
                            console.log("!Shapefile uploaded!");
                            geoserverLayerBaseURL = window.location.origin + "/geoserver/rest/workspaces/"+ this.state.municipalite + "/layers/hexagone";
                            axios
                                .put(geoserverLayerBaseURL, layerDefaultStyle, configGeoserver)
                                .then((response) => {
                                    console.log("default style", response.data);
                                });
                        });
                });
            });


        // Create new map
        // const getCreateNewMapBaseURL = "http://localhost:8080/mapstore/rest/geostore/resources/resource/102?full=true";
        const getTemplateDataURL = "http://localhost:8080/mapstore/rest/geostore/data/102";

        const putCreateNewMapBaseURL = "http://localhost:8080/mapstore/rest/geostore/resources";


        axios.get(getTemplateDataURL).then((newMapDataResponse) => {
            newMapData = newMapDataResponse.data;

            // console.log(JSON.parse(JSON.stringify(newMapData)));
            newResource = "<Resource><description></description><metadata></metadata><name>" + this.state.municipalite + "</name><category><name>MAP</name></category><store><data><![CDATA[ " + JSON.stringify(newMapData) + " ]]></data></store></Resource>";
            config = {
                headers: {
                    'Content-Type': 'text/xml'
                }
            };
            axios.post(putCreateNewMapBaseURL, newResource, config)
                .then((newMapIDResponse) => {
                    newMapID = newMapIDResponse.data;
                    // console.log("newMapID: ", newMapID);
                    // this.props.reloadMaps();

                    changeSecurityRoleURL = "http://localhost:8080/mapstore/rest/geostore/resources/resource/" + newMapID + "/permissions";
                    // axios.get(changeSecurityRoleURL).then((response) => {
                    //     resourcePermissions = response.data;
                    //     // console.log("3333333 ", JSON.parse(JSON.stringify(resourcePermissions)));
                    // });

                    securityRoleNewRessource = "<SecurityRuleList><SecurityRule><canRead>true</canRead><canWrite>true</canWrite><user><id>12</id><name>admin</name></user></SecurityRule></SecurityRuleList>";
                    if (this.state.everyone_can_see === true) {
                        // console.log("SADASDASDASDS");
                        securityRoleNewRessource = "<SecurityRuleList><SecurityRule><canRead>true</canRead><canWrite>true</canWrite><user><id>12</id><name>admin</name></user></SecurityRule><SecurityRule><canRead>true</canRead><canWrite>false</canWrite><group><groupName>everyone</groupName><id>9</id></group></SecurityRule></SecurityRuleList>";
                        axios.post(changeSecurityRoleURL, securityRoleNewRessource, config)
                            .then(() => {
                                this.setState({
                                    everyone_can_see: false
                                });
                            });
                    }

                    this.props.reloadMaps();

                });
        });


        // // //
        // const baseURL = "http://localhost:8080/mapstore/rest/geostore/data/178";
        // var mapdata;
        //
        // axios.get(baseURL).then((response) => {
        //     mapdata = response.data;
        //
        //     // console.log(response.data);
        //
        //     const layers  = mapdata.map.layers;
        //
        //     var x = 0;
        //     layers.forEach((layer) => {
        //         // console.log(layer.id);
        //         if (layer.id == "Magog_IBE_HEXA__6") {
        //             mapdata.map.layers[x].visibility = false;
        //         }
        //         x++;
        //     });
        //
        //     axios.put(baseURL, mapdata)
        //         .then((response) => {
        //             // console.log(response.data);
        //         });
        //
        // });
        // // //

        this.setState({
            showNewIndicesDashboardDialog: false
        });

    };


    displayNewIndicesDashboardDialog = () => {
        this.setState({
            showNewIndicesDashboardDialog: true
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
