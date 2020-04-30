import React, { useState } from 'react'
import { StaticMap } from 'react-map-gl'

function SimpleMap({ mapboxApiAccessToken, src, ...options }) {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 300,
    latitude: 51.427,
    longitude: 7.664,
    zoom: 6,
    mapboxApiAccessToken,
    ...options,
  })

  return <StaticMap {...viewport} onViewportChange={setViewport} />
}

export default SimpleMap
