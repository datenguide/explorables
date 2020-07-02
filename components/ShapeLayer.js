import React, { useState, useEffect } from 'react'
import { Source, Layer } from 'react-map-gl'
import { json } from 'd3-request'
import { feature } from 'topojson'

const DEFAULTS = {
  fill: {
    source: 'geojson',
    type: 'fill',
    paint: {
      'fill-color': '#ff0000',
      'fill-opacity': 0.4,
      'fill-outline-color': '#000000',
    },
  },
  line: {
    source: 'geojson',
    type: 'line',
    paint: {
      'line-color': '#000000',
      'line-opacity': 1,
      'line-width': 2,
    },
  },
}

const ShapeLayer = ({ src, options = DEFAULTS.fill, hidden = false }) => {
  const layers = Array.isArray(options) ? options : [options]
  const [data, setData] = useState(null)
  const [layerOptions, setLayerOptions] = useState(
    layers.map((layer) => ({
      ...DEFAULTS[layer.type || 'fill'],
      ...layer,
    }))
  )

  // Load topojson data:
  useEffect(() => {
    json(src, (error, data) => {
      if (!error) {
        const features = feature(data, data.objects.regions)
        setData(features)
      }
    })
  }, [src])

  // Control layer visibility:
  // TODO: For smoother transitions, use line-opacity & fill-opacity instead of visibility
  useEffect(() => {
    setLayerOptions(
      layerOptions.map((layer) => ({
        ...layer,
        layout: { visibility: hidden ? 'none' : 'visible' },
      }))
    )
  }, [hidden])

  return (
    <Source type="geojson" data={data}>
      {layerOptions.map((options, i) => {
        return <Layer {...options} key={i} />
      })}
    </Source>
  )
}

export default ShapeLayer
