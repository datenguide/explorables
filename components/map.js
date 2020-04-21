import React, { useState, useEffect } from 'react'
import { StaticMap, Source, Layer } from 'react-map-gl'
import { json } from 'd3-request'

import 'mapbox-gl/dist/mapbox-gl.css'

const regionLayer = {
  type: 'fill',
  source: 'geojson',
  paint: {
    'fill-color': '#ff0000',
    'fill-opacity': 0.4,
  },
}

function Map({ mapboxApiAccessToken }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 51.427,
    longitude: 7.664,
    zoom: 6,
    options: false,
    mapboxApiAccessToken,
  })

  const [data, setData] = useState({})

  useEffect(() => {
    // code to run on component mount
    json('/nrw_bundesland.geojson', (error, response) => {
      if (!error) {
        setData(response)
      }
    })
  }, [])

  return (
    <StaticMap {...viewport} onViewportChange={setViewport}>
      <Source type="geojson" data={data}>
        <Layer {...regionLayer} />
      </Source>
    </StaticMap>
  )
}

export default Map
