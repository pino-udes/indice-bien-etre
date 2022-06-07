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
import xml2js from 'xml2js';
import { reloadMaps } from '@mapstore/actions/maps';
//

const mapDispatchToProps = {
    reloadMaps
};

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
        hasContexts: PropTypes.bool
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
        everyone_can_see: false
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
                            <FormControl ref="username" key="username" type="text" value={this.state.municipalite} onChange={this.setMunicipalite} />
                        </FormGroup>

                        <Checkbox onChange={this.setVisibility}>
                            Visible pour tout le monde
                        </Checkbox>
                    </form>

                    <>
                        <Tabs defaultActiveKey={"Indice de bien-être"} >
                            <Tab  eventKey={"Indice de bien-être"} title={"Indice de bien-être"}>

                                <h4>Carte raster de la dimension environnement</h4>
                                <Dropzone style={{display: "flex", borderWidth: 3 + "px" }} key="dropzone" rejectClassName="dropzone-danger" className="dropzone" activeClassName="active">
                                    <div style={{display: "flex", borderStyle: "inherit", borderWidth: 3 + "px", alignItems: "center", width: "100%", height: "100%", justifyContent: "left"}}>
                                        <span style={{ fontStyle: 'italic', textAlign: "left" }}>
                                            Glissez le fichier ici ou cliquez pour choisir un fichier
                                        </span>
                                    </div>
                                </Dropzone>

                                <h4>Carte raster de la dimension sociale</h4>
                                <Dropzone key="dropzone" rejectClassName="dropzone-danger" className="dropzone" activeClassName="active">
                                    <div style={{display: "flex", borderStyle: "inherit", borderWidth: "inherit", alignItems: "center", width: "100%", height: "100%", justifyContent: "left"}}>
                                        <span style={{ fontStyle: 'italic', textAlign: "left" }}>
                                            Glissez le fichier ici ou cliquez pour choisir un fichier
                                        </span>
                                    </div>
                                </Dropzone>
                                <h4>Carte raster de la dimension économique</h4>
                                <Dropzone key="dropzone" rejectClassName="dropzone-danger" className="dropzone" activeClassName="active">
                                    <div style={{display: "flex", borderStyle: "inherit", borderWidth: "inherit", alignItems: "center", width: "100%", height: "100%", justifyContent: "left"}}>
                                        <span style={{ fontStyle: 'italic', textAlign: "left" }}>
                                            Glissez le fichier ici ou cliquez pour choisir un fichier
                                        </span>
                                    </div>
                                </Dropzone>
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
        // var username = 'admin';
        // var password = 'geoserver';
        // var basicAuth = 'Basic ' + btoa(username + ':' + password);
        //
        // var config = {
        //     headers: {
        //         'Content-Type': 'text/xml',
        //         'Authorization': + basicAuth
        //     }
        // };

        // Create workspace on Geoserver
        // const geoserverWorkspaceBaseURL = "http://localhost:8080/geoserver/rest/workspaces";
        // var tempXML = "<workspace><name>" + this.state.municipalite + "</name></workspace>";
        // var createWorkspaceXML = `${tempXML}`;
        // console.log(tempXML);

        // axios
        //     .post(geoserverWorkspaceBaseURL, tempXML, XMLconfig)
        //     .then((response) => {
        //         console.log(response.data);
        //     });

        // const geoserverWorkspaceBaseURL = "http://localhost:8080/geoserver/rest/workspaces";
        // axios.get(geoserverWorkspaceBaseURL, config).then((response) => {
        //     // console.log(response.data);
        // });

        // Upload data to Geoserver

        // Do stuff in GEostore

        // Create new map
        const getCreateNewMapBaseURL = "http://localhost:8080/mapstore/rest/geostore/resources/resource/102?full=true";
        const getTemplateDataURL = "http://localhost:8080/mapstore/rest/geostore/data/102";

        const putCreateNewMapBaseURL = "http://localhost:8080/mapstore/rest/geostore/resources";
        var newMapData;
        var newMapID;
        var resourcePermissions;

        axios.get(getTemplateDataURL).then((response) => {
            newMapData = response.data;

            console.log(JSON.parse(JSON.stringify(newMapData)));
            var newResource = "<Resource><description></description><metadata></metadata><name>" + this.state.municipalite + "</name><category><name>MAP</name></category><store><data><![CDATA[ " + JSON.stringify(newMapData) + " ]]></data></store></Resource>";
            var config = {
                headers: {
                    'Content-Type': 'text/xml',
                }
            };
            axios.post(putCreateNewMapBaseURL, newResource, config)
                .then((response) => {
                    newMapID = response.data
                    console.log("newMapID: ", newMapID);
                    // this.props.reloadMaps();

                    var changeSecurityRoleURL = "http://localhost:8080/mapstore/rest/geostore/resources/resource/" + newMapID + "/permissions";
                    axios.get(changeSecurityRoleURL).then((response) => {
                        resourcePermissions = response.data;
                        console.log("3333333 ", JSON.parse(JSON.stringify(resourcePermissions)));
                    });

                    var securityRoleNewRessource = "<SecurityRuleList><SecurityRule><canRead>true</canRead><canWrite>true</canWrite><user><id>12</id><name>admin</name></user></SecurityRule></SecurityRuleList>";
                    if (this.state.everyone_can_see == true) {
                        console.log("SADASDASDASDS");
                        securityRoleNewRessource = "<SecurityRuleList><SecurityRule><canRead>true</canRead><canWrite>true</canWrite><user><id>12</id><name>admin</name></user></SecurityRule><SecurityRule><canRead>true</canRead><canWrite>false</canWrite><group><groupName>everyone</groupName><id>9</id></group></SecurityRule></SecurityRuleList>";
                        axios.post(changeSecurityRoleURL, securityRoleNewRessource, config)
                            .then((response) => {
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
        //     console.log(response.data);
        //
        //     const layers  = mapdata.map.layers;
        //
        //     var x = 0;
        //     layers.forEach((layer) => {
        //         console.log(layer.id);
        //         if (layer.id == "Magog_IBE_HEXA__6") {
        //             mapdata.map.layers[x].visibility = false;
        //         }
        //         x++;
        //     });
        //
        //     axios.put(baseURL, mapdata)
        //         .then((response) => {
        //             console.log(response.data);
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
// export default connect(null, mapDispatchToProps)(IdentifyTabs);

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
