import React, { useState, useEffect } from 'react'
import { StaticMap, Source, Layer } from 'react-map-gl'
import { json } from 'd3-request'
import MapNav from './MapNav'

import 'mapbox-gl/dist/mapbox-gl.css'

const regionLayer = {
  type: 'fill',
  source: 'geojson',
  paint: {
    'fill-color': '#ff0000',
    'fill-opacity': 0.4,
  },
}

const mapNavItems = [
  {
    id: 'nuts-1',
    title: 'Bundesländer',
  },
  {
    id: 'nuts-2',
    title: 'Statistische Regionen',
  },
  {
    id: 'nuts-3',
    title: 'Landkreise',
  },
  {
    id: 'lau',
    title: 'Gemeinden',
  },
]

function Map({ mapboxApiAccessToken }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 51.427,
    longitude: 7.664,
    zoom: 6,
    options: false,
    mapboxApiAccessToken,
  })

  const [data, setData] = useState({})

  const [currentLayer, setCurrentLayer] = useState(mapNavItems[0].id)

  useEffect(() => {
    // code to run on component mount
    json('/nrw_bundesland.geojson', (error, response) => {
      if (!error) {
        setData(response)
      }
    })
  }, [])

  return (
    <StaticMap {...viewport} onViewportChange={setViewport}>
      <MapNav
        items={mapNavItems}
        currentItem={currentLayer}
        onItemClick={(id) => {
          setCurrentLayer(id)
          console.log(currentLayer)
        }}
      />
      <Source type="geojson" data={data}>
        <Layer {...regionLayer} />
      </Source>
    </StaticMap>
  )
}

export default Map
