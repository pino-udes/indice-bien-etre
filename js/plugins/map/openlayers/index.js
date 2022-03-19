/**
* Copyright 2016, GeoSolutions Sas.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree.
*/
import addI18NProps from '@mapstore/components/I18N/enhancers/addI18NProps';

// number format localization for measurements
const addFormatNumber = addI18NProps(['formatNumber']);

import Map from '@mapstore/components/map/openlayers/Map';
import Layer from '@mapstore/components/map/openlayers/Layer';
import Feature from '@mapstore/components/map/openlayers/Feature';
import MeasurementSupport from '@mapstore/components/map/openlayers/MeasurementSupport';
import Overview from '@mapstore/components/map/openlayers/Overview';
import ScaleBar from '@mapstore/components/map/openlayers/ScaleBar';
import DrawSupport from '@mapstore/components/map/openlayers/DrawSupport';
import HighlightFeatureSupport from '@mapstore/components/map/openlayers/HighlightFeatureSupport';
import SelectionSupport from '@mapstore/components/map/openlayers/SelectionSupport';
import PopupSupport from '@mapstore/components/map/openlayers/PopupSupport';
import BoxSelectionSupport from '@mapstore/components/map/openlayers/BoxSelectionSupport';

export default {
    LMap: Map,
    Layer,
    Feature,
    MeasurementSupport: addFormatNumber(MeasurementSupport),
    Overview,
    ScaleBar,
    DrawSupport,
    HighlightFeatureSupport,
    SelectionSupport,
    PopupSupport,
    BoxSelectionSupport
};
