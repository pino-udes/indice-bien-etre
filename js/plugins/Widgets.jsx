/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, defaultProps, withProps, withPropsOnChange } from 'recompose';


import { createPlugin } from '@mapstore/utils/PluginsUtils';

import { mapIdSelector } from '@mapstore/selectors/map';
import { getVisibleFloatingWidgets, dependenciesSelector, getFloatingWidgetsLayout, isTrayEnabled, getMaximizedState } from '@mapstore/selectors/widgets';
import { editWidget, updateWidgetProperty, deleteWidget, changeLayout, exportCSV, exportImage, toggleCollapse, toggleMaximize } from '@mapstore/actions/widgets';
import editOptions from '@mapstore/plugins/widgets/editOptions';
import autoDisableWidgets from '@mapstore/plugins/widgets/autoDisableWidgets';

const RIGHT_MARGIN = 70;
import { widthProvider, heightProvider } from '@mapstore/components/layout/enhancers/gridLayout';

import WidgetsViewBase from '@mapstore/components/widgets/view/WidgetsView';

const WidgetsView =
compose(
    connect(
        createSelector(
            mapIdSelector,
            getVisibleFloatingWidgets,
            getFloatingWidgetsLayout,
            getMaximizedState,
            dependenciesSelector,
            (id, widgets, layouts, maximized, dependencies) => ({
                id,
                widgets,
                layouts,
                maximized,
                dependencies
            })
        ), {
            editWidget,
            updateWidgetProperty,
            exportCSV,
            toggleCollapse,
            toggleMaximize,
            exportImage,
            deleteWidget,
            onLayoutChange: changeLayout
        }
    ),
    // functionalities concerning auto-resize, layout and style.
    compose(
        heightProvider({ debounceTime: 20, closest: true, querySelector: '.fill' }),
        widthProvider({ overrideWidthProvider: false }),
        withProps(({width, height, maximized} = {}) => {
            const divHeight = height - 120;
            const nRows = 8;
            const rowHeight = Math.floor(divHeight / nRows - 20);

            const maximizedStyle = maximized?.widget ? {
                width: '100%',
                height: '100%',
                marginTop: 0,
                bottom: 'auto',
                top: 0,
                left: 0,
                zIndex: 1330
            } : {};
            const maximizedProps = maximized?.widget ? {
                width,
                useDefaultWidthProvider: false,
                rowHeight: height - 50,
                breakpoints: { xxs: 0 },
                cols: { xxs: 1 }
            } : {};
            const viewWidth = width && width > 800 ? width - (500 + RIGHT_MARGIN) : width - RIGHT_MARGIN;
            const widthOptions = width ? {width: viewWidth - 1} : {};
            return ({
                rowHeight,
                className: "on-map",
                breakpoints: { md: 480, xxs: 0 },
                cols: { md: 6, xxs: 1 },
                ...widthOptions,
                useDefaultWidthProvider: false,
                style: {
                    left: (width && width > 800) ? "500px" : "0",
                    marginTop: 52,
                    bottom: 65,
                    height: Math.floor((height - 100) / (rowHeight + 10)) * (rowHeight + 10),
                    width: viewWidth + 'px',
                    position: 'absolute',
                    zIndex: 50,
                    ...maximizedStyle
                },
                ...maximizedProps
            });
        })
    ),
    /* toolsOptions configurations support
     * Provide functionalities to manage widgets tools visibility.
     */
    compose(
        defaultProps({
            toolsOptions: {
                showPin: "user.role===ADMIN", // users can lock widgets to disable editing, move and collapse
                seeHidden: "user.role===ADMIN", // users that can see the hidden widgets (hidden with hide tool, visible only to the users that has showHide = true)
                showHide: false, // show the hide tool in menu
                showCollapse: true,
                showMaximize: true
            }
        }),
        // allow to customize toolsOptions object, with rules. see accessRuleParser
        editOptions("toolsOptions", { asObject: true }),
        // do not show collapse if tray is not present
        compose(
            connect(createSelector(isTrayEnabled, tray => ({ tray }))),
            withPropsOnChange(
                ["toolsOptions", "tray"],
                ({toolsOptions, tray}) => ({
                    toolsOptions: toolsOptions ? {
                        ...toolsOptions,
                        showCollapse: toolsOptions.showCollapse && tray
                    } : toolsOptions
                })
            )
        ),
        // hide hidden widgets to user has not access to
        withPropsOnChange(
            ["widgets", "toolsOptions"],
            ({ widgets = [], toolsOptions = {}}) => ({
                widgets: widgets.filter(({ hide }) => hide ? toolsOptions.seeHidden : true)
            })
        )
    )
)(WidgetsViewBase);


class Widgets extends React.Component {
    static propTypes = {
        enabled: PropTypes.bool
    };
    static defaultProps = {
        enabled: true
    };
    render() {
        return this.props.enabled ? <WidgetsView {...this.props /* pass options to the plugin */ } /> : null;
    }
}
/**
 * Renders widgets on the map.
 * @memberof plugins
 * @name Widgets
 * @class
 * @prop {object} [toolsOptions] options to show and manage widgets tools. Widget tools are buttons available in some widgets. Any entry of this object can be configured using accessRules.
 *       Access rules can be defined using the syntax (@see components.misc.enhancers.security.accessRuleParser).
 *       The accessible parts of the state are `{mapInfo: {canEdit, canDelete...}, user: {role: "USER"}}`. So you can define rules like this:
 *       ```
 *       {showPin: ["__OR__", "user.role===ADMIN", "mapInfo.canEdit"]}
 *       ```
 * @prop {boolean|string|array} [toolsOptions.showPin] show lock tool. By default is visible only to the admin
 * @prop {boolean|string|array} [toolsOptions.showHide] show the "hide tool" for the widget (the tool allows to hide the widget to users that have `seeHidden=false` ). By default is false, in the most common case it should be the same of `seeHidden`.
 * @prop {boolean|string|array} [toolsOptions.seeHidden] hides the widgets under particular conditions
 *
 */
const WidgetsPlugin = autoDisableWidgets(Widgets);

export default createPlugin("WidgetsPlugin", {
    component: WidgetsPlugin,
    containers: {
        TOC: {
            doNotHide: true,
            name: "Widgets"
        }
    },
    reducers: {
        widgets: require('@mapstore/reducers/widgets').default
    },
    epics: require('@mapstore/epics/widgets').default
});
