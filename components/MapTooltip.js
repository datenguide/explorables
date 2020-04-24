import React from 'react'
import { Popup } from 'react-map-gl'

function MapTooltip({ children, lonLat, anchor = 'bottom' }) {
  return (
    <Popup
      longitude={lonLat[0]}
      latitude={lonLat[1]}
      anchor={anchor}
      closeButton={false}
    >
      <div>{children}</div>
    </Popup>
  )
}

export default MapTooltip
