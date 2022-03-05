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
import NewMapDialog from '@mapstore/components/misc/NewMapDialog';
import {ButtonToolbar, SplitButton as SplitButtonB, MenuItem, Grid, Col, Glyphicon} from 'react-bootstrap';
import ButtonB from '@mapstore/components/misc/Button';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';

import {showNewMapDialog, createNewMap} from '@mapstore/actions/createnewmap';

import {
    showNewMapDialogSelector,
    hasContextsSelector,
    loadingSelector,
    loadFlagsSelector
} from '@mapstore/selectors/createnewmap';
import {mapTypeSelector} from '@mapstore/selectors/maptype';

import createnewmap from '@mapstore/reducers/createnewmap';
import * as epics from '@mapstore/epics/createnewmap';

//

import MyModal from '@mapstore/components/misc/ResizableModal';

import LoginModal from "@js/plugins/newIndiceDashboard/newIndiceDashboardModal";
import LoginForm from "@js/plugins/newIndiceDashboard/newIndiceDashboardForm";
import Dropzone from 'react-dropzone';

import Modal from "mapstore2/web/client/components/misc/ResizableModal";
import {getMessageById} from "mapstore2/web/client/utils/LocaleUtils";
//

const Button = tooltip(ButtonB);
const SplitButton = tooltip(SplitButtonB);

class NewIndiceDashboard extends React.Component {
    static propTypes = {
        showNewIndiceDashboardDialog: PropTypes.bool,
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
        showNewMapDialog: PropTypes.bool,
        onShowNewMapDialog: PropTypes.func,
        onNewMap: PropTypes.func
    };

    static contextTypes = {
        router: PropTypes.object
    };

    static defaultProps = {
        showNewIndiceDashboardDialog: false,
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
        hasContexts: false,
        showNewMapDialog: false,
        onShowNewMapDialog: () => {},
        onNewMap: () => {}
    };


    getForm = () => {
        return (<LoginForm
            role="body"
            ref="loginForm"
            showSubmitButton={false}
            user={this.props.user}
            loginError={this.props.loginError}
            onLoginSuccess={this.props.onLoginSuccess}
            onSubmit={this.props.onSubmit}
            onError={this.props.onError}
        />);
    };


    getFooter = () => {
        return (<span role="footer">
            <Button
                ref="submit"
                value={getMessageById(this.context.messages, "user.signIn")}
                bsStyle="primary"
                bsSize={this.props.buttonSize}
                className="pull-left"
                onClick={this.loginSubmit}
                key="submit">{getMessageById(this.context.messages, "user.signIn")}</Button>
             <Button
                key="closeButton"
                ref="closeButton"
                bsSize={this.props.buttonSize}
                onClick={this.handleOnHide}><Message msgId="close"/></Button> : <span/>
        </span>);
    };


    getModal = () => {
        return (
            <Modal
                show={this.state ? this.state.showNewIndiceDashboardDialog : false}
                onClose={this.close}
                title={"Nouveau tableau de bord"}
                buttons={[{
                    text: <Message msgId="Annuler" />,
                    onClick: this.close
                }, {
                    bsStyle: "primary",
                    text: <Message msgId="Créer" />,
                    onClick: this.close
                }]}
                fitContent
            >
                <div className="ms-detail-body">
                    {this.getForm()}

                    <h4>Carte raster de la dimension environnement</h4>
                    <Dropzone key="dropzone" rejectClassName="dropzone-danger" className="dropzone" activeClassName="active">
                        <div style={{display: "flex", borderStyle: "inherit", borderWidth: "inherit", alignItems: "center", width: "100%", height: "100%", justifyContent: "left"}}>
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
                </div>
                {/*{this.getFooter()}*/}
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
                            {this.props.hasContexts &&
                                <SplitButton
                                    id="split-button"
                                    tooltipId="newMap"
                                    className="square-button"
                                    bsStyle="primary"
                                    title={<Glyphicon glyph="add-map" />}
                                    onClick={() => this.createNewEmptyMap()}>
                                    <MenuItem onClick={() => this.createNewEmptyMap()}>
                                        <Message msgId="newMapEmpty"/>
                                    </MenuItem>
                                    <MenuItem onClick={() => this.props.onShowNewMapDialog(true)}>
                                        <Message msgId="newMapContext"/>
                                    </MenuItem>
                                </SplitButton>
                            }
                            {this.props.showNewDashboard ?
                                <Button tooltipId="resources.dashboards.newDashboard"
                                        className="square-button"
                                        bsStyle="primary"
                                        onClick={() => { this.displayNewIndiceDashboardDialog(); }}>
                                    <Glyphicon glyph="add-dashboard" />
                                </Button>
                                : null}

                        </ButtonToolbar>
                    </Col>
                </Grid>
                <NewMapDialog
                    show={this.props.showNewMapDialog}
                    onClose={() => this.props.onShowNewMapDialog(false)}
                    onSelect={this.props.onNewMap}/>
            </div>
        );
    }

    createNewEmptyMap = () => {
        this.context.router.history.push("/viewer/" + this.props.mapType + "/new");
    };

    isAllowed = () => this.props.isLoggedIn && this.props.allowedRoles.indexOf(this.props.user && this.props.user.role) >= 0;

    close = () => {
        // TODO Launch an action in order to change the state
        this.setState({
            showNewIndiceDashboardDialog: false
        });
    };

    displayNewIndiceDashboardDialog = () => {
        this.setState({
            showNewIndiceDashboardDialog: true
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
        hasContexts: hasContextsSelector(state),
        showNewMapDialog: showNewMapDialogSelector(state)
    }), {
        onShowNewMapDialog: showNewMapDialog,
        onNewMap: createNewMap
    })(NewIndiceDashboard),
    reducers: {
        createnewmap
    },
    epics
};
