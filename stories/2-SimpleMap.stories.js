import React from 'react'
import SimpleMap from '../components/SimpleMap'

export default {
  title: 'SimpleMap',
  component: SimpleMap,
}

export const map = () => (
  <>
    <h2>Simple Map</h2>
    <SimpleMap mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN} />

    <hr />

    <h2>Simple Map with custom settings</h2>
    <SimpleMap
      mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN}
      latitude={51.427}
      longitude={7.664}
      src="/nrw_gemeinden.json"
      width="50%"
      height="400px"
    />
  </>
)
