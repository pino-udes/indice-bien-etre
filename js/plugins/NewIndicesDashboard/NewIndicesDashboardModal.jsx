/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from '@mapstore/components/security/forms/LoginForm';
import Modal from '@mapstore/components/misc/Modal';
import Message from '@mapstore/components/I18N/Message';
import { getMessageById } from '@mapstore/utils/LocaleUtils';
import '@mapstore/components/security/css/security.css';
import Button from '@mapstore/components/misc/Button';
/**
 * A Modal window to show password reset form
 */
class LoginModal extends React.Component {
    static propTypes = {
        // props
        user: PropTypes.object,
        loginError: PropTypes.object,
        show: PropTypes.bool,
        options: PropTypes.object,

        // CALLBACKS
        onLoginSuccess: PropTypes.func,
        onSubmit: PropTypes.func,
        onError: PropTypes.func,
        onClose: PropTypes.func,
        closeGlyph: PropTypes.string,
        style: PropTypes.object,
        buttonSize: PropTypes.string,
        includeCloseButton: PropTypes.bool
    };

    static contextTypes = {
        messages: PropTypes.object
    };

    static defaultProps = {
        show: true,
        onLoginSuccess: () => {},
        onSubmit: () => {},
        onError: () => {},
        onClose: () => {},
        options: {},
        closeGlyph: "",
        style: {},
        buttonSize: "large",
        includeCloseButton: true
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
                show={this.state ? this.state.show : false}
                onClose={this.close}
                title={"Nouveau tableau de bord"}
                buttons={[{
                    bsStyle: "primary",
                    text: <Message msgId="Créer" />,
                    onClick: this.close
                }, {
                    text: <Message msgId="Annuler" />,
                    onClick: this.close
                }]}
                fitContent
            >
                <div className="ms-detail-body">
                    {this.getForm()}

                </div>
                {this.getFooter()}

            </Modal>
        );
    }
    render() {
        return (this.getModal());
    }

    /**
     * This is called when close button clicked or
     * when user click out(modal overlay). Hide when
     * it is triggered from button otherwise don't hide the
     * modal
     */
    handleOnHide = (event) => {
        if (event) {
            // it is coming from the hide or close button
            this.props.onClose();
        }
    }

    loginSubmit = () => {
        this.refs.loginForm.submit();
    };

    close = () => {
        // TODO Launch an action in order to change the state
        this.setState({
            show: false
        });
    };
}

export default LoginModal;
