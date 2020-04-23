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

const layers = {
  'nuts-1': [
    <ShapeLayer key="foo" {...mapNavItems[0]} />,
    <ShapeLayer key="other" {...mapNavItems[1]} />,
  ],
  'nuts-2': [
    <ShapeLayer key="goof" {...mapNavItems[0]} />,
    <ShapeLayer key="doop" {...mapNavItems[2]} />,
  ],
  'nuts-3': [<ShapeLayer key="bar" {...mapNavItems[2]} />],
  lau: [<ShapeLayer key="baz" {...mapNavItems[3]} />],
}

function Map({ mapboxApiAccessToken }) {
  const [currentLevel, setCurrentLevel] = useState(mapNavItems[0])
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
        currentItem={currentLevel}
        onItemClick={(item) => {
          setCurrentLevel(item)
        }}
      />
      {layers[currentLevel.id]}
    </StaticMap>
  )
}

export default Map
