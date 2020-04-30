import React, { useState } from 'react'
import { StaticMap } from 'react-map-gl'
import MapNav from './MapNav'
import MapTooltip from './MapTooltip'
import ShapeLayer from './ShapeLayer'

import 'mapbox-gl/dist/mapbox-gl.css'

const paths = {
  nuts1: 'bundeslaender.json',
  nuts2: 'nrw_regierungsbezirke.json',
  nuts3: 'nrw_landkreise.json',
  lau: 'nrw_gemeinden.json',
}

const layerOptions = {
  nrw: {
    filter: ['==', 'name', 'Nordrhein-Westfalen'],
    paint: {
      'fill-color': '#ff0000',
      'fill-opacity': 0.4,
      'fill-outline-color': '#ffffff',
    },
  },
  states: {
    filter: ['!=', 'name', 'Nordrhein-Westfalen'],
    paint: {
      'fill-color': '#0000ff',
      'fill-opacity': 0.2,
      'fill-outline-color': '#ffffff',
    },
  },
}

const mapNavItems = [
  {
    id: 'nuts1',
    title: 'Bundesländer',
  },
  {
    id: 'nuts2',
    title: 'Statistische Regionen',
  },
  {
    id: 'nuts3',
    title: 'Landkreise',
  },
  {
    id: 'lau',
    title: 'Gemeinden',
  },
]

function Map({ mapboxApiAccessToken, rootPath }) {
  const [level, setlevel] = useState(mapNavItems[0])
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
      <MapTooltip lonLat={[7.405, 51.509]}>You are here!</MapTooltip>
      <MapNav
        items={mapNavItems}
        currentItem={level}
        onItemClick={(item) => {
          setlevel(item)
        }}
      />
      <ShapeLayer
        src={`${rootPath}/${paths.nuts1}`}
        options={layerOptions.nrw}
        hidden={level.id !== 'nuts1'}
      />
      <ShapeLayer
        src={`${rootPath}/${paths.nuts1}`}
        options={layerOptions.states}
        hidden={level.id !== 'nuts1'}
      />
      <ShapeLayer
        src={`${rootPath}/${paths.nuts2}`}
        hidden={level.id !== 'nuts2'}
      />
      <ShapeLayer
        src={`${rootPath}/${paths.nuts3}`}
        hidden={level.id !== 'nuts3'}
      />
      <ShapeLayer
        src={`${rootPath}/${paths.lau}`}
        hidden={level.id !== 'lau'}
      />
    </StaticMap>
  )
}

export default Map
