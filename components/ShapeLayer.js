import React, { useState, useEffect, useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import { json } from 'd3-request'
import { feature } from 'topojson'

const DEFAULTS = {
  fill: {
    source: 'geojson',
    type: 'fill',
    layout: {},
    paint: {
      'fill-color': '#ff0000',
      'fill-opacity': 0.4,
      'fill-outline-color': '#000000',
    },
  },
  line: {
    source: 'geojson',
    type: 'line',
    layout: {},
    paint: {
      'line-color': '#000000',
      'line-opacity': 1,
      'line-width': 2,
    },
  },
}

const ShapeLayer = ({ src, options = DEFAULTS.fill, hidden = false }) => {
  // Load topojson data:
  const [data, setData] = useState(null)
  useEffect(() => {
    json(src, (error, data) => {
      if (!error) {
        const features = feature(data, data.objects.regions)
        setData(features)
      }
    })
  }, [src])

  // Use opacity for hiding/showing layers for smoother toggling:
  const layerOptions = useMemo(() => {
    const layers = Array.isArray(options) ? options : [options]
    return layers.map(({ type = 'fill', ...options }) => {
      const opacityProp = `${type}-opacity`
      const layer = { ...DEFAULTS[type], ...options }
      const paint = { ...layer.paint }
      paint[opacityProp] = hidden ? 0 : paint[opacityProp]
      layer.paint = paint
      return layer
    })
  }, [hidden, options])

  return (
    <Source type="geojson" data={data}>
      {layerOptions.map((options, i) => {
        return <Layer {...options} key={i} />
      })}
    </Source>
  )
}

export default ShapeLayer
