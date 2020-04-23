import React, { useState } from 'react'
import { StaticMap } from 'react-map-gl'
import MapNav from './MapNav'
import ShapeLayer from './ShapeLayer'

import 'mapbox-gl/dist/mapbox-gl.css'

const mapNavItems = [
  {
    id: 'nuts-1',
    title: 'Bundesländer',
    path: 'bundeslaender.json',
    layerConfig: {
      type: 'fill',
      source: 'geojson',
      filter: ['==', 'name', 'Rheinland-Pfalz'],
      paint: {
        'fill-color': '#0000ff',
        'fill-opacity': 0.4,
        'fill-outline-color': '#ff0000',
      },
    },
  },
  {
    id: 'nuts-2',
    title: 'Statistische Regionen',
    path: 'bundeslaender.json',
    layerConfig: {
      type: 'fill',
      source: 'geojson',
      filter: ['==', 'name', 'Nordrhein-Westfalen'],
      paint: {
        'fill-color': '#ff0000',
        'fill-opacity': 0.4,
        'fill-outline-color': '#ff0000',
      },
    },
  },
  {
    id: 'nuts-3',
    title: 'Landkreise',
    path: '/nrw_landkreise.json',
  },
  {
    id: 'lau',
    title: 'Gemeinden',
    path: '/nrw_gemeinden.json',
  },
]

function Map({ mapboxApiAccessToken }) {
  const [currentLayer, setCurrentLayer] = useState(mapNavItems[0])
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 51.427,
    longitude: 7.664,
    zoom: 6,
    options: false,
    mapboxApiAccessToken,
  })

  return (
    <StaticMap {...viewport} onViewportChange={setViewport}>
      <MapNav
        items={mapNavItems}
        currentItem={currentLayer}
        onItemClick={(item) => {
          setCurrentLayer(item)
        }}
      />
      <ShapeLayer {...mapNavItems[0]} />
      <ShapeLayer {...mapNavItems[1]} />
    </StaticMap>
  )
}

export default Map
