import React, {
    useState
} from 'react';
import ReactMapGL from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function Map({ mapboxApiAccessToken }) {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
        mapboxApiAccessToken,
    });

    return ( <
        ReactMapGL {
            ...viewport
        }
        onViewportChange = {
            setViewport
        }
        />
    );
}

export default Map;