import React from 'react'
import { Marker } from 'react-map-gl'
import './TextMarker.css'

function TextMarker({ children, lonLat, textAlign = 'center', ...options }) {
  return (
    <Marker longitude={lonLat[0]} latitude={lonLat[1]} {...options}>
      <div className={`text-marker ${textAlign}`}>{children}</div>
    </Marker>
  )
}

export default TextMarker
