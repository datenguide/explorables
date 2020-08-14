import React from 'react'
import { Popup } from 'react-map-gl'

function MapTooltip({ children, lonLat, anchor = 'bottom', ...options }) {
  return (
    <Popup
      longitude={lonLat[0]}
      latitude={lonLat[1]}
      anchor={anchor}
      closeButton={false}
      {...options}
    >
      <div>{children}</div>
    </Popup>
  )
}

export default MapTooltip
