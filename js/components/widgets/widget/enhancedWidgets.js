// import { compose } from 'recompose';
//
// // enhancers for base menus and functionalities
// import chartWidget from '@mapstore/components/widgets/enhancers/chartWidget';
// import counterWidget from '@mapstore/components/widgets/enhancers/counterWidget';
// import tableWidget from '@mapstore/components/widgets/enhancers/tableWidget';
// import legendWidget from '@mapstore/components/widgets/enhancers/legendWidget';
// import textWidget from '@mapstore/components/widgets/enhancers/textWidget';
// import mapWidget from '@mapstore/components/widgets/enhancers/mapWidget';
//
// // Enhancers for ajax support
// import multiProtocolChart from '@mapstore/components/widgets/enhancers/multiProtocolChart';
// import wpsCounter from '@mapstore/components/widgets/enhancers/wpsCounter';
// import wfsTable from '@mapstore/components/widgets/enhancers/wfsTable';
//
//
// // enhancers for dependencies management
// import dependenciesToFilter from '@mapstore/components/widgets/enhancers/dependenciesToFilter';
// import dependenciesToOptions from '@mapstore/components/widgets/enhancers/dependenciesToOptions';
// import dependenciesToWidget from '@mapstore/components/widgets/enhancers/dependenciesToWidget';
// import dependenciesToExtent from '@mapstore/components/widgets/enhancers/dependenciesToExtent';
// import dependenciesToLayers from '@mapstore/components/widgets/enhancers/dependenciesToLayers';
// import dependenciesToMapProp from '@mapstore/components/widgets/enhancers/dependenciesToMapProp';
//
//
// import BaseChartWidget from '@mapstore/components/widgets/widget/ChartWidget';
// import BaseTextWidget from '@js/components/widgets/widget/TextWidget';
// import BaseMapWidget from '@mapstore/components/widgets/widget/MapWidget';
// import BaseTableWidget from '@mapstore/components/widgets/widget/TableWidget';
// import BaseCounterWidget from '@mapstore/components/widgets/widget/CounterWidget';
// import BaseLegendWidget from '@mapstore/components/widgets/widget/LegendWidget';
//
//
// //
// // connect widgets to dependencies, remote services and add base icons/tools
// //
//
// /**
//  * Chart widget with automatic data fetch, dependency management and all base enhancers. mapSync and dependencies are mapped to the needed props. Adds to the Base component the following props.
//  * @prop {object} dependencies values for dependenciesMap.
//  * @prop {object} dependenciesMap a map of dependencies that provides the needed props to the widget
//  * @prop {boolean} mapSync if true, this is in sync with a map
//  * @prop {string} geomProp the geometry, required to generate spatial filter
//  * @prop {object} layer The layer object where to perform the requests
//  * @prop {object} options options for the backing service. E.g. for WPS `{groupByAttributes: "STATE_NAME", aggregationAttribute: "LAND_KM", aggregateFunction: "Sum"}`
//  */
// export const ChartWidget = compose(
//     dependenciesToWidget,
//     dependenciesToFilter,
//     dependenciesToOptions,
//     multiProtocolChart,
//     chartWidget
// )(BaseChartWidget);
//
// /**
//  * Basic text widget with the base menu.
//  */
// export const TextWidget = compose(
//     textWidget
// )(BaseTextWidget);
//
// /**
//  * Map widgets with dependencies management and all base enhancers. Adds to the base widget the following props.
//  * @prop {object} dependencies values for dependenciesMap.
//  * @prop {boolean} mapSync if true, this is in sync with a map
//  * @prop {object} dependenciesMap a map of dependencies that provides the needed props to the widget
//  * @prop {object} map the map to display, with layers, projection, bbox, center ....
//  * @prop {object} options
//  */
// export const MapWidget = compose(
//     dependenciesToWidget,
//     dependenciesToLayers,
//     dependenciesToMapProp('center'),
//     dependenciesToMapProp('zoom'),
//     dependenciesToExtent,
//     mapWidget
// )(BaseMapWidget);
//
// /**
//  * Table widgets with automatic data fetch, dependencies management and all base enhancers. Adds to the base component the following props.
//  * @prop {object} dependencies values for dependenciesMap.
//  * @prop {boolean} mapSync if true, this is in sync with a map
//  * @prop {object} dependenciesMap a map of dependencies that provides the needed props to the widget
//  * @prop {string} geomProp the geometry, required to generate spatial filter
//  * @prop {object} layer The layer object where to perform the requests
//  * @prop {object} options {groupByAttributes: "STATE_NAME", aggregationAttribute: "LAND_KM", aggregateFunction: "Sum"}
//  */
// export const TableWidget = compose(
//     dependenciesToWidget,
//     dependenciesToOptions,
//     dependenciesToFilter,
//     wfsTable,
//     tableWidget
// )(BaseTableWidget);
//
// /**
//  * Counter widget with automatic data fetch, dependency management and all base enhancers. Adds to the base component the following props.
//  * @prop {object} dependencies values for dependenciesMap.
//  * @prop {boolean} mapSync if true, this is in sync with a map
//  * @prop {object} dependenciesMap a map of dependencies that provides the needed props to the widget
//  * @prop {string} geomProp the geometry, required to generate spatial filter
//  * @prop {object} layer The layer object where to perform the requests
//  * @prop {object} options options for the backing service. E.g. for WPS `{groupByAttributes: "STATE_NAME", aggregationAttribute: "LAND_KM", aggregateFunction: "Sum"}`
//  */
// export const CounterWidget = compose(
//     dependenciesToWidget,
//     dependenciesToFilter,
//     dependenciesToOptions,
//     wpsCounter,
//     counterWidget
// )(BaseCounterWidget);
//
// /**
//  * Legend widgets with dependencies management and all base enhancers. Adds to the base component the following props.
//  * @prop {object} dependencies values for dependenciesMap.
//  * @prop {object} dependenciesMap a map of dependencies that provides the needed props to the widget
//  * @prop {object} env env parameter for legend localization
//  */
// export const LegendWidget = compose(
//     dependenciesToWidget,
//     legendWidget
// )(BaseLegendWidget);
