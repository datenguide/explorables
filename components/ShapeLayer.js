import React, { useState, useLayoutEffect } from 'react'
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

const TopojsonLayer = ({ path, layerConfig }) => {
  const [data, setData] = useState(null)
  const layer = { ...layerDefaults, ...layerConfig }

  useLayoutEffect(() => {
    json(path, (error, data) => {
      if (!error) {
        const features = feature(data, data.objects.regions)
        setData(features)
      }
    })
  }, [])

  return (
    <Source type="geojson" data={data}>
      <Layer {...layer} />
    </Source>
  )
}

export default TopojsonLayer
