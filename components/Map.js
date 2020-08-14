import React, { useState } from 'react'
import ReactMapGl from 'react-map-gl'

function Map({ children, settings, viewport }) {
  const [viewportDefaults, setViewport] = useState({
    width: 400,
    height: 300,
    latitude: 51.427,
    longitude: 7.664,
    zoom: 6,
  })

  return (
    <ReactMapGl
      {...viewportDefaults}
      {...viewport}
      {...settings}
      onViewportChange={setViewport}
    >
      {children}
    </ReactMapGl>
  )
}

export default Map
