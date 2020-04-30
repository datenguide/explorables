import React, { useState, useEffect } from 'react'
import { Source, Layer } from 'react-map-gl'
import { json } from 'd3-request'
import { feature } from 'topojson'

const layerDefaults = {
  type: 'fill',
  source: 'geojson',
  paint: {
    'fill-color': '#ff0000',
    'fill-opacity': 0.4,
    'fill-outline-color': '#000000',
  },
}

const ShapeLayer = ({ src, options, hidden = false }) => {
  const [layerStyle, setLayerStyle] = useState({
    ...layerDefaults,
    ...options,
  })
  const [originalOpacity] = useState(layerStyle.paint['fill-opacity'])
  const [data, setData] = useState(null)

  // Load topojson data:
  useEffect(() => {
    json(src, (error, data) => {
      if (!error) {
        const features = feature(data, data.objects.regions)
        setData(features)
      }
    })
  }, [src])

  // Control layer visibility (for smooth transitions):
  useEffect(() => {
    const paint = {
      ...layerStyle.paint,
      'fill-opacity': hidden ? 0 : originalOpacity,
    }
    setLayerStyle({ ...layerStyle, paint })
  }, [hidden])

  return (
    <Source type="geojson" data={data}>
      <Layer {...layerStyle} />
    </Source>
  )
}

export default ShapeLayer
