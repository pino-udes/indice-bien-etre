/**
* Copyright 2016, GeoSolutions Sas.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree.
*/

export default {
    LMap: require('@js/components/map/leaflet/Map').default,
    Layer: require('@mapstore/components/map/leaflet/Layer').default,
    Feature: require('@mapstore/components/map/leaflet/Feature').default,
    MeasurementSupport: require('@mapstore/components/map/leaflet/MeasurementSupport').default,
    Overview: require('@mapstore/components/map/leaflet/Overview'),
    ScaleBar: require('@mapstore/components/map/leaflet/ScaleBar'),
    DrawSupport: require('@mapstore/components/map/leaflet/DrawSupport').default,
    HighlightFeatureSupport: require('@mapstore/components/map/leaflet/HighlightFeatureSupport').default,
    PopupSupport: require('@mapstore/components/map/leaflet/PopupSupport').default
};
