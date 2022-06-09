/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';

import main from '@mapstore/components/app/main';
import StandardApp from '@mapstore/components/app/StandardApp';
import withExtensions from '@mapstore/components/app/withExtensions';
import StandardRouter from '@mapstore/components/app/StandardRouter';

import { loadVersion } from '@mapstore/actions/version';
import { themeLoaded } from '@mapstore/actions/theme';

import { updateMapLayoutEpic } from '@js/epics/maplayout';
import { setSupportedLocales } from '@mapstore/epics/localconfig';
import { readQueryParamsOnMapEpic } from '@mapstore/epics/queryparams';

import maptype from '@mapstore/reducers/maptype';
import maps from '@mapstore/reducers/maps';
import maplayout from '@mapstore/reducers/maplayout';
import version from '@mapstore/reducers/version';
import mapPopups from '@mapstore/reducers/mapPopups';

import { versionSelector } from '@mapstore/selectors/version';
import { loadAfterThemeSelector } from '@mapstore/selectors/config';

import {
    standardReducers,
    standardEpics,
    standardRootReducerFunc
} from '@mapstore/stores/defaultOptions';

export default (config = {}, pluginsDef, overrideConfig = cfg => cfg) => {

    const {
        // store config
        initialState,
        appEpics: configAppEpics = {},
        baseEpics,
        appReducers: configAppReducers = {},
        baseReducers,
        // app config
        storeOpts,
        pages,
        printingEnabled = true,
        themeCfg = {},
        mode
    } = config;

    const appComponent = connect((state) => ({
        locale: state.locale || {},
        pages,
        themeCfg,
        version: versionSelector(state),
        loadAfterTheme: loadAfterThemeSelector(state),
        themeLoaded: state.theme && state.theme.loaded
    }), {
        onThemeLoaded: themeLoaded
    })(StandardRouter);

    const appReducers = {
        ...(baseReducers
            ? baseReducers
            : {
                maptype,
                maps,
                maplayout,
                version,
                mapPopups,
                ...configAppReducers
            }),

        ...standardReducers
    };

    const appEpics = {
        ...(baseEpics
            ? baseEpics
            : {
                updateMapLayoutEpic,
                setSupportedLocales,
                readQueryParamsOnMapEpic,
                ...configAppEpics
            }),

        ...standardEpics
    };

    const initialActions = [
        loadVersion
    ];

    const appConfig = overrideConfig({
        // store config
        initialState,
        appReducers,
        appEpics,
        rootReducerFunc: standardRootReducerFunc,
        // app config
        pluginsDef,
        storeOpts,
        initialActions,
        appComponent,
        printingEnabled,
        themeCfg,
        mode
    });

    const App = withExtensions(StandardApp);

    return main(appConfig, App);
};
