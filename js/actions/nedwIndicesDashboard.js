

const ConnectedSample = connect((state) => {
    return {
        zoom: get(state, 'map.present.zoom')
    };
}, {
    onZoom: changeZoomLevel // connected action
})(SampleComponent);

export const ConnectedSamplePlugin = ConnectedSample;
