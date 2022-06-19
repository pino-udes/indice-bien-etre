/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Message from '@mapstore/components/I18N/Message';
import DockablePanel from '@js/components/misc/panels/DockablePanel';
import ResizableModal from '@mapstore/components/misc/ResizableModal';
import Portal from '@mapstore/components/misc/Portal';
import IdentifyTabs from '@js/components/data/identify/IdentifyTabs';
import './style/topchart.css';


/**
 * Component for rendering Identify Container inside a Dockable container
 * @memberof components.data.identify
 * @name IdentifyContainer
 * @class
 * @prop {dock} dock switch between Dockable Panel and Resizable Modal, default true (DockPanel)
 * @prop {function} viewer component that will be used as viewer of Identify
 * @prop {object} viewerOptions options to use with the viewer, eg { header: MyHeader, container: MyContainer }
 * @prop {function} getToolButtons must return an array of object representing the toolbar buttons, eg (props) => [{ glyph: 'info-sign', tooltip: 'hello!'}]
 * @prop {function} getFeatureButtons must return an array of buttons relating to feature interaction, eg (props) => [{ glyph: 'zoom-to', tooltip: 'Zoom to Extent'}]
 */
export default props => {
    const {
        layers,
        enabled,
        requests = [],
        onClose = () => {},
        responses = [],
        dock = true,
        showFullscreen,
        dockStyle = {},
        draggable,
        warning,
        clearWarning,
        zIndex,
        toggleHighlightFeature = () => {}
    } = props;

    return (
        <div id="identify-active" className={enabled && requests.length !== 0 ? "identify-active" : ""}>
            <DockablePanel
                bsStyle="primary"
                glyph="1-layer"
                open
                size={0.30}
                fluid
                position="left"
                draggable={draggable}
                onClose={() => {
                    onClose();
                    toggleHighlightFeature(false);
                }}
                dock={dock}
                style={dockStyle}
                title="Indices"
                showFullscreen={showFullscreen}
                zIndex={zIndex}
                header={[

                ].filter(headRow => headRow)}>

                <IdentifyTabs data={responses} layers={layers} />

            </DockablePanel>
            <Portal>
                <ResizableModal
                    fade
                    title={<Message msgId="warning"/>}
                    size="xs"
                    show={warning}
                    onClose={clearWarning}
                    buttons={[{
                        text: <Message msgId="close"/>,
                        onClick: clearWarning,
                        bsStyle: 'primary'
                    }]}>
                    <div className="ms-alert" style={{padding: 15}}>
                        <div className="ms-alert-center text-center">
                            <Message msgId="identifyNoQueryableLayers"/>
                        </div>
                    </div>
                </ResizableModal>
            </Portal>
        </div>
    );
};
